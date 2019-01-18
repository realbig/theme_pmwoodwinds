<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

if ( ! class_exists( 'pmwoodwinds_import_sorting' ) ) {

	class pmwoodwinds_import_sorting {

		function __construct() {
			
			require_once __DIR__ . '/import-sorting-process.php';
			
			$this->process_all = new pmwoodwinds_import_sorting_process();
			
			add_action( 'admin_init', array( $this, 'process_handler' ) );
			
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
			) );
			
			error_log( count( $products->posts ) . " Products Found. Starting..." );
			
			return $products->posts;
			
		}
		
	}
	
}

$instance = new pmwoodwinds_import_sorting();