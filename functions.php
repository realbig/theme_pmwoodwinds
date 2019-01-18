<?php

$theme_header = wp_get_theme();

define( 'THEME_VER', $theme_header->get( 'Version' ) );
define( 'THEME_URL', get_template_directory_uri() );
define( 'THEME_DIR', get_template_directory() );

session_start();
require_once('vendor/autoload.php');
require_once('excel.php');
if ( ! function_exists( 'softicious' ) ) :
	function softicious() {
		load_theme_textdomain( 'softicious' );
		add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'title-tag' );

		// This theme allows users to set a custom background.
		add_theme_support( 'custom-background', apply_filters( 'softicious_custom_background_args', array(
			'default-color' => 'f5f5f5',
		) ) );


	}
endif; // softicious
add_action( 'after_setup_theme', 'softicious' );
add_theme_support( 'post-thumbnails' );
function softicious_customizer_cleanup($wp_customize){
	$wp_customize->remove_section( 'static_front_page' );
}
add_filter ( 'nav_menu_css_class', 'pmwoodwind_menu_item_class', 10, 4 );

function pmwoodwind_menu_item_class ( $classes, $item, $args, $depth ){
  $classes[] = 'nav-item';
  return $classes;
}
function pmwoodwind_add_menuclass($ulclass) {
   return preg_replace('/<a /', '<a class="nav-link" ', $ulclass);
}
add_filter('wp_nav_menu','pmwoodwind_add_menuclass');
	register_nav_menus( array(
		'primary' => __( 'Primary Menu',      'pmWoodwind' ),
		'footer_services'  => __( 'Footer Services', 'pmWoodwind' ),
		'footer_products' => __( 'Footer Products', 'pmWoodwind' ),
		'footer_bottom'  => __( 'Footer Bottom', 'pmWoodwind' ),
	) );
	
function pmwoodwind_product_main_price($postid){
	return get_post_meta($postid,'_price',true);
	
}
function pmwoodwind_is_new_product( $product_id ) {
	
	$product = wc_get_product( $product_id );
	
	$is_new = $product->get_attribute( 'Is New?' );
	
	if ( strtolower( $is_new ) == 'new' ) {
		return true;
	}
	
	return false;
	
}
function pmwoodwind_product_get_serial($postid){
	$serial = get_post_meta($postid,'_sku',true);
	if($serial){
		return esc_html( $serial );
	}
}	
function pmwoodwind_product_get_year( $product_id ) {
	
	$product = wc_get_product( $product_id );
	
	if ( $year = $product->get_attribute( 'Product Year' ) ) {
		return esc_html( $year );
	}
	
	return false;
	
}
function pmwoodwind_product_get_brand($postid){
	$brand = wp_get_post_terms($postid, 'pwb-brand');
	if($brand){
		return $brand;
	}
}
function pmwoodwind_get_inventory( $product_id ) {
	
	$product = wc_get_product( $product_id );
	
	if ( $inventory = $product->get_attribute( 'In-House Inventory' ) ) {
		return esc_html( $inventory );
	}
	
	return false;
	
}	
function pmwoodwind_is_mouthpiece($postid){
	$types = wp_get_post_terms($postid, 'product_cat');
	$mouthpiece = false;
	foreach($types as $type){

		if($type->slug == 'mouthpieces'){
		
			$mouthpiece = true;
		}
	}	
	return $mouthpiece;
}
function pmwoodwind_is_accessory($postid){
	$types = wp_get_post_terms($postid, 'product_cat');
	$accesory = false;
	foreach($types as $type){

		if($type->slug == 'accessories'){
		
			$accesory = true;
		}
	}	
	return $accesory;
}

