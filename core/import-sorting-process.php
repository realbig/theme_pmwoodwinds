<?php

class pmwoodwinds_import_sorting_process extends WP_Background_Process {

	/**
	 * @var string
	 */
	protected $action = 'pmwoodwinds_import_sorting';

	/**
	 * Task
	 *
	 * Override this method to perform any actions required on each
	 * queue item. Return the modified item for further processing
	 * in the next pass through. Or, return false to remove the
	 * item from the queue.
	 *
	 * @param mixed $item Queue item to iterate over
	 *
	 * @return mixed
	 */
	protected function task( $product_id ) {
		
		$post_term_ids = get_the_terms( $product_id, 'product_cat' );

		$term_ids = array();
		
		if ( is_array( $post_term_ids ) ) {

			foreach ( $post_term_ids as $term ) {
				$term_ids[] = $term->term_id;
			}

		}

		// Ensure we do not use the Rare and Collectable Category for sorting
		$exclude_term = term_exists( 'rare-and-collectible', 'product_cat' );

		if ( $exclude_term ) {

			$exclude_term_id = (int) $exclude_term['term_id'];

			$term_ids = array_filter( $term_ids, function( $term_id ) use ( $exclude_term_id ) {
				return $term_id !== $exclude_term_id;
			} );

		}

		$category_sorting_key = pmwoodwind_get_product_category_list_recursive( 0 );
		
		// These are only used to see what type of Product it is
		$instrument_key = pmwoodwind_get_instrument_sorting_key();
		$mouthpiece_key = pmwoodwind_get_mouthpiece_sorting_key();
		$accessory_key = pmwoodwind_get_accessory_sorting_key();
		$neck_key = pmwoodwind_get_neck_sorting_key();
		
		$sort_value = 0;
		
		// We have methods for this, but they'd call the functions to get the keys an additional time for every product. 
		$is_instrument = array_intersect( $term_ids, $instrument_key );
		$is_mouthpiece = array_intersect( $term_ids, $mouthpiece_key );
		$is_accessory = array_intersect( $term_ids, $accessory_key );
		$is_neck = array_intersect( $term_ids, $neck_key );

		$index = false;
		$bottom_most_term_id = 0; // Used only for Used Instruments currently
		
		foreach ( $term_ids as $term_id ) {
			
			$index = array_search( $term_id, $category_sorting_key );

			if ( $index !== false ) {

				$index = $index + 1; // Cannot zero-index otherwise we may not actually save a value

				if ( $index > $sort_value ) {

					$sort_value = $index;
					$bottom_most_term_id = $term_id;

				}

			}
			
		}
		
		if ( $sort_value > 0 ) {
			
			$update = update_post_meta( $product_id, 'product_sort_order', (int) $sort_value );

			// The following is only currently used for the Used Instruments page

			$top_category_id = 0;

			// Find the Term IDs of Instrument/Mouthpiece/Accessory and set a Sorting Key to used for later
			if ( $is_instrument ) {

				$top_category = term_exists( 'instruments', 'product_cat' );
				$top_category_id = (int) $top_category['term_id'];

			}
			else if ( $is_mouthpiece ) {

				$top_category = term_exists( 'mouthpieces', 'product_cat' );
				$top_category_id = (int) $top_category['term_id'];

			}
			else if ( $is_accessory ) {

				$top_category = term_exists( 'accessories', 'product_cat' );
				$top_category_id = (int) $top_category['term_id'];

			}
			else if ( $is_neck ) {

				$top_category = term_exists( 'necks', 'product_cat' );
				$top_category_id = (int) $top_category['term_id'];

			}

			$parent_category_index = 0;
			$sub_category_index = 0;

			$sorted_by_term = get_term_by( 'id', $bottom_most_term_id, 'product_cat' );

			// Determine the correct values to save
			if ( $sorted_by_term->parent == $top_category_id ) {

				$parent_category_index = $sort_value;
				$sub_category_index = 0; // The only checked category under Instruments/Mouthpieces/Accessories is only one level deep, so give it a default value

			}
			else {

				$sub_category_index = $sort_value;

				// Get second highest parent
				$parent_category_id = pmwoodwind_get_second_to_top_category_id( $bottom_most_term_id );

				// Find Index
				$index = array_search( $parent_category_id, $category_sorting_key );

				// Increment
				$parent_category_index = $index + 1;

			}

			// Now we have "Parent" and Sub-Category saved in a way we can sort by
			update_post_meta( $product_id, 'parent_category_sort_order', (int) $parent_category_index );
			update_post_meta( $product_id, 'sub_category_sort_order', (int) $sub_category_index );
			
		}
		
		error_log( "$product_id has been updated with Sort Value of $sort_value" );

		return false;
		
	}

	/**
	 * Complete
	 *
	 * Override if applicable, but ensure that the below actions are
	 * performed, or, call parent::complete().
	 */
	protected function complete() {
		parent::complete();

		// Show notice to user or perform some other arbitrary task...
		
		error_log( "Sorting Import Complete" );
		update_option( 'pmwoodwind_sorting_import_complete', true );
		
	}

}