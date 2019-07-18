<?php

class pmwoodwinds_force_alphabetical_brands_process extends WP_Background_Process {

	/**
	 * @var string
	 */
	protected $action = 'pmwoodwinds_force_alphabetical_brands';

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
	protected function task( $data ) {

        global $wpdb;
		
		update_term_meta( $data['term_id'], 'tax_position', $data['tax_position'] );
		
		error_log( $data['term_id'] . " has been updated with Tax Position of " . $data['tax_position'] );

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
		
		error_log( "Brand Alphabetization Complete" );
		update_option( 'pmwoodwind_brand_alphabetization_complete', true );
		
	}

}