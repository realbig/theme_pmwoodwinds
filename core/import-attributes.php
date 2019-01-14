<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

if ( ! class_exists( 'pmwoodwinds_import_attributes' ) ) {

	class pmwoodwinds_import_attributes {

		function __construct() {
			
			require_once __DIR__ . '/import-attributes-process.php';
			
			$this->process_all = new pmwoodwinds_import_attributes_process();
			
			add_action( 'admin_init', array( $this, 'process_handler' ) );
			
		}
		
		/**
		 * Process handler
		 */
		public function process_handler() {
			
			if ( isset( $_GET['fix_attributes'] ) && 
			   $_GET['fix_attributes'] ) {
				
				$this->handle_all();
				
			}
			
		}
		
		/**
		 * Handle all
		 */
		protected function handle_all() {
			
			$inventory_options = array(
				'New' => "New",
				'Used' => "Used",
				'OutOnTrial' => "Out On Trial",
				'SalePending' => "Sale Pending",
				'Sold' => "Sold",
				'TBD' => "TBD",
				'IS' => "In Stock",
				'OOS' => "Out Of Stock",
				'TOOT' => "Temporarily Out Of Stock",
				'Discontinued' => "Discontinued",
			);
			
			foreach ( $inventory_options as $slug => $label ) {
				
				if ( term_exists( $label, wc_attribute_taxonomy_name( 'In-House Inventory' ) ) ) continue;
				
				// Create a Term for each, since we want them to exist even if they're empty
				$term = wp_insert_term( $label, wc_attribute_taxonomy_name( 'In-House Inventory' ), array(
					'slug' => $slug,
				) );
				
			}
			
			$products = $this->get_products();
			
			foreach ( $products as $product_id ) {
				$this->process_all->push_to_queue( $product_id );
			}
			
			$this->process_all->save()->dispatch();
			
		}
		
		/**
		 * Get names
		 *
		 * @return array
		 */
		protected function get_products() {
			
			$products = new WP_Query( array(
				'post_type' => 'product',
				'fields' => 'ids',
				'posts_per_page' => -1,
			) );
			
			error_log( count( $products->posts ) . " Products Found. Starting..." );
			
			return $products->posts;
			
		}
		
	}
	
}

$instance = new pmwoodwinds_import_attributes();