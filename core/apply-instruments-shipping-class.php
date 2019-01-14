<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

if ( ! class_exists( 'pmwoodwinds_apply_instruments_shipping_class' ) ) {

	class pmwoodwinds_apply_instruments_shipping_class {

		function __construct() {
			
			require_once __DIR__ . '/apply-instruments-shipping-class-process.php';
			
			$this->process_all = new pmwoodwinds_apply_instruments_shipping_class_process();
			
			add_action( 'admin_init', array( $this, 'process_handler' ) );
			
		}
		
		/**
		 * Process handler
		 */
		public function process_handler() {
			
			if ( isset( $_GET['fix_intruments_shipping_class'] ) && 
			   $_GET['fix_intruments_shipping_class'] ) {
				
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
				'tax_query' => array(
					'relation' => 'AND',
					array(
						'taxonomy' => 'product_cat',
						'field' => 'slug',
						'terms' => array( 'instruments' ),
					),
				),
			) );
			
			error_log( count( $products->posts ) . " Products Found. Starting..." );
			
			return $products->posts;
			
		}
		
	}
	
}

$instance = new pmwoodwinds_apply_instruments_shipping_class();