// Legacy. Only used by the import script as a way to determine which Images belong to which Product
function pmwoodwind_product_images($postid=false,$nr=false, $all=false){
	$dir = wp_upload_dir();
	$images = array();
	$serial = get_post_meta($postid,'_sku',true);
	if($serial){
		foreach (glob($dir['basedir'].'/products/'.$serial.'/'.$serial.'*') as $filename) {
			
			if ( preg_match( '/\d+x\d+/', $filename ) === 0 ) {
				$images[] = $dir['baseurl'].str_replace($dir['basedir'],'',$filename);
			}
			
		}
		
		// Add new instruments directory
		foreach (glob($dir['basedir'].'/products/new-instruments/'.$serial.'*') as $filename) {
			
			if ( preg_match( '/\d+x\d+/', $filename ) === 0 ) {
				$images[] = $dir['baseurl'].str_replace($dir['basedir'],'',$filename);
			}
			
		}
		
		if(pmwoodwind_is_mouthpiece($postid)){

			foreach (glob($dir['basedir'].'/products/mouthpieces/'.$serial.'*') as $filename) {
				
				if ( preg_match( '/\d+x\d+/', $filename ) === 0 ) {
					$images[] = $dir['baseurl'].str_replace($dir['basedir'],'',$filename);
				}
				
			}

			if($nr){
				if(!file_exists($dir['basedir'].'/products/mouthpieces/'.$serial.'-'.$nr.'.jpg') && $postid){
					return get_bloginfo( 'template_url' ).'/dist/assets/img/noimage.png';
				} 
				return $images[$nr];
			}	
		}	
		if(pmwoodwind_is_accessory($postid)){

			foreach (glob($dir['basedir'].'/products/accessories/'.$serial.'*') as $filename) {
				
				if ( preg_match( '/\d+x\d+/', $filename ) === 0 ) {
					$images[] = $dir['baseurl'].str_replace($dir['basedir'],'',$filename);
				}
				
			}

			if($nr){
				if(!file_exists($dir['basedir'].'/products/accessories/'.$serial.'-'.$nr.'.jpg') && $postid){
					return get_bloginfo( 'template_url' ).'/dist/assets/img/noimage.png';
				} 
				return $images[$nr];
			}	
		}	
		
		natsort($images);

		if ( ! $all ) {
			unset($images[0]);
		}

		if($nr){
			if(!file_exists($dir['basedir'].'/products/'.$serial.'/'.$serial.'-'.$nr.'.jpg') && $postid){
				$thumbnail = $dir['baseurl'].'/products/'.$serial.'/'.$serial.'-'.$nr.'.jpg';
				return get_bloginfo( 'template_url' ).'/dist/assets/img/noimage.png';
			} 
			return $dir['baseurl'].'/products/'.$serial.'/'.$serial.'-'.$nr.'.jpg';
		}
	}
	return $images;
}	

add_action('admin_print_footer_scripts','pmwoodwind_add_new_voucher_link');
function pmwoodwind_add_new_voucher_link(){
    $screen = get_current_screen();


    if($screen->id == 'toplevel_page_file_manager_advanced_ui'){
		?>
		  <script>
		   jQuery('.wrap h2').html('Product Media Manager');
		  </script>
		<style>
			.wrap table {display:none;}
			#file_manager_advanced table{display:block};
		</style>
		
		<?php
	}    
	if($screen->id == 'product_page_to-interface-product'){
		?>
		  <script>
		   jQuery('#order-terms').prepend('<a href="javascript:void(0);" onclick="pmwoodwindSortalphabetically()" class="button button-primary" >Alphabetically Sort</a>');
			var desc = false;
		   function pmwoodwindSortalphabetically(){
			    pmwoodwindSortUnorderedList("tto_sortable", desc);
				desc = !desc;
				
				return false;
		   }
		    function pmwoodwindSortUnorderedList(ul, sortDescending) {
			
			  if(typeof ul == "string")
				ul = document.getElementById(ul);

			  var lis = ul.getElementsByTagName("LI");
			  var vals = [];
			  var ids = [];

			  for(var i = 0, l = lis.length; i < l; i++){
				ids[lis[i].innerHTML] = lis[i].getAttribute("id");
				vals[i] = lis[i].innerHTML;
				
			  }
			
			  vals.sort();
			 

			  if(sortDescending){
				vals.reverse();
			
			  }	
			  
			  for(var i = 0, l = lis.length; i < l; i++){
				lis[i].innerHTML = vals[i];
				lis[i].setAttribute("id", ids[vals[i]]);
			  }	
			}
		  </script>

		
		<?php
	}	
    if($screen->id == 'product'){
		$pid = $_GET['post'];
		$serial = get_post_meta($pid,'_sku',true);
		$mid = base64_encode($serial);
        ?>
		
            <script>	
			<?php if($serial):?>
			<?php add_thickbox(); ?>
            jQuery('.wrap a.page-title-action').after('<a href="/wp-admin/admin.php?display=minimal&page=file_manager_advanced_ui#elf_l1_<?php echo $mid;?>&TB_iframe=true&width=771&height=395" class="page-title-action export thickbox" ><span class="dashicons dashicons-format-image"></span> Images</a>');		
			<?php else:?>
			 jQuery('.wrap a.page-title-action').after('<a href="javascript:alert(\'\Add the product serial first!\'\)" class="page-title-action export " ><span class="dashicons dashicons-format-image"></span> Images</a>');
			<?php endif;?>
			
            </script>
        <?php
    }
	if ( isset( $_GET['display'] ) && 
			  $_GET['display'] == 'minimal' ) { ?>
		<style>
		   @media only screen and (max-width:960px){
			.auto-fold #wpcontent{
				margin-left:0px;
				padding: 0;
				margin: -2px;
			}
			.auto-fold #adminmenuback, .auto-fold #adminmenuwrap, #wpfooter, .agca_logout_button {display:none}
			#wpbody-content {
				padding-bottom: 0;
			}
			.wrap {margin: -50px 0px 0px 0px;}
			.elfinder-workzone, #file_manager_advanced{height: 480px !important;}
		   .notice {display:none}
		   h2 {display:none}
		   hr {display:none}
		   }
		</style>
	<?php }
}

