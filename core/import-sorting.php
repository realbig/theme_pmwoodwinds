<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

if ( ! class_exists( 'pmwoodwinds_import_sorting' ) ) {

	class pmwoodwinds_import_sorting {

		function __construct() {
			
			require_once __DIR__ . '/import-sorting-process.php';
			
			$this->process_all = new pmwoodwinds_import_sorting_process();
			
			add_action( 'admin_init', array( $this, 'process_handler' ) );

			// Re-index whenever someone adds/deletes/reorders the Product Categories
			add_action( 'create_product_cat', array( $this, 'categories_updated' ) );
			add_action( 'edited_product_cat', array( $this, 'categories_updated' ) );
			add_action( 'delete_product_cat', array( $this, 'categories_updated' ) );

			// Update Product Sorting Key when using the Taxonomy Order menu
			add_action( 'tto/update-order', array( $this, 'categories_updated' ) );
			
		}
		
		/**
		 * Process handler
		 */
		public function process_handler() {
			
			if ( isset( $_GET['fix_sorting'] ) && 
			   $_GET['fix_sorting'] ) {
				
				$this->handle_all();
				
			}
			
		}

		public function categories_updated() {

			$this->handle_all();

		}
		
		/**
		 * Handle all
		 */
		protected function handle_all() {
			
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
				'post_status' => 'publish',
			) );
			
			error_log( count( $products->posts ) . " Products Found. Starting..." );
			
			return $products->posts;
			
		}
		
	}
	
}

$instance = new pmwoodwinds_import_sorting();