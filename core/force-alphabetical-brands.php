<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

if ( ! class_exists( 'pmwoodwinds_force_alphabetical_brands' ) ) {

	class pmwoodwinds_force_alphabetical_brands {

		function __construct() {
			
			require_once __DIR__ . '/force-alphabetical-brands-process.php';
			
			$this->process_all = new pmwoodwinds_force_alphabetical_brands_process();
			
			add_action( 'admin_init', array( $this, 'process_handler' ) );
			
		}
		
		/**
		 * Process handler
		 */
		public function process_handler() {
			
			if ( isset( $_GET['force_alphabetical_brands'] ) && 
			   $_GET['force_alphabetical_brands'] ) {
				
				$this->handle_all();
				
			}
			
        }
        
        /**
		 * Handle all
		 */
		protected function handle_all() {
			
			$brands = $this->get_brands();
			
			foreach ( $brands as $index => $term_id ) {

                $data = array(
                    'term_id' => $term_id,
                    'tax_position' => $index + 1,
                );

				$this->process_all->push_to_queue( $data );
			}
			
			$this->process_all->save()->dispatch();
			
		}
		
		/**
		 * Get names
		 *
		 * @return array
		 */
		protected function get_brands() {
			
			$brands = $this->get_brand_list_recursive( 0 );
			
            error_log( count( $brands ) . " Brands Found. Starting..." );
			
			return $brands;
			
        }
        
        private function get_brand_list_recursive( $term_id, &$sorted = array() ) {

            // We need the Name key, so we cannot only pull in the Term ID
            $terms = get_terms( 'pwb-brand', array( 'parent' => $term_id, 'hide_empty' => false ) );
        
            usort( $terms, 'pmwoodwind_sort_by_term_name' );
        
            foreach ( $terms as $term ) {
        
                $sorted[] = $term->term_id;
        
                $this->get_brand_list_recursive( $term->term_id, $sorted );
        
            }
        
            return $sorted;
        
        }
		
	}
	
}

$instance = new pmwoodwinds_force_alphabetical_brands();