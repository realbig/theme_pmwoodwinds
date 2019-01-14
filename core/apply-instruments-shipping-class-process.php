<?php

class pmwoodwinds_apply_instruments_shipping_class_process extends WP_Background_Process {

	/**
	 * @var string
	 */
	protected $action = 'pmwoodwinds_apply_instruments_shipping_class';

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
		
		$product = wc_get_product( $product_id );
		$instrument_shipping_class = get_term_by( 'slug', 'instrument', 'product_shipping_class' );
		$product->set_shipping_class_id( $instrument_shipping_class->term_id );
		$product->save();
		
		error_log( "$product_id has been updated" );

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
		
		error_log( "Instruments Shipping Class Applied" );
		update_option( 'pmwoodwind_instruments_shipping_class_complete', true );
		
	}

}