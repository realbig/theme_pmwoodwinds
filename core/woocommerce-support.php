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

add_action( 'woocommerce_after_single_product_summary', function() {
	
	$categories = wp_get_object_terms( get_the_ID(), 'product_cat' );
	
	$categories = array_filter( $categories, function( $category ) {
		return $category->parent == 0;
	} );
	
	$firsttype = $categories[0];
	
	?>

<div class="row">
			<div class="col-sm-12 cd-gallery ">
			<div class="similar">
			<h4><span>Your <?php echo $firsttype->name;?> Compare List</span></h4>
			
			<?php
	
			global $compare;
			
			if ( ! $compare ) $compare = array();  
			
			echo '<ul class="comparelist">';
	
			if ( isset( $_SESSION['comparelist'] ) ) :
	
				$comparelist = $_SESSION['comparelist'];
				$compare = $comparelist[$firsttype->slug];

				foreach ( $compare as $comp) :

					$price = pmwoodwind_product_main_price($comp);
					$status = $price;
					if(is_numeric($price)){
						$status = 'sale';
					}
						$isnew = 'used';
					if(pmwoodwind_is_new_product(get_the_id())){
						$isnew = 'new';
					}
					$types = wp_get_post_terms($comp, 'product_cat');
					$filters = '';
					foreach($types as $type){
						$filters .= ' filter'.$type->term_id;
					}
						?>
						<li class="mix <?php echo $isnew;?> <?php echo $status;?> <?php echo $filters;?>">
							<a href="<?php echo get_permalink($comp);?>" title="<?php echo get_the_title($comp);?>"><?php echo woocommerce_get_product_thumbnail( $comp, 'main_image' );?></a>
								<h5>
								<a href="<?php  echo  get_permalink($comp);?>"><?php  echo  get_the_title($comp);?></a>
								<span class="price <?php echo $price;?>"><?php
								if(is_numeric($price)){
									echo money_format("$ %i",$price);
								} else {
									echo $price;
								}
								?></span>
									</h5>
						</li>
						<?php
				endforeach;	
				?><li class="mix all">
						<a href="/compare/?list=<?php echo $firsttype->slug;?>">
						<?php echo woocommerce_get_product_thumbnail( 'main_image' ); ?>
						<span class="over">
						<i class="fa fa-navicon" aria-hidden="true"></i>
				 </a>
							</span>
							<h5>
							<a href="/compare/?list=<?php echo $firsttype->slug;?>">
							compare</a>
								</h5>
					</li><?php

			else:
			?><li class="mix all">

					<?php echo woocommerce_get_product_thumbnail( 'main_image' ); ?>
					<span class="over">
					<i class="fa fa-navicon" aria-hidden="true"></i>

						</span>
						<h5>

						your list is empty
							</h5>
				</li><?php
			endif;
					echo '</ul>';		
			?>
				</div>
			</div>
			
	</div>

	<script>
jQuery(function(){
  jQuery('.comparelist').mixItUp();
});
</script>

<?php
	
} );

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
	
	$brand = pmwoodwind_product_get_brand( get_the_id() );
	
	if ( $brand && 
	   ! is_wp_error( $brand ) ) : ?>

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
			'name' => 'WooCommerce Sidebar',
			'description' => 'Shown on Product Archive Pages.',
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
	
	// It is showing other things we don't want there, so let's nuke them all for now.
	return array();

	return array_filter( $attributes, function( $attribute ) {
		return $attribute->get_visible() === true;
	} );
	
}

add_action( 'woocommerce_after_single_product_summary', function() {
	
	remove_filter( 'woocommerce_product_get_attributes', 'pmwoodwind_remove_attributes_listing' );
	
}, 1 );

//add_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30 );

add_action( 'woocommerce_single_product_summary', 'pmwoodwind_add_to_compare_button', 40 );

function pmwoodwind_add_to_compare_button() {
	
	global $compare;
	
	if ( ! $compare ) $compare = array();
	
	if ( isset( $_GET['remove'] ) ) {
		unset( $_SESSION['comparelist'][ esc_attr( $_GET['remove'] ) ][ esc_attr( $_GET['item'] ) ] );
		unset( $compare[ esc_attr( $_GET['remove'] ) ][ esc_attr( $_GET['item'] ) ] );
	}
	
	if ( isset( $_GET['tocompare'] ) ) {
		$_SESSION['comparelist'][ esc_attr( $_GET['tocompare'] ) ][ get_the_id() ] = get_the_id();
	}
	
	$categories = wp_get_object_terms( get_the_ID(), 'product_cat' );
	
	$categories = array_filter( $categories, function( $category ) {
		return $category->parent == 0;
	} );
	
	$firsttype = $categories[0];
	
	?>
		
		<div class="shares">
			
			<h3 class="share"><i class="fa fa-navicon" aria-hidden="true"></i> Compare <?php the_title();?></h3>
			<ul class="compare" style="width: auto;margin: 20px 0px;">
				
				<?php if ( isset($_SESSION['comparelist'][ $firsttype->slug ][ get_the_id()] ) ) : ?>
					<li style="width: auto;">
						<a class="facebook social-icon" href="<?php echo get_permalink();?>?remove=<?php echo $firsttype->slug;?>&item=<?php echo get_the_id();?>" title="compare">
							<i class="fa fa-minus"></i> remove from compare
						</a>
				</li>
				<?php else : ?>
					<li style="width: auto;">
						<a class="facebook social-icon" href="<?php the_permalink();?>?tocompare=<?php echo $firsttype->slug;?>" title="compare">
							<i class="fa fa-plus"></i> add to compare
						</a>
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