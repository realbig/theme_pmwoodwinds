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
	
	if ( get_page_template_slug() == 'compare.php' ) return $html;
	
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
	
	<div class="category-head">
		<h1><?php the_title();?></h1>
		<div class="bars-animation">
			<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/hicon.png" alt="PM">
		</div>
	</div><!-- Category Head -->

<?php 
	
} );

add_action( 'pmwoodwind_product_cat_header', function() {
	
	?>
	
	<div class="category-head">
		<h4><?php echo single_cat_title();?></h4>
		<div class="bars-animation">
			<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/hicon.png" alt="PM">
		</div>
	</div><!-- Category Head -->

<?php 
	
} );

add_action( 'pmwoodwind_product_cat_header', 'pmwoodwind_hide_product_cat_title' );

function pmwoodwind_hide_product_cat_title() {
	
	// Hide WooCommerce's included Page Title on Product Category Archives
	add_filter( 'woocommerce_show_page_title', '__return_false' );
	
}

add_action( 'pmwoodwind_product_cat_header', 'pmwoodwind_hide_product_cat_add_to_cart' );

function pmwoodwind_hide_product_cat_add_to_cart() {
	
	// Remove Add To Cart Button on Product Category Archives
	remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );
	
}

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

		<div class="col-sm-12 col-md-7 image-column">

	<?php
	
}

add_action( 'woocommerce_before_single_product_summary', 'pmwoodwind_product_single_image_column_end', 98 );

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

		<div class="col-sm-12 col-md-5 summary-column">

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

add_action( 'woocommerce_after_single_product_summary', function() {
	
	?>

	<div class="col-sm-12 product-content">
		<?php the_content(); ?>
	</div>

	<?php 
	
} );

/**
 * Swap out the Image returned by the Compare Widget
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
function pmwoodwind_force_compare_widget_to_use_main_image( $image_html, $product, $size, $attr, $placeholder, $image ) {
	
	// Override size
	$size = 'main_image';
	
	if ( $product->get_image_id() ) {
		$image_html = wp_get_attachment_image( $product->get_image_id(), $size, false, $attr );
	} elseif ( $product->get_parent_id() ) {
		$parent_product = wc_get_product( $product->get_parent_id() );
		if ( $parent_product ) {
			$image_html = $parent_product->get_image( $size, $attr, $placeholder );
		}
	}

	if ( ! $image_html && $placeholder ) {
		$image_html = wc_placeholder_img( $size );
	}
	
	return $image_html;
	
}

add_action( 'woocommerce_after_single_product_summary', function() { ?>

<div class="row">
	
	<div class="col-sm-12">
		
		<div class="similar">
			
			<?php if ( is_active_sidebar( 'compare' ) ) : 
																	
				pmwoodwind_compare_product_widget_image_fix_start();
					
				dynamic_sidebar( 'compare' );
																	
				pmwoodwind_compare_product_widget_image_fix_end();
	
			endif; ?>
	
		</div>	
			
	</div>
	
</div>

<?php
	
} );

function pmwoodwind_compare_product_widget_image_fix_start() {
	
	add_filter( 'woocommerce_product_get_image', 'pmwoodwind_force_compare_widget_to_use_main_image', 10, 6 );
	
}

function pmwoodwind_compare_product_widget_image_fix_end() {
	
	remove_filter( 'woocommerce_product_get_image', 'pmwoodwind_force_compare_widget_to_use_main_image', 10, 6 );
	
}

add_action( 'wp_ajax_wc_products_compare_add_product_ajax', 'pmwoodwind_compare_product_widget_image_fix_start', 1 );
add_action( 'wp_ajax_nopriv_wc_products_compare_add_product_ajax', 'pmwoodwind_compare_product_widget_image_fix_start', 1 );

add_action( 'wp_ajax_wc_products_compare_add_product_ajax', 'pmwoodwind_compare_product_widget_image_fix_end', 11 );
add_action( 'wp_ajax_nopriv_wc_products_compare_add_product_ajax', 'pmwoodwind_compare_product_widget_image_fix_end', 11 );


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

	$options['controlNav'] = false; // Thumbnails below Slider. We're adding a second slider to handle this
	//$options['slideshow'] = true;
	// We cannot use Slideshow due to relying upon $.fn.wc_product_gallery() being available. If Slideshow is enabled, then it tries to run before the second slider is added and it fails
	
	$options['sync'] = '.pmwoodwind-product-gallery-carousel';
	
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
	$options['maxSpreadZoom'] = 2;
	$options['fullscreenEl'] = false;
	$options['zoomEl'] = true;
	
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
	
	ob_start();
	
	$msrp = get_post_meta( get_the_ID(), 'msrp', true );
	
	if ( $product->get_type() == 'variable' ) {
		
		$default_attributes = pmwoodwind_get_default_attributes( $product );

		$variation_id = pmwoodwind_find_matching_product_variation( $product, $default_attributes );

		if ( $variation_id ) {
		
			$msrp = get_post_meta( $variation_id, 'msrp', true );

		}
		else {

			$msrp = 0;
			$variations = $product->get_children();

			foreach ( $variations as $variation_id ) {

				$variation_msrp = get_post_meta( $variation_id, 'msrp', true );

				if ( $msrp == 0 || 
					$variation_msrp < $msrp ) {
					$msrp = $variation_msrp;
				}

			}

		}
		
	}
	
	if ( $msrp ) {
		
		?>
		MSRP: <span><?php echo money_format( "$ <span class='msrp'>%i</span>", (float) $msrp );?></span><br />
		<?php
		
	}
	
	$price = pmwoodwind_product_main_price( get_the_id() );

	if ( is_numeric( $price ) ) : ?>

		<?php if ( $msrp ) : ?>

			Our 

		<?php endif; ?>

			Price: <span><?php echo money_format( "$ <span class='regular-price'>%i</span>", (float) $price );?></span><br />

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
 * Only show the "most" Child Category on Product Single
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
	
	$child = end( $terms );
	
	return array( $child );
	
}

add_filter( 'ngettext', 'pmwoodwinds_remove_categories_text', 10, 5 );

/**
 * Forcefully remove the Translation for "Category:" and "Categories:" which are used on Product Single
 * 
 * @param		string  $translation The resulting Translation
 * @param		string  $single      The string that would be used if there's only 1 item
 * @param		string  $plural      The string that would be used if there's more than 1 item
 * @param		integer $number      The number of items
 * @param		string  $domain      The Text Domain
 *                                       
 * @since		{{VERSION}}
 * @return		string  The resulting Translation
 */
