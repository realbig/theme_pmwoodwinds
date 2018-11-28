<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

if ( ! class_exists( 'pmwoodwinds_image_import' ) ) {

	class pmwoodwinds_image_import {

		function __construct() {
			
			require_once __DIR__ . '/import-photos-process.php';
			
			$this->process_all = new pmwoodwinds_image_import_process();
			
			add_action( 'admin_init', array( $this, 'process_handler' ) );
			
		}
		
		/**
		 * Process handler
		 */
		public function process_handler() {
			
			if ( isset( $_GET['fix_images'] ) && 
			   $_GET['fix_images'] ) {
				
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
				'meta_query' => array(
					'relation' => 'AND',
					array(
						'key' => '_sku',
						'compare' => 'EXISTS',
					),
				),
			) );
			
			return $products->posts;
			
		}
		
	}
	
}

$instance = new pmwoodwinds_image_import();