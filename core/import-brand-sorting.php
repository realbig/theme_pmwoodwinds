<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

if ( ! class_exists( 'pmwoodwinds_import_brand_sorting' ) ) {

	class pmwoodwinds_import_brand_sorting {

		function __construct() {
			
			require_once __DIR__ . '/import-brand-sorting-process.php';
			
			$this->process_all = new pmwoodwinds_import_brand_sorting_process();
			
			add_action( 'admin_init', array( $this, 'process_handler' ) );

			// Re-index whenever someone adds/deletes/reorders the Product Categories
			add_action( 'create_pwb-brand', array( $this, 'categories_updated' ) );
			add_action( 'edited_pwb-brand', array( $this, 'categories_updated' ) );
			add_action( 'delete_pwb-brand', array( $this, 'categories_updated' ) );

			// Update Brand Sorting Key rearranging Categories
			add_action( 'yikes_sto_taxonomy_order_updated', array( $this, 'categories_reordered' ) );
			
		}
		
		/**
		 * Process handler
		 */
		public function process_handler() {
			
			if ( isset( $_GET['fix_brand_sorting'] ) && 
			   $_GET['fix_brand_sorting'] ) {
				
				$this->handle_all();
				
			}
			
		}

		public function categories_updated() {

			$this->handle_all();

		}

		public function categories_reordered( $taxonomy_ordering_data ) {

			$term_id = pmwoodwind_extract_term_id_from_taxonomy_reorder_ajax( $taxonomy_ordering_data );

			if ( ! $term_id ) return;

			$term = get_term( $term_id );

			if ( $term->taxonomy !== 'pwb-brand' ) return;

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

$instance = new pmwoodwinds_import_brand_sorting();