function pmwoodwinds_remove_categories_text( $translation, $single, $plural, $number, $domain ) {
	
	if ( $domain !== 'woocommerce' ) return $translation;
	
	if ( $single !== 'Category:' || 
	   $plural !== 'Categories:' ) return $translation;
	
	return '';
	
}

add_filter( 'gettext', 'pmwoodwinds_change_sku_text', 10, 4 );

/**
 * Alter the label for SKU depending on the Product Categories and Attributes
 * 
 * @param		string  $translation			The resulting Translation
 * @param		string  $untranslated_text      The original string
 * @param		string  $domain					The Text Domain
 *                                       
 * @since		{{VERSION}}
 * @return		string  The resulting Translation
 */
function pmwoodwinds_change_sku_text( $translation, $untranslated_text, $domain ) {
	
	if ( $domain !== 'woocommerce' ) return $translation;
	
	if ( $untranslated_text !== 'SKU' && $untranslated_text !== 'SKU:' ) return $translation;
	
	$product_id = false;
	
	if ( ! is_admin() && 
	   is_single() ) {
		$product_id = get_the_ID();
	}
	else if ( isset( $_GET['post'] ) && 
			$_GET['post'] && 
			get_post_type( $_GET['post'] ) == 'product' ) {
		
		$product_id = $_GET['post'];
		
	}
	
	if ( ! $product_id ) $translation = 'Product ID'; // Not Saved yet
	
	if ( pmwoodwind_is_new_product( $product_id ) ) { // Everything New gets Product ID
		
		$translation = 'Product ID';
		
	}
	else if ( pmwoodwind_is_instrument( $product_id ) ) { // Used Instruments
		
		$translation = 'Serial #';
		
	}
	else if ( pmwoodwind_is_mouthpiece( $product_id ) ) { // Used Mouthpieces
		
		$translation = 'PMW #';
		
	}
	else { // All Other Used
		
		$translation = 'Product ID';
		
	}
	
	if ( substr( $untranslated_text, -1 ) == ':' ) {
		$translation .= ':';
	}
	
	return $translation;
	
}

add_action( 'woocommerce_product_meta_end', 'pmwoodwind_show_product_single_brand', 10 );

/**
 * Show the Brand on Single Products
 * 
 * @since		{{VERSION}}
 * @return		void
 */
function pmwoodwind_show_product_single_brand() {
	
	$brand = pmwoodwind_product_get_brand( get_the_id() );
	
	if ( $brand && 
	   ! is_wp_error( $brand ) ) : ?>

		<span>Brand: <?php echo $brand[0]->name;?></span>

	<?php endif;
	
}

add_action( 'woocommerce_product_meta_end', 'pmwoodwind_show_product_single_year', 11 );

/**
 * Show the custom Year String on Single Products
 * 
 * @since		{{VERSION}}
 * @return		void
 */
function pmwoodwind_show_product_single_year() {
	
	if ( $year = pmwoodwind_product_get_year( get_the_id() ) ) : ?>

		<span>Year: <?php echo $year; ?></span>

	<?php endif;
	
}

add_action( 'woocommerce_product_meta_end', 'pmwoodwind_show_product_single_inventory', 12 );

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

add_action( 'widgets_init', 'pmwoodwind_add_woocommerce_sidebar' );

/**
 * I could have sworn this was the default, but I suppose it is not?
 * 
 * @since		{{VERSION}}
 * @return		void
 */
