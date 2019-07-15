<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

if ( ! class_exists( 'pmwoodwinds_import_sku_padding' ) ) {

	class pmwoodwinds_import_sku_padding {

		function __construct() {
			
			require_once __DIR__ . '/import-sku-padding-process.php';
			
			$this->process_all = new pmwoodwinds_import_sku_padding_process();
			
			add_action( 'admin_init', array( $this, 'process_handler' ) );
			
		}
		
		/**
		 * Process handler
		 */
		public function process_handler() {
			
			if ( isset( $_GET['fix_sku_padding'] ) && 
			   $_GET['fix_sku_padding'] ) {
				
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

            global $wpdb;

            // Ensure this is set and up-to-date
            update_option( 'pmwoodwind_sku_length', (int) pmwoodwind_get_max_sku_length() );

            $taxonomy = wc_attribute_taxonomy_name( 'Is New?' );

            $term = term_exists( 'used', $taxonomy );
            $term_id = (int) $term['term_id'];
            
            // Only update Used Instruments. Seems to be all that matters, for now
			$products = new WP_Query( array(
				'post_type' => 'product',
				'fields' => 'ids',
				'posts_per_page' => -1,
                'post_status' => 'publish',
                'tax_query' => array(
                    'relation' => 'AND',
					array(
						'taxonomy' => 'product_cat',
						'field' => 'slug',
						'terms' => array( 'instruments' ),
                    ),
                    array(
                        'taxonomy' => $taxonomy,
                        'field' => 'term_id',
                        'terms' => array( $term_id ),
                        'operator' => 'IN',
                    ),
                ),
			) );
			
			error_log( count( $products->posts ) . " Products Found. Starting..." );
			
			return $products->posts;
			
		}
		
	}
	
}

$instance = new pmwoodwinds_import_sku_padding();