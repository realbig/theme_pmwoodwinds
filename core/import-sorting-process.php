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
		
		$terms = get_the_terms( $product_id, 'product_cat' );
		
		if ( ! is_array( $terms ) ) $terms = array();
		
		$instrument_key = array_map( 'strtolower', pmwoodwind_get_instrument_sorting_key() );
		$mouthpiece_key = array_map( 'strtolower', pmwoodwind_get_mouthpiece_sorting_key() );
		$accessory_key = array_map( 'strtolower', pmwoodwind_get_accessory_sorting_key() );
		
		$sort_value = 0;
		
		foreach ( $terms as $term ) {
			
			$index = array_search( strtolower( $term->name ), $instrument_key );
			
			if ( $index == false ) {
			
				// Check against mouthpieces
				$index = array_search( strtolower( $term->name ), $mouthpiece_key );

			}
			
			if ( $index == false ) {
			
				// Check against Accessories
				$index = array_search( strtolower( $term->name ), $accessory_key );

			}

			if ( $index !== false ) {

				$index = $index + 1; // Cannot zero-index otherwise we may not actually save a value

				if ( $index > $sort_value ) {

					$sort_value = $index;

				}

			}
			
		}
		
		if ( $sort_value > 0 ) {
			
			$update = update_post_meta( $product_id, 'product_sort_order', $sort_value );
			
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