function pmwoodwind_add_woocommerce_sidebar() {

	register_sidebar( array(
		'id' => 'shop',
		'name' => 'Default WooCommerce Sidebar',
		'description' => 'Shown on Product Archive Pages.',
	) );
	
	register_sidebar( array(
		'id' => 'instruments',
		'name' => 'Instruments Sidebar',
		'description' => 'Shown on Product Archive Pages.',
	) );
	
	register_sidebar( array(
		'id' => 'mouthpieces',
		'name' => 'Mouthpieces Sidebar',
		'description' => 'Shown on Product Archive Pages.',
	) );
	
	register_sidebar( array(
		'id' => 'accessories',
		'name' => 'Accessories Sidebar',
		'description' => 'Shown on Product Archive Pages.',
	) );
	
	register_sidebar( array(
		'id' => 'compare',
		'name' => 'Compare Products Sidebar',
		'description' => 'Shown on Product Single Pages.',
	) );
	
}

add_filter( 'single_product_archive_thumbnail_size', 'pmwoodwind_use_product_grid_image_size' );

function pmwoodwind_use_product_grid_image_size( $size ) {
	
	if ( is_tax( 'product_cat' ) ) {
		return 'product_grid';
	}
	
	return $size;
	
}

remove_action( 'woocommerce_cart_collaterals', 'woocommerce_cart_totals', 10 );

remove_action( 'woocommerce_proceed_to_checkout', 'woocommerce_button_proceed_to_checkout', 20 );

add_action( 'woocommerce_cart_contents', function() {
	
	?>

	</table>

	<?php woocommerce_cart_totals(); ?>

	<table class="shop_table shop_table_responsive cart woocommerce-cart-form__contents" cellspacing="0">
	
	<?php 

} );

add_action( 'woocommerce_cart_collaterals', 'woocommerce_button_proceed_to_checkout' );

add_filter( 'woocommerce_payment_complete_order_status', 'pmwoodwind_handle_payment_complete_order_status', -1, 2 );

/**
 * Change the Order Status on Order Completion for Bank Transfers
 * 
 * @param		string  $order_status Order Status
 * @param		integer $order_id     Order ID
 *
 * @since		{{VERSION}}
 * @return		string  Order Status
 */
function pmwoodwind_handle_payment_complete_order_status( $order_status, $order_id ) {
	
	$order = new WC_Order( $order_id );
	
	$payment_method = $order->get_payment_method();
	
	if ( $payment_method == 'bacs' ) return 'pending';
	
	return $order_status;
	
}

// Prevent unwanted listing of Attributes which were told to _not_ show on the Product page
// Like, seriously? This should be default based on the Attribute Option
add_action( 'woocommerce_product_meta_end', function() {

	add_filter( 'woocommerce_product_get_attributes', 'pmwoodwind_remove_attributes_listing' );
	
}, 99 );

function pmwoodwind_remove_attributes_listing( $attributes ) {

	return array_filter( $attributes, function( $attribute ) {
		return $attribute->get_variation() === true;
	} );
	
}

add_action( 'woocommerce_after_single_product_summary', function() {
	
	remove_filter( 'woocommerce_product_get_attributes', 'pmwoodwind_remove_attributes_listing' );
	
}, 1 );

add_action( 'woocommerce_single_product_summary', 'pmwoodwind_add_to_compare_button', 40 );

