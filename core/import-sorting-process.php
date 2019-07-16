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
		
		$instrument_key = pmwoodwind_get_instrument_sorting_key();
		$mouthpiece_key = pmwoodwind_get_mouthpiece_sorting_key();
		$accessory_key = pmwoodwind_get_accessory_sorting_key();
		
		$sort_value = 0;
		
		// We have methods for this, but they'd call the functions to get the keys an additional time for every product. 
		$is_instrument = array_intersect( $term_ids, $instrument_key );
		$is_mouthpiece = array_intersect( $term_ids, $mouthpiece_key );
		$is_accessory = array_intersect( $term_ids, $accessory_key );

		$index = false;
		
		foreach ( $term_ids as $term_id ) {
			
			if ( $is_instrument ) {
			
				$index = array_search( $term_id, $instrument_key );
				
			}
			else if ( $is_mouthpiece ) {
			
				// Check against mouthpieces
				$index = array_search( $term_id, $mouthpiece_key );

			}
			else if ( $is_accessory ) {
			
				// Check against Accessories
				$index = array_search( $term_id, $accessory_key );

			}

			if ( $index !== false ) {

				$index = $index + 1; // Cannot zero-index otherwise we may not actually save a value

				if ( $index > $sort_value ) {

					$sort_value = $index;

				}

			}
			
		}
		
		if ( $sort_value > 0 ) {
			
			$update = update_post_meta( $product_id, 'product_sort_order', (int) $sort_value );
			
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