add_action( 'admin_init', function() {
	
	if ( ! is_admin() ) return;

	if ( isset( $_GET['updateprice'] ) && 
		$_GET['updateprice'] ) {

		$args = array( 'posts_per_page' => -1, 'post_type' => 'product' );

		$myposts = get_posts( $args );
		foreach ( $myposts as $post ) : setup_postdata( $post );
			$priceold =  get_post_meta($post->ID, 'wpcf-price', false)[0];
			if(get_post_meta($post->ID, '_regular_price', false)){
				update_post_meta($post->ID,'_regular_price',$priceold);
			} else {
				add_post_meta($post->ID,'_regular_price',$priceold);
			}
			if(get_post_meta($post->ID, '_price', false)){
				update_post_meta($post->ID,'_price',$priceold);
			} else {
				add_post_meta($post->ID,'_price',$priceold);
			}

		endforeach;
		exit;
	}

	if ( isset( $_GET['updateserial'] ) && 
		$_GET['updateserial'] ) {

		$args = array( 'posts_per_page' => -1, 'post_type' => 'product' );

		$myposts = get_posts( $args );
		foreach ( $myposts as $post ) : setup_postdata( $post );
			$serial =  get_post_meta($post->ID, 'wpcf-serial', false)[0];
			if(get_post_meta($post->ID, '_sku', false)){
				update_post_meta($post->ID,'_sku',$serial);
			} else {
				add_post_meta($post->ID,'_sku',$serial);
			}


		endforeach;
		exit;
	}
	
	if ( isset( $_GET['cronproducts'] ) && 
		$_GET['cronproducts'] ) {
		
		pmwoodwind_cronproducts();

	}
	
	if ( isset( $_GET['import'] ) ) {

		$dir = wp_upload_dir();
		$path = $dir['basedir'].'/products/mouthpieces.xlsx';
		$mouthpieces = excelToArray($path);


		foreach($mouthpieces as $mouthpiece){

			$new = array(
			  'post_title'    => wp_strip_all_tags( $mouthpiece['Description'] ),
			  'post_content'  => $mouthpiece['Description'],
			  'post_status'   => 'publish',
			  'post_author'   => 1,
			  'post_type'   => 'product'
			);





			$newid = wp_insert_post( $new );
			if($newid):
				$wpdb->insert('pm_term_relationships', array(
				'object_id' => $newid,
				'term_taxonomy_id' => 19
				));
				$term = term_exists($mouthpiece['CategoryID'], 'product_type', 19 );
				if($term){
					$wpdb->insert('pm_term_relationships', array(
					'object_id' => $newid,
					'term_taxonomy_id' => $term['term_id']
					));
				}	
			if ( ! add_post_meta( $newid, 'wpcf-serial', $mouthpiece['Serial'], true ) ) { 
			   update_post_meta( $newid, 'wpcf-serial', $mouthpiece['Serial'] );
			}	
			if ( ! add_post_meta( $newid, 'wpcf-brand', $mouthpiece['Brand'], true ) ) { 
			   update_post_meta( $newid, 'wpcf-brand', $mouthpiece['Brand'] );
			}	
			if ( ! add_post_meta( $newid, 'wpcf-price', $mouthpiece['Price'], true ) ) { 
			   update_post_meta( $newid, 'wpcf-price', $mouthpiece['Price'] );
			}	
			if ( ! add_post_meta( $newid, 'wpcf-inventory', $mouthpiece['Inventory'], true ) ) { 
			   update_post_meta( $newid, 'wpcf-inventory', $mouthpiece['Inventory'] );
			}
			endif;
		}
		exit;
	}
	
} );

