<?php

class pmwoodwinds_import_product_visibility_exclusions_process extends WP_Background_Process {

	/**
	 * @var string
	 */
	protected $action = 'pmwoodwinds_import_product_visibility_exclusions';

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

        $term = get_term_by( 'slug', 'rare-and-collectible', 'product_cat' );

        if ( in_array( $term->term_id, $term_ids ) && 
            pmwoodwind_product_is_sold( $product_id ) ) {

            // Hide Rare and Collectable Products that have Sold by default
            update_post_meta( $product_id, 'pmwoodwind_hide_product_in_archive', true );

        }
        else {
            delete_post_meta( $product_id, 'pmwoodwind_hide_product_in_archive' );
        }
		
		error_log( "$product_id has been processed for visibility" );

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
		
		error_log( "Product Visibility Exclusions Complete" );
		update_option( 'pmwoodwind_product_visibility_exclusions_complete', true );
		
	}

}