function pmwoodwind_add_to_compare_button() {
	
	$categories = wp_get_object_terms( get_the_ID(), 'product_cat' );
	
	$categories = array_filter( $categories, function( $category ) {
		return $category->parent == 0;
	} );
	
	$firsttype = array_values( $categories )[0];
	
	?>
		
		<div class="shares">
			
			<div class="compare-header">
				<h3 class="share"><i class="fa fa-navicon" aria-hidden="true"></i> Compare <?php the_title();?></h3>
			</div>
			
			<ul class="compare" style="width: auto;margin: 20px 0px;">
				
				<?php 
	
					if ( class_exists( 'WC_Products_Compare_Frontend' ) ) : 
				
						$compared_products = WC_Products_Compare_Frontend::get_compared_products();
						
						if ( ! is_array( $compared_products ) ) $compared_products = array(); 
	
						$compared_products = array_filter( $compared_products, function( $item ) {
							return $item !== 'false';
						} );
	
						?>
				
						<li style="width: auto;" class="woocommerce-products-compare-compare-button">
							
							<label>
							
								<input type="checkbox" class="woocommerce-products-compare-checkbox" data-product-id="<?php echo esc_attr( get_the_ID() ); ?>" <?php echo ( in_array( get_the_ID(), $compared_products ) ) ? 'checked' : ''; ?> id="woocommerce-products-compare-checkbox-<?php echo esc_attr( get_the_ID() );?>" />

								<span class="checkmark add">
									<i class="fa fa-plus"></i> add to compare
								</span>

								<span class="checkmark remove">
									<i class="fa fa-minus"></i> remove from compare
								</span>
								
							</label>
							
						</li>
				
					<?php endif; ?>
				
			</ul>
			
		</div>	
		<div class="shares">
			
			<h3 class="share"><i class="fa fa-share-alt" aria-hidden="true"></i> Share <?php the_title();?></h3>
			<ul class="social-icons">
				<li><a class="facebook social-icon" href="#" onclick="javascript: window.open('https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink();?>'); return false;" title="Facebook" target="_blank"><i class="fa fa-facebook"></i></a></li>
				<li><a class="twitter social-icon" href="#" title="Twitter" onclick="javascript: window.open('https://twitter.com/home?status=Vulputate justo&nbsp;<?php the_permalink();?>'); return false;" target="_blank"><i class="fa fa-twitter"></i></a></li>
				<li><a class="pinterest social-icon" href="#" onclick="javascript: window.open('https://pinterest.com/pin/create/button/?url=<?php the_permalink();?>'); return false;" title="Pinterest" target="_blank"><i class="fa fa-pinterest"></i></a></li>
				<li><a class="gplus social-icon" href="#" onclick="javascript: window.open('https://plus.google.com/share?url=<?php the_permalink();?>'); return false;" title="Google +" target="_blank"><i class="fa fa-google-plus"></i></a></li>
				<li><a class="linkedin social-icon" href="#" onclick="javascript: window.open('https://www.linkedin.com/shareArticle?mini=true&amp;url=<?php the_permalink();?>'); return false;" title="LinkedIn" target="_blank"><i class="fa fa-linkedin"></i></a></li>
			</ul>
		</div>	
		
		<?php 
	
}

add_action( 'woocommerce_single_product_summary', function() {
	
	$price = pmwoodwind_product_main_price( get_the_ID() );
	
	$status = wc_get_product( get_the_ID() )->get_stock_status( 'edit' );
	
	$categories = wp_get_object_terms( get_the_ID(), 'product_cat' );
	
	$categories = array_filter( $categories, function( $category ) {
		return $category->parent !== 0;
	} );
	
	$firstcat = array_values( $categories )[0];
	
	$lastcat = end( $categories );
	
	?>
		
		<div class="out-of-stock-notice">
	
			<?php if ( $price ) : 

				if ( $status == 'outofstock' ) : ?>

					Currently, our <?php the_title();?> is sold.<br/>View our latest <a href="<?php echo get_term_link( $lastcat->term_id, 'product_cat' ); ?>"><?php echo $lastcat->name;?></a> or browse all <a href="<?php echo get_term_link( $firstcat->term_id, 'product_cat' ); ?>"><?php echo $firstcat->name;?> listings.</a><br /><br />

				<?php endif;

			elseif ( ! $price || 
				   $status == 'onbackorder' ) : ?>

				Currently, our <?php the_title();?> is unavailable.<br/>View our latest <a href="<?php echo get_term_link( $lastcat->term_id, 'product_cat' ); ?>"><?php echo $lastcat->name;?></a> or browse all <a href="<?php echo get_term_link( $firstcat->term_id, 'product_cat' ); ?>"><?php echo $firstcat->name;?> listings.</a><br /><br />

			<?php endif; ?>
	
		</div>
		
		<h5 class="contactproduct">
			
			<?php if ( pmwoodwind_is_instrument( get_the_ID() ) ) : ?>
			
				Please <a href="/contact" target="_blank">contact PM Woodwind</a> if you are interested in buying or selling <?php echo ( pmwoodwind_is_new_product( get_the_ID() ) ) ? 'new' : 'used'; ?> <?php echo $lastcat->name;?>.
			
			<?php else : ?>
			
				Please <a href="/contact" target="_blank">contact PM Woodwind</a> if you are interested in buying or selling <?php echo $lastcat->name;?>.
			
			<?php endif; ?>
		
		</h5>
		
	<?php 
	
}, 30 );

add_action( 'woocommerce_before_single_product_summary', 'pmwoodwind_second_image_slider', 30 );

/**
 * In order to have a slider below control the main image, we technically need TWO sliders
 * http://flexslider.woothemes.com/thumbnail-slider.html
 * 
 * @since		{{VERSION}}
 * @return		void
 */
function pmwoodwind_second_image_slider() {
	
	$product_id = get_the_ID();
	$product = wc_get_product( $product_id );
	
	// Don't show secondary slider if it is a placeholder
	if ( ! $product->get_image_id() ) return;
	
	// Don't show secondary slider if there are no Gallery Images
	if ( ! $product->get_gallery_image_ids() ) return;
	
	add_filter( 'woocommerce_single_product_image_gallery_classes', 'pmwoodwind_remove_slider_class_from_second_slider' );
	
	woocommerce_show_product_images();
	
	remove_filter( 'woocommerce_single_product_image_gallery_classes', 'pmwoodwind_remove_slider_class_from_second_slider' );
	
}