function pmwoodwind_media_file_exists( $filename ){
    global $wpdb;
    $query = "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_value LIKE '%$filename'";
    return ( $wpdb->get_var( $query ) ) ? $wpdb->get_var( $query ) : false;
}

/**
 * First create the dropdown
 * make sure to change POST_TYPE to the name of your custom post type
 * 
 * @author Ohad Raz
 * 
 * @return void
 */

add_action( 'woocommerce_product_options_general_product_data', 'pmwoodwind_add_custom_general_fields' );

// Save Fields
add_action( 'woocommerce_process_product_meta', 'pmwoodwind_add_custom_general_fields_save' );

function pmwoodwind_add_custom_general_fields() {

	global $woocommerce, $post;
  
	woocommerce_wp_text_input( 
		array( 
			'id'          => '_msrp', 
			'label'       => 'MSRP',
			'placeholder' => 'MSRP',
			'desc_tip'    => 'true',
			'description' => "The manufacturer's suggested retail price.",
		)
	);
	
}
function pmwoodwind_add_custom_general_fields_save( $post_id ){
	
	// Text Field
	$woocommerce_text_field = $_POST['_msrp'];
	
	if ( ! empty( $woocommerce_text_field ) ) {
		update_post_meta( $post_id, '_msrp', esc_attr( $woocommerce_text_field ) );
	}
	
}
function pmwoodwind_change_translate_text_multiple( $translated ) {
	$text = array(
		'In stock' => 'Sale',
		'Out of stock' => 'Sold',
		'On backorder' => 'TBD',
		'SKU' => 'Serial',
		'Stock status' => 'Sale Status',
		'Move to Trash' => 'Delete'
	);
	$translated = str_ireplace(  array_keys($text),  $text,  $translated );
	return $translated;
}
add_filter( 'gettext', 'pmwoodwind_change_translate_text_multiple', 20 );

function pmwoodwind_levels_init() {
	// create a new taxonomy
	register_taxonomy(
		'level',
		'product',
		
		array(
			'label' => __( 'Levels' ),
			'rewrite' => array( 'slug' => 'level' ),
			'hierarchical' => true
		)
	);
}
add_action( 'init', 'pmwoodwind_levels_init' );

function pmwoodwind_filter_tracked_plugins() {
  global $typenow;
  global $wp_query;
    if ( $typenow == 'product' ) { // Your custom post type slug

      $_product_new = '';
      if( isset( $_GET['_product_new'] ) ) {
        $_product_new = $_GET['_product_new']; // Check if option has been selected
      } ?>
      <select name="_product_new" id="_product_new">
         <option value="" <?php selected( 'all', esc_attr( $_GET['_product_new'] ) ); ?>><?php _e( 'Product Type', 'wisdom-plugin' ); ?></option>
         <option value="yes" <?php selected( 'yes', esc_attr( $_GET['_product_new'] ) ); ?>>New</option>
         <option value="no" <?php selected( 'no', esc_attr( $_GET['_product_new'] ) ); ?>>Used</option>
         <option value="x" <?php selected( 'x', esc_attr( $_GET['_product_new'] ) ); ?>>Not Specified</option>
      </select>
  <?php }
}
//add_action( 'restrict_manage_posts', 'pmwoodwind_filter_tracked_plugins' );

