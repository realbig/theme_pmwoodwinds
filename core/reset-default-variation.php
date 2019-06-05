<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

if ( ! class_exists( 'pmwoodwinds_reset_default_variation' ) ) {

	class pmwoodwinds_reset_default_variation {

		function __construct() {
			
			require_once __DIR__ . '/reset-default-variation-process.php';
			
			$this->process_all = new pmwoodwinds_reset_default_variation_process();
			
			add_action( 'admin_init', array( $this, 'process_handler' ) );
			
		}
		
		/**
		 * Process handler
		 */
		public function process_handler() {
			
			if ( isset( $_GET['reset_default_variation'] ) && 
			   $_GET['reset_default_variation'] ) {
				
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

            $is_new_taxonomy = wc_attribute_taxonomy_name( 'Is New?' );
			
			$products = new WP_Query( array(
                'post_type' => 'product',
                'fields' => 'ids',
                'product_type' => 'variable',
                'posts_per_page' => -1,
                'tax_query' => array(
                    'taxonomy' => $is_new_taxonomy,
                    'terms' => 'New',
                    'field' => 'slug',
                ),
            ) );
			
			error_log( count( $products->posts ) . " Products Found. Starting..." );
			
			return $products->posts;
			
		}
		
	}
	
}

$instance = new pmwoodwinds_reset_default_variation();