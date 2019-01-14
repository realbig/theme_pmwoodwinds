<?php

class pmwoodwinds_import_attributes_process extends WP_Background_Process {

	/**
	 * @var string
	 */
	protected $action = 'pmwoodwinds_import_attributes';

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
		
		$attributes = array();
		
		if ( get_post_meta( $product_id, '_product_new', true ) !== 'no' ) {
			
			// Set to New
			$term = term_exists( 'new', wc_attribute_taxonomy_name( 'Is New?' ) );
			
			$value = array( (int) $term['term_id'] );
			
		}
		else {
			
			// Set to Used
			$term = term_exists( 'used', wc_attribute_taxonomy_name( 'Is New?' ) );
			
			$value = array( (int) $term['term_id'] );
			
		}
		
		$is_new_attribute = new WC_Product_Attribute();
		$is_new_attribute->set_id( 1 );
		$is_new_attribute->set_name( wc_attribute_taxonomy_name( 'Is New?' ) );
		$is_new_attribute->set_options( $value );
		$is_new_attribute->set_visible( false );

		$attributes[] = $is_new_attribute;
		
		if ( $inventory_value = esc_attr( strtolower( get_post_meta( $product_id, '_inhouse_inventory', true ) ) ) ) {
			
			// Find pre-generated Term
			$term = term_exists( $inventory_value, wc_attribute_taxonomy_name( 'In-House Inventory' ) );
			
			if ( ! $term ) {
				
				$term = term_exists( 'used', wc_attribute_taxonomy_name( 'In-House Inventory' ) );
				
				$value = array( (int) $term['term_id'] );
				
			}
			else {
				$value = array( (int) $term['term_id'] );
			}
		
			$inventory_attribute = new WC_Product_Attribute();
			$inventory_attribute->set_id( 1 );
			$inventory_attribute->set_name( wc_attribute_taxonomy_name( 'In-House Inventory' ) );
			$inventory_attribute->set_options( $value );
			$inventory_attribute->set_visible( false );
			
			$attributes[] = $inventory_attribute;
			
		}
		
		if ( $year_value = esc_attr( strtolower( get_post_meta( $product_id, '_product_year', true ) ) ) ) {
			
			if ( $term = term_exists( $year_value, wc_attribute_taxonomy_name( 'Product Year' ) ) ) {
				$value = array( (int) $term['term_id'] );
			}
			else {
				$term = wp_insert_term( $year_value, wc_attribute_taxonomy_name( 'Product Year' ) );
				$value = array( (int) $term['term_id'] );
			}
		
			$year_attribute = new WC_Product_Attribute();
			$year_attribute->set_id( 1 );
			$year_attribute->set_name( wc_attribute_taxonomy_name( 'Product Year' ) );
			$year_attribute->set_options( $value );
			$year_attribute->set_visible( true );
			
			$attributes[] = $year_attribute;
			
		}
		
		$product->set_attributes( $attributes );
		
		$product->save();
		
		//delete_post_meta( $product_id, '_product_new' );
		//delete_post_meta( $product_id, '_inhouse_inventory' );
		//delete_post_meta( $product_id, '_product_year' );
		
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
		
		error_log( "Attributes Import Complete" );
		update_option( 'pmwoodwind_attributes_import_complete', true );
		
	}

}