function pmwoodwind_sort_plugins_by_slug( $query ) {
  global $pagenow;
  // Get the post type
  $post_type = isset( $_GET['post_type'] ) ? esc_attr( $_GET['post_type'] ) : '';
  if ( is_admin() && $pagenow=='edit.php' && $post_type == 'product' && isset( $_GET['_product_new'] ) && esc_attr( $_GET['_product_new'] ) !='all' && esc_attr( $_GET['_product_new'] ) !='' ) {
	if( esc_attr( $_GET['_product_new'] ) =='x'){
		$query->query_vars['meta_key'] = '_product_new';
		$query->query_vars['meta_compare'] = 'NOT EXISTS';
	 } else {
	 
		$query->query_vars['meta_key'] = '_product_new';
		$query->query_vars['meta_value'] = esc_attr( $_GET['_product_new'] );
		$query->query_vars['meta_compare'] = '=';	 
	 }


  }  
  if ( is_admin() && $pagenow=='edit.php' && $post_type == 'product' && !isset( $_GET['_product_new'] ) && !isset( $_GET['product_cat'] )) {
    $query->query_vars['meta_key'] = '_ordermeta';
    $query->query_vars['orderby'] = 'meta_value';
    $query->query_vars['order'] = 'ASC';
  }
}
add_filter( 'parse_query', 'pmwoodwind_sort_plugins_by_slug' );

function pmwoodwind_cronproducts() {
	$args = array( 'posts_per_page' => -1, 'post_type' => 'product' );
	
	$myposts = get_posts( $args );
	foreach ( $myposts as $post ) : setup_postdata( $post );
		$cats = wp_get_post_terms( $post->ID, 'product_cat',array( 'orderby' => 'term_id' ) );
		$brand = pmwoodwind_product_get_brand($post->ID);
		$order = array();
	    foreach ( $cats as $cat ) {
		$order[$cat->parent] = $cat->name;
		}
	
		$images = pmwoodwind_product_images($post->ID);
		update_post_meta( $post->ID, '_product_images', count($images) );
		ksort($order);
		$ordermeta = '';
		foreach ( $order as $ord ) {
		$ordermeta .= substr($ord, 0, 3);
		}
		$ordermeta .= substr($brand[0]->name, 0,3);
		update_post_meta( $post->ID, '_ordermeta', $ordermeta);
	endforeach;
	exit;
}

function pmwoodwind_list_hierarchical_terms($pid, $taxonomy) {
$rd_terms = wp_get_post_terms( $pid, $taxonomy, array( "fields" => "ids" ) ); // getting the term IDs
$terms = array();
if( $rd_terms ) {
	$term_array = trim( implode( ',', (array) $rd_terms ), ' ,' );
	$neworderterms = get_terms($taxonomy, 'orderby=none&include=' . $term_array );
	foreach( $neworderterms as $orderterm ) {
		$terms[$orderterm->term_id] = $orderterm->name;
	}
}
ksort($terms);

	$list = '';
	foreach($terms as $term){
	$l = strtolower(str_replace(' ','',$term));
	$list .= strtolower(str_replace('/','',$l));
	}	
	
return $list;
}

function pmwoodwind_woo_attribute(){
    global $product;
    $attributes = $product->get_attributes();
    if ( ! $attributes ) {
        return;
    }

    $display_result = '';

    foreach ( $attributes as $attribute ) {


        if ( $attribute->get_variation() ) {
            continue;
        }
        $name = $attribute->get_name();
        if ( $attribute->is_taxonomy() ) {

            $terms = wp_get_post_terms( $product->get_id(), $name, 'all' );

            $cwtax = $terms[0]->taxonomy;

            $cw_object_taxonomy = get_taxonomy($cwtax);

            if ( isset ($cw_object_taxonomy->labels->singular_name) ) {
                $tax_label = $cw_object_taxonomy->labels->singular_name;
            } elseif ( isset( $cw_object_taxonomy->label ) ) {
                $tax_label = $cw_object_taxonomy->label;
                if ( 0 === strpos( $tax_label, 'Product ' ) ) {
                    $tax_label = substr( $tax_label, 8 );
                }
            }
            $display_result .= $tax_label . ': ';
            $tax_terms = array();
            foreach ( $terms as $term ) {
                $single_term = esc_html( $term->name );
                array_push( $tax_terms, $single_term );
            }
            $display_result .= implode(', ', $tax_terms) .  '<br />';

        } else {
            $display_result .= $name . ': ';
            $display_result .= esc_html( implode( ', ', $attribute->get_options() ) ) . '<br />';
        }
    }
    echo $display_result;
}

add_action('woocommerce_single_product_summary', 'pmwoodwind_woo_attribute', 25);

add_action( 'woocommerce_variation_options_pricing', 'pmwoodwind_add_custom_field_to_variations', 10, 3 ); 
 
