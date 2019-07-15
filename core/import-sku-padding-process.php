<?php

class pmwoodwinds_import_sku_padding_process extends WP_Background_Process {

	/**
	 * @var string
	 */
	protected $action = 'pmwoodwinds_import_sku_padding';

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

        $sku = get_post_meta( $product_id, '_sku', true );
        $sku = ( ! $sku ) ? '0' : $sku;
		
        $sorting_sku = pmwoodwind_pad_sku_for_sorting( $sku );
        
        update_post_meta( $product_id, '_sorting_sku', $sorting_sku );
		
		error_log( "$product_id has been updated with Sorting SKU of $sorting_sku" );

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
		
		error_log( "SKU Padding Import Complete" );
		update_option( 'pmwoodwind_sku_padding_import_complete', true );
		
	}

}