add_filter( 'woocommerce_gallery_image_html_attachment_image_params', 'pmwoodwind_change_product_single_lightbox_size', 10, 4 );

 /**
  * Change full-image size for Product Single Lightbox
  *
  * @param   [array]    $args          Args used in wp_get_attachment_image() for additional HTML Attributes
  * @param   [integer]  $attachment_id Attachment ID
  * @param   [string]   $image_size    Image Size used for the resulting <img> (Not the image that is shown in the lightbox)
  * @param   [boolean]  $main_image    Main Image (true) or Thumbnail (false)
  *
  * @since   {{VERSION}}
  * @return  [array]                   Args used in wp_get_attachment_image() for additional HTML Attributes
  */
function pmwoodwind_change_product_single_lightbox_size( $args, $attachment_id, $image_size, $main_image = false ) {

	$full_src = wp_get_attachment_image_src( $attachment_id, 'product_lightbox' );

	$args['data-src'] = esc_url( $full_src[0] );
	$args['data-large_image'] = esc_url( $full_src[0] );
	$args['data-large_image_width'] = esc_attr( $full_src[1] );
	$args['data-large_image_height'] = esc_attr( $full_src[2] );

	return $args;

}

/**
 * Ensure the default Product Slider JS doesn't apply to ours
 * 
 * @param		array $classes Classes applied to the Slider container
 *                                                      
 * @since		{{VERSION}}
 * @return		array Classes applied to the Slider container
 */
function pmwoodwind_remove_slider_class_from_second_slider( $classes ) {
	
	$index = array_search( 'woocommerce-product-gallery', $classes );
	
	$classes[ $index ] = 'pmwoodwind-product-gallery-carousel';
	
	return array_values( $classes );
	
}

add_filter( 'woocommerce_product_get_gallery_image_ids', 'pmwoodwind_ensure_product_gallery_images_are_in_right_order', 10, 2 );

/**
 * Product Gallery Images were being attached to the Product in the incorrect order. This fixes that problem. It is reliant on the naming convention never changing, so be warned, future me
 *
 * @param   [array]  $gallery_image_ids  Array of Attachment IDs
 * @param   [object]  $product           WC_Product
 *
 * @since	{{VERSION}}
 * @return  [array]                      Array of Attachment IDs
 */
function pmwoodwind_ensure_product_gallery_images_are_in_right_order( $gallery_image_ids, $product ) {

	$sorted_ids = array();

	foreach ( $gallery_image_ids as $attachment_id ) {

		$file_name = basename( get_attached_file( $attachment_id ) );

		// File name with no extension
		$file_info = pathinfo( $file_name );
		$file_name = str_replace( $file_info['extension'], '', $file_name );

		$file_data = explode( '-', $file_name );

		// No index set, ignore
		if ( ! isset( $file_data[1] ) ) continue;

		$sorted_ids[ $file_data[1] ] = $attachment_id;

	}

	if ( empty( $sorted_ids ) ) return $gallery_image_ids;

	ksort( $sorted_ids );

	return $sorted_ids;

}

// Add the ability to hover zoom on the Primary Image
add_action( 'woocommerce_before_single_product_summary', function() {
	
	add_filter( 'wp_get_attachment_image_attributes', 'pmwoodwind_product_single_primary_image_hover_zoom', 10, 3 ); 
	
}, 19 );

// Ensure it doesn't effect any other images, as the filter is generic
add_action( 'woocommerce_before_single_product_summary', function() {
	
	remove_filter( 'wp_get_attachment_image_attributes', 'pmwoodwind_product_single_primary_image_hover_zoom', 10, 3 ); 
	
}, 21 );

/**
 * Add ability to "Hover Zoom" on the Primary Image on Product Single
 * 
 * @param		array        $attributes Attributes for the image markup
 * @param		object       $attachment Image attachment WP_Post Object
 * @param 		string|array $size       Requested size. Image size or array of width and height values (in that order). Default 'thumbnail'.
 *                                                                                                                           
 * @since		{{VERSION}}
 * @return		array        Attributes for the image markup
 */
function pmwoodwind_product_single_primary_image_hover_zoom( $attributes, $attachment, $size ) {
	
	$attributes['class'] .= ' main-image zoom';
	
	return $attributes;
	
}

// Remove the Description/Additional Information Tabs
remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10 );

if ( class_exists( 'FacetWP' ) ) {

	// Remove default pagination
	remove_action( 'woocommerce_after_shop_loop', 'woocommerce_pagination', 10 );
	
	add_action( 'woocommerce_after_shop_loop', function() {
		
		echo do_shortcode( '[facetwp pager="true"]' );
		
	} );
	
}