function pmwoodwind_add_custom_field_to_variations( $loop, $variation_data, $variation ) {
woocommerce_wp_text_input( array( 
'id' => 'msrp[' . $loop . ']', 
'class' => 'short', 
'label' => __( 'MSRP', 'woocommerce' ),
'value' => get_post_meta( $variation->ID, 'msrp', true )
) 
);      
}
  
// -----------------------------------------
// 2. Save custom field on product variation save
 
add_action( 'woocommerce_save_product_variation', 'pmwoodwind_save_custom_field_variations', 10, 2 );
  
function pmwoodwind_save_custom_field_variations( $variation_id, $i ) {
    $msrp = esc_attr( $_POST['msrp'][$i] );
    if ( ! empty( $msrp ) ) {
        update_post_meta( $variation_id, 'msrp', $msrp );
    } else delete_post_meta( $variation_id, 'msrp' );
}
  
// -----------------------------------------
// 3. Store custom field value into variation data
  
add_filter( 'woocommerce_available_variation', 'bbloomer_add_custom_field_variation_data' );
 
function bbloomer_add_custom_field_variation_data( $variations ) {
	
	unset( $variations['msrp'] );
	unset( $variations['price_html'] );
	
    return $variations;
	
}

function pmwoodwind_product_in_term($tax, $term, $_post = NULL) {
// if neither tax nor term are specified, return false
if ( !$tax || !$term ) { return FALSE; }
// if post parameter is given, get it, otherwise use $GLOBALS to get post
if ( $_post ) {
$_post = get_post( $_post );
} else {
$_post =& $GLOBALS['post'];
}
// if no post return false
if ( !$_post ) { return FALSE; }
// check whether post matches term belongin to tax
$return = is_object_in_term( $_post->ID, $tax, $term );
// if error returned, then return false
if ( is_wp_error( $return ) ) { return FALSE; }
return $return;
}

add_action( 'init', 'pmwoodwind_register_scripts' );
function pmwoodwind_register_scripts() {
	
	wp_register_script(
		'pmwoodwind-rev-slider-tools',
		THEME_URL . '/dist/assets/vendor/rs-plugin/js/jquery.themepunch.tools.min.js',
		array( 'jquery' ),
		THEME_VER,
		false
	);
	
	wp_register_script(
		'modernizr',
		THEME_URL . '/dist/assets/vendor/modernizr.js',
		array( 'jquery' ),
		THEME_VER,
		false
	);
	
	wp_register_script(
		'pmwoodwind-rev-slider',
		THEME_URL . '/dist/assets/vendor/rs-plugin/js/jquery.themepunch.revolution.min.js',
		array( 'pmwoodwind-rev-slider-tools' ),
		THEME_VER,
		false
	);
	
	wp_register_style(
		'slick-silder',
		'//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css',
		array(),
		'1.6.0',
		'all'
	);
	
	wp_register_script(
		'slick-silder',
		'//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js',
		array(),
		'1.6.0',
		'all'
	);
	
	wp_register_script(
		'pmwoodwind',
		THEME_URL . '/dist/assets/js/app.js',
		array( 'modernizr', 'slick-silder' ),
		THEME_VER,
		true
	);
	
	wp_register_script(
		'pmwoodwind-admin',
		THEME_URL . '/dist/assets/js/admin.js',
		array( 'jquery' ),
		THEME_VER,
		true
	);
	
	wp_register_style(
		'pmwoodwind',
		THEME_URL . '/dist/assets/css/app.css',
		array(),
		THEME_VER,
		'all'
	);
	
	wp_register_style(
		'pmwoodwind-print',
		THEME_URL . '/dist/assets/css/print.css',
		array(),
		THEME_VER,
		'print'
	);
	
	wp_register_style(
		'montserrat',
		'//fonts.googleapis.com/css?family=Montserrat:400,700',
		array(),
		THEME_VER,
		'all'
	);
	
	wp_register_style(
		'fontawesome',
		'//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
		array(),
		'4.7.0',
		'all'
	);
	
}

add_action( 'wp_enqueue_scripts', 'pmwoodwind_enqueue_scripts' );
function pmwoodwind_enqueue_scripts() {
	
	wp_enqueue_script( 'pmwoodwind' );
	
	wp_enqueue_style( 'pmwoodwind' );
	wp_enqueue_style( 'pmwoodwind-print' );
	
	wp_enqueue_style( 'montserrat' );
	wp_enqueue_style( 'fontawesome' );
	
}

