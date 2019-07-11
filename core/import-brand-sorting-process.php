<?php

class pmwoodwinds_import_brand_sorting_process extends WP_Background_Process {

	/**
	 * @var string
	 */
	protected $action = 'pmwoodwinds_import_brand_sorting';

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
		
		$post_term_ids = get_the_terms( $product_id, 'pwb-brand' );

		$term_ids = array();
		
		if ( is_array( $post_term_ids ) ) {

			foreach ( $post_term_ids as $term ) {
				$term_ids[] = $term->term_id;
			}

		}
		
		$brand_key = pmwoodwind_get_brand_sorting_key();
		
		$sort_value = 0;

		$index = false;
		
		foreach ( $term_ids as $term_id ) {
			
			$index = array_search( $term_id, $brand_key );

			if ( $index !== false ) {

				$index = $index + 1; // Cannot zero-index otherwise we may not actually save a value

				if ( $index > $sort_value ) {

					$sort_value = $index;

				}

			}
			
		}
		
		if ( $sort_value > 0 ) {
			
			$update = update_post_meta( $product_id, 'product_brand_sort_order', (int) $sort_value );
			
		}
		
		error_log( "$product_id has been updated with Brand Sort Value of $sort_value" );

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
		
		error_log( "Sorting Brand Import Complete" );
		update_option( 'pmwoodwind_brand_sorting_import_complete', true );
		
	}

}