// Use our stored Instrument Order for a default Sort
add_action( 'woocommerce_product_query', function( $query ) {

	$query->set( 'posts_per_page', 32 );
	
	if ( isset( $_GET['orderby'] ) ) return;
	
	// Not looking at a Category/Tag
	if ( ! is_a( $query->queried_object, 'WP_Term' ) ) return;
	
	// Not a Product Category
	if ( $query->queried_object->taxonomy !== 'product_cat' ) return;
	
	$term = $query->queried_object;
	
	while ( $term->parent !== 0 ) {
		$term = get_term( $term->parent, 'product_cat' );
	}
	
	// Only sort in this way for Instruments, Mouthpieces and Accessories
	if ( $term->slug !== 'instruments' && $term->slug !== 'mouthpieces' && $term->slug !== 'accessories' ) return;
	
	//$query->set( 'meta_key', 'product_sort_order' );

	$meta_query = $query->get( 'meta_query' );

	if ( empty( $meta_query ) ) {
		$meta_query = array( 'relation' => 'AND' );
	}

	$meta_query['product_sort_order'] = array(
		'key' => 'product_sort_order',
		'type' => 'NUMERIC',
	);

	$orderby = array(
		'product_sort_order' => 'ASC',
		'title' => 'ASC',
	);

	// If Used Instruments, use different Sort Order
	if ( $term->slug == 'instruments' && 
		isset( $_GET['_show'] ) 
		&& $_GET['_show'] == 'used' ) {

		unset( $meta_query['product_sort_order'] ); // Not using this, so may as well not restrict results to where it exists (Even though it always should)

		$meta_query['parent_category_sort_order'] = array(
			'key' => 'parent_category_sort_order',
			'type' => 'NUMERIC',
		);

		$meta_query['sub_category_sort_order'] = array(
			'key' => 'sub_category_sort_order',
			'type' => 'NUMERIC',
		);

		$meta_query['parent_category_brand_sort_order'] = array(
			'key' => 'parent_category_brand_sort_order',
			'type' => 'NUMERIC',
		);

		$meta_query['sub_category_model_sort_order'] = array(
			'key' => 'sub_category_model_sort_order',
			'type' => 'NUMERIC',
		);

		$meta_query['_sku'] = array(
			'key' => '_sorting_sku',
		);

		$orderby = array(
			'parent_category_sort_order' => 'ASC',
			'sub_category_sort_order' => 'ASC',
			'parent_category_brand_sort_order' => 'ASC',
			'sub_category_model_sort_order' => 'ASC',
			'_sku' => 'ASC',
		);

	}

	$categories = ( isset( $_GET['_instrument_categories'] ) && $_GET['_instrument_categories'] ) ? $_GET['_instrument_categories'] : '';
	$categories = explode( ',', $categories );

	foreach ( $categories as &$category ) {
		$category = trim( $category ); // Ensure nothing strange happens with our slug
	}

	// If the user isn't explicitly looking for Rare and Collectable, exclude any Sold Rare and Collectable Instruments from the results
	if ( ! in_array( 'rare-and-collectible', $categories ) ) {

		$meta_query[] = array(
			'key' => 'pmwoodwind_hide_product_in_archive',
			'compare' => 'NOT EXISTS',
		);

	}

	$query->set( 'meta_query', $meta_query );
	$query->set( 'orderby', $orderby );
	
} );

add_filter( 'facetwp_facet_render_args', 'pmwoodwind_force_rare_and_collectable_checkbox', 10 );

/**
 * Force the Rare and Collectible Checkbox to always show in Instrument Categories
 *
 * @param   [array]  $args  Facet Rendering Args
 *
 * @since	{{VERSION}}
 * @return  [array]         Facet Rendering Args
 */
function pmwoodwind_force_rare_and_collectable_checkbox( $args ) {

	if ( $args['facet']['name'] !== 'instrument_categories' ) return $args;

	$found = array_filter( $args['values'], function( $checkbox ) {
		return $checkbox['facet_value'] == 'rare-and-collectible';
	} );

	if ( ! $found ) {

		$term = get_term_by( 'slug', 'rare-and-collectible', 'product_cat' );

		$args['values'][] = array(
			'facet_value' => 'rare-and-collectible',
			'facet_display_value' => $term->name,
			'term_id' => $term->term_id,
			'parent_id' => $term->parent,
			'depth' => 0,
			'counter' => '9001',
		);

	}

	return $args;

}

add_filter( 'woocommerce_is_sold_individually', 'pmwoodwind_remove_all_quantity_fields', 10, 2 );

/**
 * Force all Products to be sold individually (No Quantity Field)
 * 
 * @param		boolean $return  If is sold individually
 * @param		object  $product WC_Product Object
 *                                     
 * @since		{{VERSION}}
 * @return		boolean If is sold individually
 */
function pmwoodwind_remove_all_quantity_fields( $return, $product ) {
    return true;
}

add_filter( 'woocommerce_short_description', 'pmwoodwind_hide_short_description' );

/**
 * Determine whether to hide the Excerpt for Products or not based on a Checkbox
 * 
 * @param		string $description Post Excerpt
 *                                  
 * @since		{{VERSION}}
 * @return		string Post Excerpt
 */
