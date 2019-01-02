<?php
/**
 * Modify some WooCommerce things in a flexible manner
 * @since {{VERSION}}
 */

//add_filter( 'woocommerce_product_get_image', 'pmwoodwind_woocommerce_product_get_image', 10, 6 );

/**
 * Wrap the WooCommerce Product Image with some additional HTML
 * 
 * @param		string  $image_html  Image HTML
 * @param		object  $product     WooCommerce Product Object
 * @param		string  $size        Image Size
 * @param		array   $attr        Image Attributes?
 * @param		boolean $placeholder Whether to show a Placeholder if no image exists
 * @param		integer $image    Attachment ID
 *                                         
 * @since		{{VERSION}}
 * @return		string  Image HTML
 */
function pmwoodwind_woocommerce_product_get_image( $image_html, $product, $size, $attr, $placeholder, $image ) {
	
	$image_html = '<div class="pmwoodwind-woocommerce-image-container"><div class="image-background"></div>' . $image_html . '<div class="image-overlay"></div></div>';
	
	return $image_html;
	
}

add_action( 'after_setup_theme', 'pmwoodwind_add_woocommerce_support' );

/**
 * Add Theme Support for WooCommerce, allowing half of their templating functions to actually work
 * 
 * @since		{{VERSION}}
 * @return		void
 */
function pmwoodwind_add_woocommerce_support() {
	add_theme_support( 'woocommerce' );
}

add_action( 'woocommerce_before_single_product_summary', 'pmwoodwind_product_single_image_column_start', 1 ); 

/**
 * Wraps the Image Column on Product Single in a proper Column without needing to edit the Template
 * 
 * @since		{{VERSION}}
 * @return		void
 */
function pmwoodwind_product_single_image_column_start() { ?>

		<div class="col-sm-12 col-md-6 image-column">

	<?php
	
}

add_action( 'woocommerce_before_single_product_summary', 'pmwoodwind_product_single_image_column_end', 25 );

/**
 * Wraps the Image Column on Product Single in a proper Column without needing to edit the Template
 * 
 * @since		{{VERSION}}
 * @return		void
 */
function pmwoodwind_product_single_image_column_end() { ?>
			
		</div>
	
	<?php
	
}

add_action( 'woocommerce_before_single_product_summary', 'pmwoodwind_product_single_summary_column_start', 99 );

/**
 * Wraps the Summary Column on Product Single in a proper Column without needing to edit the Template
 * 
 * @since		{{VERSION}}
 * @return		void
 */
function pmwoodwind_product_single_summary_column_start() { ?>

		<div class="col-sm-12 col-md-6 summary-column">

	<?php
	
}

add_action( 'woocommerce_after_single_product_summary', 'pmwoodwind_product_single_summary_column_end', 1 );

/**
 * Wraps the Summary Column on Product Single in a proper Column without needing to edit the Template
 * 
 * @since		{{VERSION}}
 * @return		void
 */
function pmwoodwind_product_single_summary_column_end() { ?>
			
		</div>
			
	<?php
	
}