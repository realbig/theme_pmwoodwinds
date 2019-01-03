<?php
/**
 * Modify some WooCommerce things in a flexible manner
 * @since {{VERSION}}
 */

add_filter( 'woocommerce_product_get_image', 'pmwoodwind_add_classes_to_woocommerce_product_image', 99, 5 );

/**
 * Add some class names to the WooCommerce product images
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
function pmwoodwind_add_classes_to_woocommerce_product_image( $html, $product, $size, $attr, $placeholder ) {
	
	if ( is_tax( 'product_cat' ) || $size == 'main_image' ) {
		
		$html = str_replace( 'class="', 'class="main-image zoom ', $html );
		
	}
	
	return $html;
	
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
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );
}

// Put the fancy header at the top
add_action( 'pmwoodwind_product_single_image_column_before', function() {
	
	?>
	
	<div id="latest-work" class="product-page container hover-section">
		<div class="category-head">
			<h1><?php the_title();?></h1>
			<div class="bars-animation">
				<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/hicon.png" alt="PM">
			</div>
		</div><!-- Category Head -->

<?php 
	
} );

add_action( 'woocommerce_before_single_product_summary', 'pmwoodwind_product_single_image_column_start', 1 ); 

/**
 * Wraps the Image Column on Product Single in a proper Column without needing to edit the Template
 * 
 * @since		{{VERSION}}
 * @return		void
 */
function pmwoodwind_product_single_image_column_start() { 
	
		do_action( 'pmwoodwind_product_single_image_column_before' );

		?>

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

remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_title', 5 );

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
	
	do_action( 'pmwoodwind_product_single_summary_column_end' );
	
}

add_filter( 'woocommerce_single_product_carousel_options', 'pmwoodwind_flexslider_options' );

/**
 * Modify Options for Flexslider (The Slider that is used for the the Product Gallery)
 * 
 * @param		array $options Photoswipe Options
 *                                   
 * @sincee		{{VERSION}}
 * @return		array Photoswipe Options
 */
function pmwoodwind_flexslider_options( $options ) {

    $options['directionNav'] = true; // Arrows
	$options['controlNav'] = false; // Thumbnails below Slider
	$options['slideshow'] = true; // Auto-progress slides, since we're hiding thumbnails	
	
    return $options;
}

add_filter( 'woocommerce_single_product_photoswipe_options', 'pmwoodwind_photoswipe_options' );

/**
 * Modify Options for Photoswipe (The Lightbox that is shown when clicking on the Product Gallery)
 * 
 * @param		array $options Photoswipe Options
 *                                   
 * @sincee		{{VERSION}}
 * @return		array Photoswipe Options
 */
function pmwoodwind_photoswipe_options( $options ) {
	
	$options['captionEl'] = false;
	
	return $options;
	
}

add_filter( 'woocommerce_get_price_html', 'pmwoodwind_modify_product_single_price_html', 10, 2 );

/**
 * Replace Price HTML with the custom HTML from the old implementation on Product Single
 * 
 * @param		string $html    HTML
 * @param		object $product WC_Product
 *                         
 * @since		{{VERSION}}
 * @return		string HTML
 */
function pmwoodwind_modify_product_single_price_html( $html, $product ) {
	
	if ( ! is_single() ) return $html;
	
	$html = '';
	
	$_product_attributes = get_post_meta( get_the_ID(), '_product_attributes', true );
	
	ob_start();
	
	if ( pmwoodwind_is_new_product( get_the_ID() ) && 
		get_post_meta( get_the_ID(), '_msrp', true ) && 
		( ! isset( $_product_attributes['is_variation'] ) || $_product_attributes['is_variation'] === 0 ) ) {
		
		$msrp = get_post_meta( get_the_ID(), '_msrp', true );
		
		?>
		MSRP: <span><?php echo money_format("$ <span price='".$msrp."' class='priceitem'>%i</span>",$msrp);?></span>
		<?php
		
	}
	
	$price = pmwoodwind_product_main_price( get_the_id() );

	if ( is_numeric( $price ) && 
		( ! isset( $_product_attributes['is_variation'] ) || $_product_attributes['is_variation'] === 0 ) ) : ?>

		Our Price: <span><?php echo money_format("$ <span price='".$price."' class='priceitem'>%i</span>",$price);?></span>

	<?php endif;
	
	$html = ob_get_clean();
	
	return $html;
	
}

add_action( 'pmwoodwind_product_single_summary_column_end', function() {
	
	// Only use the custom HTML within the Summary Column
	remove_filter( 'woocommerce_get_price_html', 'pmwoodwind_modify_product_single_price_html', 10 );
	
} );

// Bump Meta above the Add-to-cart button
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );
add_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 11 );

add_filter( 'get_the_terms', 'pmwoodwind_show_only_child_categories', 10, 3 );

/**
 * Only show Child Categories on Product Single
 * 
 * @param		array   $terms    Terms
 * @param		integer $post_id  Post ID
 * @param		string  $taxonomy Taxonomy
 *                           
 * @since		{{VERSION}}
 * @return		array   Terms
 */
function pmwoodwind_show_only_child_categories( $terms, $post_id, $taxonomy ) {
	
	if ( $taxonomy !== 'product_cat' ) return $terms;
	
	if ( ! is_single() ) return $terms;
	
	$terms = array_filter( $terms, function( $term ) {
		return $term->parent !== 0;
	} );
	
	return $terms;
	
}

add_action( 'woocommerce_product_meta_end', 'pmwoodwind_show_product_single_brand', 10 );

/**
 * Show the Brand on Single Products
 * 
 * @since		{{VERSION}}
 * @return		void
 */
function pmwoodwind_show_product_single_brand() {
	
	if ( $brand = pmwoodwind_product_get_brand( get_the_id() ) ) : ?>

		<span>Brand: <?php echo $brand[0]->name;?></span>

	<?php endif;
	
}

add_action( 'woocommerce_product_meta_end', 'pmwoodwind_show_product_single_inventory', 11 );

/**
 * Show the custom Inventory String on Single Products
 * 
 * @since		{{VERSION}}
 * @return		void
 */
function pmwoodwind_show_product_single_inventory() {
	
	if ( $inventory = pmwoodwind_get_inventory( get_the_id() ) ) : ?>

		<span>Inventory: <?php echo $inventory; ?></span>

	<?php endif;
	
}

add_filter( 'woocommerce_get_stock_html', 'pmwoodwind_hide_product_single_stock_html', 10, 2 );

/**
 * There is a custom implementation for Stock, so hide WooCommerce's
 * 
 * @param		string $html    HTML
 * @param		object $product WC_Product
 *                         
 * @since		{{VERSION}}
 * @return		string HTML
 */
function pmwoodwind_hide_product_single_stock_html( $html, $product ) {
	
	return '';
	
}