function pmwoodwind_hide_short_description( $description ) {
	
	$show_excerpt = get_post_meta( get_the_ID(), '_show_excerpt', true );
	
	if ( empty( $show_excerpt ) ) {
		return '';
	}
	
	return $description;
	
}

add_action( 'woocommerce_after_shop_loop_item', function() {

	// Do not show the Compare button in the Shop Loop
	remove_class_action( 'woocommerce_after_shop_loop_item', 'WC_Products_Compare_Frontend', 'display_compare_button', 11 );
	
}, 1 );

add_action( 'woocommerce_single_product_summary', function() {
	
	// Remove included Add to Compare on Single. We will be recreating it at the desired location
	remove_class_action( 'woocommerce_single_product_summary', 'WC_Products_Compare_Frontend', 'display_compare_button', 31 );
	
}, 1 );

// This code cannot be active until after the Compare Products plugin has been activated
add_filter( 'woocommerce_products_compare_end_point', function( $endpoint ) {
	
	if ( pmwoodwind_is_instrument( get_the_ID() ) ) {
		return 'compare?list=instruments';
	}

	if ( pmwoodwind_is_mouthpiece( get_the_ID() ) ) {
		return 'compare?list=mouthpieces';
	}

	if ( pmwoodwind_is_accessory( get_the_ID() ) ) {
		return 'compare?list=accessories';
	}
	
	// Send them to the old Compare template, as it has been updated to use the Compare data from the plugin
	return 'compare';
	
} );

// Add MSRP into JS Variation Data
add_filter( 'woocommerce_available_variation', function( $variation_data, $product, $variation ) {
	
	$variation_data['msrp'] = get_post_meta( $variation->get_id(), 'msrp', true );
	
	return $variation_data;
	
}, 10, 3 );

add_filter( 'gettext', 'pmwoodwinds_change_compare_products_text', 10, 4 );

/**
 * Alter the text for the Compare Products button in the Compare Products widget
 * 
 * @param		string  $translation			The resulting Translation
 * @param		string  $untranslated_text      The original string
 * @param		string  $domain					The Text Domain
 *                                       
 * @since		{{VERSION}}
 * @return		string  The resulting Translation
 */
function pmwoodwinds_change_compare_products_text( $translation, $untranslated_text, $domain ) {
	
	if ( $domain !== 'woocommerce-products-compare' ) return $translation;
	
	if ( $untranslated_text == 'Compare Products' ) {
		
		$translation = 'Compare';
		
		if ( pmwoodwind_is_instrument( get_the_ID() ) ) {
			$translation .= ' Instruments';
		}

		if ( pmwoodwind_is_mouthpiece( get_the_ID() ) ) {
			$translation .= ' Mouthpieces';
		}

		if ( pmwoodwind_is_accessory( get_the_ID() ) ) {
			$translation .= ' Accessories';
		}
		
	}
	
	return $translation;
	
}

add_filter( 'widget_title', function( $title, $widget_instance, $widget_id ) {
	
	if ( $widget_id !== 'compared_products' ) return $title;
	
	if ( ! is_single() || 
	   get_post_type() !== 'product' ) {
		return $title;
	}
	
	$type = '';
	if ( pmwoodwind_is_instrument( get_the_ID() ) ) {
		$type = ' Instrument ';
	}
	
	if ( pmwoodwind_is_mouthpiece( get_the_ID() ) ) {
		$type = ' Mouthpiece ';
	}
	
	if ( pmwoodwind_is_accessory( get_the_ID() ) ) {
		$type = ' Accessory ';
	}
	
	$title = "Your{$type}Compare List";
	
	return $title;
	
}, 10, 3 );

add_filter( 'dynamic_sidebar_params', function( $params ) {
	
	if ( strpos( $params[0]['widget_id'], 'compared_products' ) === false ) return $params;
	
	if ( ! is_single() || 
	   get_post_type() !== 'product' ) {
		return $params;
	}
	
	$params[0]['after_widget'] = '<button id="pmwoodwind-clear-compare" class="button woocommerce-products-compare-widget-compare-button">Remove All</button>';
	
	return $params;
	
} );

/**
 * Filter down Compare Products Widget to only match the currently viewed Product's Type
 * This is super gross and hacky and should definitely be changed to use a Filter if the Plugin ever supports one.
 * 
 * This only filters on the PHP end. This can cause inconsistencies with the JavaScript. For example, if they have 2 Instruments and 1 Mouthpiece in the Compare Cookie and try to Compare while viewing a Mouthpiece, it will think they have 3 things being compared even though it is technically only 1, thereby allowing them to proceed (It normally requires 2 items)
 * 
 * @since		{{VERSION}}
 * @return		void
 */