add_action('admin_enqueue_scripts', 'pmwoodwind_admin_js');
function pmwoodwind_admin_js() {

    wp_enqueue_script( 'pmwoodwind-admin' );
	
}

add_action( 'after_setup_theme', 'pmwoodwind_image_sizes' );
function pmwoodwind_image_sizes() {
	
	add_image_size( 'main_image', 630, 475 );
	add_image_size( 'product_thumbnail', 125, 94 );
	add_image_size( 'product_grid', 525, 400 );
	add_image_size( 'home_grid', 360, 480, true );
	
}

function pmwoodwind_get_product_thumbnail_src( $size ) {
	
	global $product;
	
	$html = woocommerce_get_product_thumbnail( $size );
	
	$bool = preg_match( '/src="(.*?)"/', $html, $matches );
	
	if ( ! $bool || ! isset( $matches[1] ) ) return '';
	
	return $matches[1];
	
}

add_action( 'admin_init', function() {
	
	if ( ! taxonomy_exists( wc_attribute_taxonomy_name( 'Is New?' ) ) ) {
			
		// This creates a Taxonomy that WooCommerce recognizes
		wc_create_attribute( array(
			'name' => 'Is New?',
			'type' => 'select',
			'order_by' => 'menu_order',
			'has_archives' => false,
		) );

	}
	
	if ( ! taxonomy_exists( wc_attribute_taxonomy_name( 'In-House Inventory' ) ) ) {
			
		wc_create_attribute( array(
			'name' => 'In-House Inventory',
			'type' => 'select',
			'order_by' => 'menu_order',
			'has_archives' => false,
		) );

	}
	
	if ( ! taxonomy_exists( wc_attribute_taxonomy_name( 'Product Year' ) ) ) {
			
		wc_create_attribute( array(
			'name' => 'Product Year',
			'type' => 'select',
			'order_by' => 'menu_order',
			'has_archives' => false,
		) );

	}
	
} );

require_once __DIR__ . '/core/import-photos.php';
require_once __DIR__ . '/core/apply-instruments-shipping-class.php';
require_once __DIR__ . '/core/import-attributes.php';
require_once __DIR__ . '/core/import-sorting.php';

require_once __DIR__ . '/core/woocommerce-support.php';

/**
 * Remove auto-added Featured Image from Single Events
 * 
 * @param		string  $featured_image HTML
 * @param		integer $post_id        Post ID
 * @param		string  $size           Image Size Name
 *                                            
 * @since		1.0.0
 * @return		string  HTML
 */
add_filter( 'tribe_event_featured_image', function( $featured_image, $post_id, $size ) {
	
	if ( is_single( $post_id ) ) {
		return '';
	}
	
	return $featured_image;
	
}, 10, 3 );

add_action( 'widgets_init', 'pmwoodwind_add_sidebars' );

/**
 * Add some additional sidebars
 * 
 * @since		{{VERSION}}
 * @return		void
 */
function pmwoodwind_add_sidebars() {

	register_sidebar( array(
			'id' => 'media',
			'name' => 'Media Sidebar',
			'description' => 'Shown on Media Archive Pages.',
	) );
	
}

/**
 * Returns a numeric index to use for sorting on the initial page load
 * To be stored as Post Meta based on the attached Category (Loop through them all, find whichever matching category has the highest index, and save that one)
 * 
 * @since		{{VERSION}}
 * @return		array Sorting Key
 */
function pmwoodwind_get_instrument_sorting_key() {
	
	return apply_filters( 'pmwoodwind_get_instrument_sorting_key', array(
		'Sopranino Saxophones',
		'Soprano Saxophones',
		'Alto Saxophones',
		'C Melody saxophones',
		'Tenor Saxophones',
		'Baritone saxophones',
		'Bass Saxophones',
		'Electronic Saxophones',
		'Bb Clarinets',
		'A Clarinets',
		'Eb Clarinets',
		'Alto Clarinets',
		'Bass Clarinets',
		'Contra Alto Clarinets',
		'Contra Bass Clarinets',
		'Piccolos',
		'Flutes',
		'Alto Flutes',
		'Bass Flutes',
		'Oboes',
		'Bassoons',
		'English Horns',
	) );
	
}