add_action( 'wp_head', function() {
	
	if ( is_admin() ) return;
	
	if ( ! is_single() || get_post_type() !== 'product' ) return;
	
	if ( ! $_COOKIE ) return;
	
	if ( ! isset( $_COOKIE[ WC_Products_Compare_Frontend::$cookie_name ] ) || ! $_COOKIE[ WC_Products_Compare_Frontend::$cookie_name ] ) return;
	
	// Default to Instrument
	$type = 'instrument';
	
	if ( pmwoodwind_is_mouthpiece( get_the_ID() ) ) {
		$type = 'mouthpiece';
	}
	
	if ( pmwoodwind_is_accessory( get_the_ID() ) ) {
		$type = 'accessory';
	}
	
	$_COOKIE[ WC_Products_Compare_Frontend::$cookie_name ] = array_filter( explode( ',', $_COOKIE[ WC_Products_Compare_Frontend::$cookie_name ] ), function( $product_id ) use ( $type ) {
		
		return call_user_func( 'pmwoodwind_is_' . $type, $product_id );
		
	} );
	
	$_COOKIE[ WC_Products_Compare_Frontend::$cookie_name ] = implode( ',', $_COOKIE[ WC_Products_Compare_Frontend::$cookie_name ] );
	
} );

add_filter( 'woocommerce_products_compare_max_products', function( $max_products ) {
	
	return 99;
	
} );

add_action( 'woocommerce_before_shop_loop_item_title', function() {
	
	remove_filter( 'woocommerce_product_get_image', 'pmwoodwind_add_classes_to_woocommerce_product_image', 99, 5 );
	
	add_filter( 'single_product_archive_thumbnail_size', 'pmwoodwind_change_related_products_image_size' );
	
}, 9 );

add_action( 'woocommerce_before_shop_loop_item_title', function() {
	
	add_filter( 'woocommerce_product_get_image', 'pmwoodwind_add_classes_to_woocommerce_product_image', 99, 5 );
	
	remove_filter( 'single_product_archive_thumbnail_size', 'pmwoodwind_change_related_products_image_size' );
	
}, 11 );

/**
 * Prevent Related Products on Product Single from using Cropped Thumbnails
 * 
 * @param		string $image_size Image Size
 *                                  
 * @since		{{VERSION}}
 * @return		string Image Size
 */
function pmwoodwind_change_related_products_image_size( $image_size ) {
	
	return 'main_image';
	
}

add_filter( 'term_link', 'pmwoodwind_alter_product_category_link', 10, 3 );

/**
 * Make all Child Product Category links use the FacetWP Filters for the most-Parent Category
 * 
 * @param		string $link     Category Link
 * @param		object $term     WP_Term
 * @param		string $taxonomy Taxonomy Name
 *                                   
 * @since		{{VERSION}}
 * @return		string Category Link
 */
function pmwoodwind_alter_product_category_link( $link, $term, $taxonomy ) {
	
	if ( $taxonomy !== 'product_cat' ) return $link;
	
	if ( $term->parent == 0 ) return $link;
	
	// Store slug so we can use it later
	$slug = $term->slug;
	
	while ( $term->parent !== 0 ) {
		
		$term = get_term( $term->parent, 'product_cat' );
		
	}
	
	$type = false;
	
	if ( $term->slug == 'instruments' ) {
		$type = 'instrument';
	}
	else if ( $term->slug == 'mouthpieces' ) {
		$type = 'mouthpiece';
	}
	else if ( $term->slug == 'accessories' ) {
		$type = 'accessory';
	}
	else {
		$type = 'product';
	}
	
	$link = get_term_link( $term->term_id, 'product_cat' );
	
	$link = add_query_arg( '_' . $type . '_categories', $slug, $link );
	
	if ( $type == 'accessory' ) {
		
		$link = add_query_arg( '_show', 'new', $link );
		
	}
	
	return $link;
	
}

add_filter( 'the_title', function( $title, $post_id ) {

	if ( is_single() || 
	   get_post_type( $post_id ) !== 'product' ) {
		return $title;
	}

	if ( pmwoodwind_is_new_product( $post_id ) ) {

		return __( 'New - ', 'pmWoodwind' ) . $title;

	}

	return $title;

}, 10, 2 );



add_action( 'wp_ajax_wc_products_compare_add_product_ajax', 'pmwoodwind_force_compare_products_nonce', 1 );
add_action( 'wp_ajax_nopriv_wc_products_compare_add_product_ajax', 'pmwoodwind_force_compare_products_nonce', 1 );

/**
 * Force a valid nonce for Adding to Compare
 * For some reason this is caching expired/invalid nonces. It only returns HTML for a Product, so I'm going to just defeat the nonce check
 *
 * @since	{{VERSION}}
 * @return  [void]
 */
function pmwoodwind_force_compare_products_nonce() {

	if ( ! isset( $_POST['ajaxAddProductNonce'] ) || ! $_POST['ajaxAddProductNonce'] ) return;

	$_POST['ajaxAddProductNonce'] = wp_create_nonce( '_wc_products_compare_add_product_nonce' );

}

add_filter( 'yikes_simple_taxonomy_ordering_excluded_taxonomies', function( $excluded_taxonomies, $all_taxonomies ) {

	return array_diff( $excluded_taxonomies, array( 'product_cat' ) );

}, 10, 2 );