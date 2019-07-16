<?php

$theme_header = wp_get_theme();

//define( 'THEME_VER', $theme_header->get( 'Version' ) );
define( 'THEME_VER', time() );
define( 'THEME_URL', get_template_directory_uri() );
define( 'THEME_DIR', get_template_directory() );

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
	
function pmwoodwind_product_main_price($postid) {
	
	$product = wc_get_product( $postid );
	
	if ( $product->get_type() == 'variable' ) {
		return $product->get_variation_regular_price( 'min' );
	}
	
	return get_post_meta($postid,'_price',true);
	
}
function pmwoodwind_is_new_product( $product_id = null ) {

	if ( ! $product_id ) $product_id = get_the_ID();

	if ( ! $product_id ) return false;
	
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
function pmwoodwind_is_horn($postid){
	$types = wp_get_post_terms($postid, 'product_cat');
	$mouthpiece = false;
	foreach($types as $type){

		if($type->slug == 'saxophones'){
		
			$mouthpiece = true;
			break;
		}
	}	
	return $mouthpiece;
}
function pmwoodwind_is_instrument( $post_id = null ) {

	if ( ! $post_id ) {
		$post_id = get_the_ID();
	}

	$instrument_term_ids = pmwoodwind_get_instrument_sorting_key();

	$post_term_ids = wp_get_post_terms( $post_id, 'product_cat', array( 'fields' => 'ids' ) );

	if ( array_intersect( $post_term_ids, $instrument_term_ids ) ) {
		return true;
	}

	return false;
	
}

function pmwoodwind_is_mouthpiece( $post_id ) {

	if ( ! $post_id ) {
		$post_id = get_the_ID();
	}

	$mouthpiece_term_ids = pmwoodwind_get_mouthpiece_sorting_key();

	$post_term_ids = wp_get_post_terms( $post_id, 'product_cat', array( 'fields' => 'ids' ) );

	if ( array_intersect( $post_term_ids, $mouthpiece_term_ids ) ) {
		return true;
	}

	return false;

}

function pmwoodwind_is_accessory( $post_id ) {

	if ( ! $post_id ) {
		$post_id = get_the_ID();
	}

	$accessory_term_ids = pmwoodwind_get_accessory_sorting_key();

	$post_term_ids = wp_get_post_terms( $post_id, 'product_cat', array( 'fields' => 'ids' ) );

	if ( array_intersect( $post_term_ids, $accessory_term_ids ) ) {
		return true;
	}

	return false;

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

				jQuery("ul.sortable").sortable({
					'tolerance':'intersect',
					'cursor':'pointer',
					'items':'> li',
					'axi': 'y',
					'placeholder':'placeholder',
					'nested': 'ul'
				});
				
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

				if ( typeof lis[i] == 'undefined' ) continue;

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
	
	if ( isset( $_GET['excel_import'] ) ) {

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


			global $wpdb;

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
			'id'          => 'msrp', 
			'label'       => 'MSRP',
			'placeholder' => 'MSRP',
			'desc_tip'    => 'true',
			'description' => "The manufacturer's suggested retail price.",
		)
	);
	
	woocommerce_wp_checkbox( 
		array( 
			'id'          => '_show_excerpt', 
			'label'       => 'Show Short Product Description?',
			'desc_tip'    => 'true',
			'description' => "The manufacturer's suggested retail price.",
		)
	);
	
}
function pmwoodwind_add_custom_general_fields_save( $post_id ){
	
	// Text Field
	$woocommerce_text_field = $_POST['msrp'];
	
	if ( ! empty( $woocommerce_text_field ) ) {
		update_post_meta( $post_id, 'msrp', esc_attr( $woocommerce_text_field ) );
	}
	else {
		delete_post_meta( $post_id, 'msrp' );
	}
	
	// Checkbox Field
	$woocommerce_checkbox = isset( $_POST['_show_excerpt'] ) ? $_POST['_show_excerpt'] : array();
	
	if ( ! empty( $woocommerce_checkbox ) ) {
		update_post_meta( $post_id, '_show_excerpt', $woocommerce_checkbox );
	}
	else {
		delete_post_meta( $post_id, '_show_excerpt' );
	}
	
}
function pmwoodwind_change_translate_text_multiple( $translated ) {
	$text = array(
		'In stock' => 'Sale',
		'Out of stock' => 'Sold',
		'On backorder' => 'TBD',
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
		'modernizr',
		THEME_URL . '/dist/assets/vendor/modernizr.js',
		array( 'jquery' ),
		defined( 'WP_DEBUG' ) && WP_DEBUG ? time() : THEME_VER,
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
		'frescojs',
		THEME_URL . '/dist/assets/vendor/frescojs/js/fresco/fresco.js',
		array( 'jquery' ),
		'2.2.5',
		true
	);

	$script_dependencies = array( 'modernizr', 'slick-silder' );

	if ( get_post_type() == 'media' ) {
		$script_dependencies = array_merge( $script_dependencies, array( 'frescojs' ) );
	}
	
	wp_register_script(
		'pmwoodwind',
		THEME_URL . '/dist/assets/js/app.js',
		$script_dependencies,
		defined( 'WP_DEBUG' ) && WP_DEBUG ? time() : THEME_VER,
		true
	);
	
	wp_register_script(
		'pmwoodwind-admin',
		THEME_URL . '/dist/assets/js/admin.js',
		array( 'jquery' ),
		defined( 'WP_DEBUG' ) && WP_DEBUG ? time() : THEME_VER,
		true
	);

	wp_register_style(
		'frescojs',
		THEME_URL . '/dist/assets/vendor/frescojs/css/fresco/fresco.css',
		array(),
		'2.2.5',
		'screen'
	);
	
	wp_register_style(
		'pmwoodwind',
		THEME_URL . '/dist/assets/css/app.css',
		array(),
		defined( 'WP_DEBUG' ) && WP_DEBUG ? time() : THEME_VER,
		'screen'
	);
	
	wp_register_style(
		'pmwoodwind-print',
		THEME_URL . '/dist/assets/css/print.css',
		array(),
		defined( 'WP_DEBUG' ) && WP_DEBUG ? time() : THEME_VER,
		'print'
	);
	
	wp_register_style(
		'montserrat',
		'//fonts.googleapis.com/css?family=Montserrat:400,700',
		array(),
		defined( 'WP_DEBUG' ) && WP_DEBUG ? time() : THEME_VER,
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

	if ( get_post_type() == 'media' ) {
		wp_enqueue_script( 'frescojs' );
		wp_enqueue_style( 'frescojs' );
	}
	
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
require_once __DIR__ . '/core/import-brand-sorting.php';
require_once __DIR__ . '/core/reset-default-variation.php';
require_once __DIR__ . '/core/import-sku-padding.php';

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

	register_sidebar( array(
		'id' => 'video',
		'name' => 'Video Sidebar',
		'description' => 'Shown on Video Archive Pages.',
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

	$instrument_term = get_term_by( 'slug', 'instruments', 'product_cat' );
	$instrument_term_id = (int) $instrument_term->term_id;

	$terms = pmwoodwind_get_product_category_list_recursive( $instrument_term_id );
	
	return apply_filters( 'pmwoodwind_get_instrument_sorting_key', $terms );
	
}

/**
 * Returns a numeric index to use for sorting on the initial page load
 * To be stored as Post Meta based on the attached Category (Loop through them all, find whichever matching category has the highest index, and save that one)
 * 
 * @since		{{VERSION}}
 * @return		array Sorting Key
 */
function pmwoodwind_get_mouthpiece_sorting_key() {

	$mouthpiece_term = get_term_by( 'slug', 'mouthpieces', 'product_cat' );
	$mouthpiece_term_id = (int) $mouthpiece_term->term_id;

	$terms = pmwoodwind_get_product_category_list_recursive( $mouthpiece_term_id );
	
	return apply_filters( 'pmwoodwind_get_mouthpiece_sorting_key', $terms );
	
}

/**
 * Returns a numeric index to use for sorting on the initial page load
 * To be stored as Post Meta based on the attached Category (Loop through them all, find whichever matching category has the highest index, and save that one)
 * 
 * @since		{{VERSION}}
 * @return		array Sorting Key
 */
function pmwoodwind_get_accessory_sorting_key() {

	$accessory_term = get_term_by( 'slug', 'accessories', 'product_cat' );
	$accessory_term_id = (int) $accessory_term->term_id;

	$terms = pmwoodwind_get_product_category_list_recursive( $accessory_term_id );
	
	return apply_filters( 'pmwoodwind_get_accessory_sorting_key', $terms );
	
}

/**
 * Returns a numeric index to use for sorting on the initial page load
 * To be stored as Post Meta based on the attached Brand (Loop through them all, find whichever matching category has the highest index, and save that one)
 * 
 * @since		{{VERSION}}
 * @return		array Sorting Key
 */
function pmwoodwind_get_brand_sorting_key() {

	// We just want the flat list, so 0 works fine
	$terms = pmwoodwind_get_brand_list_recursive( 0 );
	
	return apply_filters( 'pmwoodwind_get_brand_sorting_key', $terms );
	
}

function pmwoodwind_get_product_category_list_recursive( $term_id, &$sorted = array() ) {

	// We need the term_order key, so we cannot only pull in the Term ID
	$terms = get_terms( 'product_cat', array( 'parent' => $term_id, 'hide_empty' => false ) );

	usort( $terms, 'pmwoodwind_sort_by_term_order' );

	foreach ( $terms as $term ) {

		$sorted[] = $term->term_id;

		pmwoodwind_get_product_category_list_recursive( $term->term_id, $sorted );

	}

	return $sorted;

}

function pmwoodwind_get_brand_list_recursive( $term_id, &$sorted = array() ) {

	// We need the term_order key, so we cannot only pull in the Term ID
	$terms = get_terms( 'pwb-brand', array( 'parent' => $term_id, 'hide_empty' => false ) );

	usort( $terms, 'pmwoodwind_sort_by_term_order' );

	foreach ( $terms as $term ) {

		$sorted[] = $term->term_id;

		pmwoodwind_get_brand_list_recursive( $term->term_id, $sorted );

	}

	return $sorted;

}

function pmwoodwind_sort_by_term_order( $a, $b ) {

	return $a->term_order > $b->term_order;

}

/**
 * Copied this more or less from their Plugin's save routine. We need to grab one of the Term IDs so we can determine the Taxonomy
 *
 * @since	{{VERSION}}
 * @return  [integer|boolean]  First returned Term ID, or False on failure
 */
function pmwoodwind_extract_term_id_from_taxonomy_reorder_ajax() {

	if ( ! isset( $_REQUEST['order'] ) || ! $_REQUEST['order'] ) return false;

	$unserialised_data = json_decode( stripslashes( $_REQUEST['order'] ), true );
	$term_id = false;

	foreach( $unserialised_data as $key => $values ) {

		$items = explode( '&', $values );
		
		foreach ( $items as $item_key => $item_ ) {
			$term_id = trim( str_replace( "item[]=", "", $item_ ) );
			break;
		}

		break;

	}

	return $term_id;

}

add_action( 'save_post', 'pmwoodwind_save_product_sorting_key' );

/**
 * On Product Save, update the hidden Product Sorting value
 * 
 * @param		integer $post_id Post ID
 *                               
 * @since		{{VERSION}}
 */
function pmwoodwind_save_product_sorting_key( $post_id ) {
	
	if ( get_post_type( $post_id ) !== 'product' ) 
		return;
	
	// Autosave, do nothing
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) 
        return;
	
	// Check user permissions
	if ( ! current_user_can( 'edit_post', $post_id ) )
        return;
	
	// Return if it's a post revision
	if ( false !== wp_is_post_revision( $post_id ) )
				return;
	
	if ( ! isset( $_POST['tax_input'] ) || ! isset( $_POST['tax_input']['product_cat'] ) )
		return;

	// Ensure we do not use the Rare and Collectable Category for sorting
	$exclude_term = term_exists( 'rare-and-collectible', 'product_cat' );

	if ( $exclude_term ) {

		$exclude_term_id = (int) $exclude_term['term_id'];

		$_POST['tax_input']['product_cat'] = array_filter( $_POST['tax_input']['product_cat'], function( $term_id ) use ( $exclude_term_id ) {
			return $term_id !== $exclude_term_id;
		} );

	}
	
	$sort_value = 0;
	
	$instrument_key = pmwoodwind_get_instrument_sorting_key();
	$mouthpiece_key = pmwoodwind_get_mouthpiece_sorting_key();
	$accessory_key = pmwoodwind_get_accessory_sorting_key();
	
	$is_instrument = false;
	$is_mouthpiece = false;
	$is_accessory = false;

	if ( array_intersect( $_POST['tax_input']['product_cat'], $instrument_key ) ) {
		$is_instrument = true;
	}

	if ( array_intersect( $_POST['tax_input']['product_cat'], $mouthpiece_key ) ) {
		$is_mouthpiece = true;
	}

	if ( array_intersect( $_POST['tax_input']['product_cat'], $accessory_key ) ) {
		$is_accessory = true;
	}
	
	foreach ( $_POST['tax_input']['product_cat'] as $term_id ) {
		
		if ( $is_instrument ) {
			
			$index = array_search( $term_id, $instrument_key );

		}
		else if ( $is_mouthpiece ) {

			// Check against mouthpieces
			$index = array_search( $term_id, $mouthpiece_key );

		}
		else if ( $is_accessory ) {

			// Check against Accessories
			$index = array_search( $term_id, $accessory_key );

		}
		
		if ( $index !== false ) {
			
			$index = $index + 1; // Cannot zero-index otherwise we may not actually save a value

			if ( $index > $sort_value ) {

				$sort_value = $index;

			}
			
		}
		
	}
	
	if ( $sort_value > 0 ) {
			
		$update = update_post_meta( $post_id, 'product_sort_order', (int) $sort_value );

	}
	
}

add_action( 'save_post', 'pmwoodwind_save_brand_sorting_key' );

/**
 * On Product Save, update the hidden Brand Sorting value
 * 
 * @param		integer $post_id Post ID
 *                               
 * @since		{{VERSION}}
 */
function pmwoodwind_save_brand_sorting_key( $post_id ) {
	
	if ( get_post_type( $post_id ) !== 'product' ) 
		return;
	
	// Autosave, do nothing
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) 
        return;
	
	// Check user permissions
	if ( ! current_user_can( 'edit_post', $post_id ) )
        return;
	
	// Return if it's a post revision
	if ( false !== wp_is_post_revision( $post_id ) )
				return;
	
	if ( ! isset( $_POST['tax_input'] ) || ! isset( $_POST['tax_input']['pwb-brand'] ) )
		return;
	
	$sort_value = 0;
	
	$brand_key = pmwoodwind_get_brand_sorting_key();
	
	foreach ( $_POST['tax_input']['product_cat'] as $term_id ) {
		
		$index = array_search( $term_id, $brand_key );
		
		if ( $index !== false ) {
			
			$index = $index + 1; // Cannot zero-index otherwise we may not actually save a value

			if ( $index > $sort_value ) {

				$sort_value = $index;

			}
			
		}
		
	}
	
	if ( $sort_value > 0 ) {
			
		$update = update_post_meta( $post_id, 'product_brand_sort_order', (int) $sort_value );

	}
	
}

add_action( 'save_post', 'pmwoodwind_save_sorting_sku' );

/**
 * Save/Update the padded Sorting SKU automatically
 *
 * @param   [type]  $post_id  [$post_id description]
 *
 * @return  [type]            [return description]
 */
function pmwoodwind_save_sorting_sku( $post_id ) {

	if ( get_post_type( $post_id ) !== 'product' ) 
		return;
	
	// Autosave, do nothing
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) 
        return;
	
	// Check user permissions
	if ( ! current_user_can( 'edit_post', $post_id ) )
        return;
	
	// Return if it's a post revision
	if ( false !== wp_is_post_revision( $post_id ) )
				return;

	if ( ! isset( $_POST['_sku'] ) || ! $_POST['_sku'] )
		return;

	$sku_length = strlen( $_POST['_sku'] );

	// If we have a new longest SKU, update the longest value
	if ( $sku_length > get_option( 'pmwoodwind_sku_length', 0 ) ) {
		update_option( 'pmwoodwind_sku_length', $sku_length );
	}

	$sorting_sku = pmwoodwind_pad_sku_for_sorting( $_POST['_sku'] );

	update_post_meta( $post_id, '_sorting_sku', $sorting_sku );

}

if ( ! is_admin() ) {

	add_filter( 'get_post_metadata', 'pmwoodwind_convert_meta_for_revslider', 100, 4 );
	
}

/**
 * Instead of rewriting the Meta for the Sliders, make it so that on the Frontend it returns values that RevSlider can understand
 * https://wordpress.stackexchange.com/a/175179
 * 
 * @param		mixed   $meta_data The value get_metadata() should return a single metadata value, or an array of values.
 * @param		integer $object_id Post ID
 * @param		string  $meta_key  Meta Key
 * @param		array   $single    Meta value, or an array of values.
 *                                                       
 * @since		{{VERSION}}
 * @return		mixed   Modified Value
 */
function pmwoodwind_convert_meta_for_revslider( $meta_data, $object_id, $meta_key, $single ) {

    if ( isset( $meta_key ) && 
		get_post_type( $object_id ) == 'slider' && 
		in_array( $meta_key, array( '_slide_product', '_slider_image', '_price', '_event_image', '_event_title', '_event_datetime', '_event_reservations', '_event_link', '_formatted_content' ) ) ) {
		
        remove_filter( 'get_post_metadata', 'pmwoodwind_convert_meta_for_revslider', 100 );
		
        $current_meta = get_post_meta( $object_id, $meta_key, true );
		
		if ( $meta_key == '_formatted_content' ) {

			$post = get_post( $object_id );

			$current_meta = apply_filters( 'the_content', $post->post_content );
		}
		if ( $meta_key == '_slide_product' && 
		   is_array( $current_meta ) && 
		   ! empty( $current_meta ) ) {
			$current_meta = get_permalink( $current_meta[0] );
		}
		elseif ( $meta_key == '_slider_image' && 
			   is_numeric( $current_meta ) ) {
			$current_meta = wp_get_attachment_url( $current_meta );
		}
		elseif ( $meta_key == '_price' ) {
			
			$product = get_post_meta( $object_id, '_slide_product', true );
			
			if ( is_array( $product ) && 
			   ! empty( $product ) ) {
				
				$product_id = $product[0];
				
				$current_meta = get_post_meta( $product_id, $meta_key, true );
				
			}
			
		}
		elseif ( $meta_key == '_event_image' ) {
			
			$event = pmwoodwind_get_featured_event();
			
			if ( ! $event ) {
				$current_meta = '';
			}
			else {
				
				if ( has_post_thumbnail( $event->ID ) ) {
					
					$current_meta = wp_get_attachment_image_url( get_post_thumbnail_id( $event->ID ), 'thumbnail' );
					
				}
				
			}
			
		}
		elseif ( $meta_key == '_event_title' ) {
			
			$event = pmwoodwind_get_featured_event();
			
			if ( ! $event ) {
				$current_meta = '';
			}
			else {
				
				$current_meta = get_the_title( $event->ID );
				
			}
			
		}
		elseif ( $meta_key == '_event_datetime' ) {
			
			$event = pmwoodwind_get_featured_event();
			
			if ( ! $event ) {
				$current_meta = '';
			}
			else {
				
				$date_format = get_option( 'date_format', 'F j, Y' );
				$time_format = get_option( 'time_format', 'g:i a' );
				$start_datetime = strtotime( get_post_meta( $event->ID, '_EventStartDate', true ) );
				
				if ( function_exists( 'tribe_get_option' ) ) {
				
					$current_meta = date( $date_format, $start_datetime ) . tribe_get_option( 'dateTimeSeparator', ' @ ' ) . date( $time_format, $start_datetime );
					
				}
				
			}
			
		}
		elseif ( $meta_key == '_event_reservations' ) {
			
			$event = pmwoodwind_get_featured_event();
			
			if ( ! $event ) {
				$current_meta = '';
			}
			else {
				
				$organizers = array();
			
				if ( function_exists( 'tribe_get_organizer_ids' ) ) {

					$organizers = tribe_get_organizer_ids( $event->ID );

				}
				
				$organizer = false;
				
				if ( is_array( $organizers ) && 
					isset( $organizers[0] ) && 
					$organizers[0] ) {
					
					$organizer = $organizers[0];
					
				}
				
				if ( function_exists( 'tribe_get_organizer_phone' ) ) {
				
					$current_meta = 'for reservations call ' . tribe_get_organizer_phone( $organizer );
					
				}
				
			}
			
		}
		elseif ( $meta_key == '_event_link' ) {
			
			$event = pmwoodwind_get_featured_event();
			
			if ( ! $event ) {
				$current_meta = '';
			}
			else {
				
				$current_meta = get_permalink( $event->ID );
				
			}
			
		}
		
		add_filter( 'get_post_metadata', 'pmwoodwind_convert_meta_for_revslider', 100, 4 );
		
        return $current_meta;
		
    }

    // Return original if the check does not pass
    return $meta_data;

}

if( ! function_exists( 'remove_class_filter' ) ){

	/**
	 * Remove Class Filter Without Access to Class Object
	 *
	 * In order to use the core WordPress remove_filter() on a filter added with the callback
	 * to a class, you either have to have access to that class object, or it has to be a call
	 * to a static method.  This method allows you to remove filters with a callback to a class
	 * you don't have access to.
	 *
	 * Works with WordPress 1.2+ (4.7+ support added 9-19-2016)
	 * Updated 2-27-2017 to use internal WordPress removal for 4.7+ (to prevent PHP warnings output)
	 *
	 * @param string $tag         Filter to remove
	 * @param string $class_name  Class name for the filter's callback
	 * @param string $method_name Method name for the filter's callback
	 * @param int    $priority    Priority of the filter (default 10)
	 *
	 * @return bool Whether the function is removed.
	 */
	function remove_class_filter( $tag, $class_name = '', $method_name = '', $priority = 10 ) {

		global $wp_filter;

		// Check that filter actually exists first
		if ( ! isset( $wp_filter[ $tag ] ) ) {
			return FALSE;
		}

		/**
		 * If filter config is an object, means we're using WordPress 4.7+ and the config is no longer
		 * a simple array, rather it is an object that implements the ArrayAccess interface.
		 *
		 * To be backwards compatible, we set $callbacks equal to the correct array as a reference (so $wp_filter is updated)
		 *
		 * @see https://make.wordpress.org/core/2016/09/08/wp_hook-next-generation-actions-and-filters/
		 */
		if ( is_object( $wp_filter[ $tag ] ) && isset( $wp_filter[ $tag ]->callbacks ) ) {
			// Create $fob object from filter tag, to use below
			$fob       = $wp_filter[ $tag ];
			$callbacks = &$wp_filter[ $tag ]->callbacks;
		} else {
			$callbacks = &$wp_filter[ $tag ];
		}

		// Exit if there aren't any callbacks for specified priority
		if ( ! isset( $callbacks[ $priority ] ) || empty( $callbacks[ $priority ] ) ) {
			return FALSE;
		}

		// Loop through each filter for the specified priority, looking for our class & method
		foreach ( (array) $callbacks[ $priority ] as $filter_id => $filter ) {

			// Filter should always be an array - array( $this, 'method' ), if not goto next
			if ( ! isset( $filter['function'] ) || ! is_array( $filter['function'] ) ) {
				continue;
			}

			// If first value in array is not an object, it can't be a class
			if ( ! is_object( $filter['function'][0] ) ) {
				continue;
			}

			// Method doesn't match the one we're looking for, goto next
			if ( $filter['function'][1] !== $method_name ) {
				continue;
			}

			// Method matched, now let's check the Class
			if ( get_class( $filter['function'][0] ) === $class_name ) {

				// WordPress 4.7+ use core remove_filter() since we found the class object
				if ( isset( $fob ) ) {
					// Handles removing filter, reseting callback priority keys mid-iteration, etc.
					$fob->remove_filter( $tag, $filter['function'], $priority );

				} else {
					// Use legacy removal process (pre 4.7)
					unset( $callbacks[ $priority ][ $filter_id ] );
					// and if it was the only filter in that priority, unset that priority
					if ( empty( $callbacks[ $priority ] ) ) {
						unset( $callbacks[ $priority ] );
					}
					// and if the only filter for that tag, set the tag to an empty array
					if ( empty( $callbacks ) ) {
						$callbacks = array();
					}
					// Remove this filter from merged_filters, which specifies if filters have been sorted
					unset( $GLOBALS['merged_filters'][ $tag ] );
				}

				return TRUE;
			}
		}

		return FALSE;
	}
}

/**
 * Make sure the function does not exist before defining it
 */
if( ! function_exists( 'remove_class_action') ){

	/**
	 * Remove Class Action Without Access to Class Object
	 *
	 * In order to use the core WordPress remove_action() on an action added with the callback
	 * to a class, you either have to have access to that class object, or it has to be a call
	 * to a static method.  This method allows you to remove actions with a callback to a class
	 * you don't have access to.
	 *
	 * Works with WordPress 1.2+ (4.7+ support added 9-19-2016)
	 *
	 * @param string $tag         Action to remove
	 * @param string $class_name  Class name for the action's callback
	 * @param string $method_name Method name for the action's callback
	 * @param int    $priority    Priority of the action (default 10)
	 *
	 * @return bool               Whether the function is removed.
	 */
	function remove_class_action( $tag, $class_name = '', $method_name = '', $priority = 10 ) {
		remove_class_filter( $tag, $class_name, $method_name, $priority );
	}
}

/**
 * Find matching product variation
 *
 * @param WC_Product $product
 * @param array $attributes
 * @return int Matching variation ID or 0.
 */
function pmwoodwind_find_matching_product_variation( $product, $attributes ) {

    foreach ( $attributes as $key => $value ) {
		
	    if ( strpos( $key, 'attribute_' ) === 0 ) {
		    continue;
	    }

	    unset( $attributes[ $key ] );
	    $attributes[ sprintf( 'attribute_%s', $key ) ] = $value;
		
    }

    if ( class_exists( 'WC_Data_Store' ) ) {

        $data_store = WC_Data_Store::load( 'product' );
        return $data_store->find_matching_product_variation( $product, $attributes );

    }
	else {

        return $product->get_matching_variation( $attributes );

    }

}

/**
 * Get variation default attributes
 *
 * @param WC_Product $product
 * @return array
 */
function pmwoodwind_get_default_attributes( $product ) {
 
    if ( method_exists( $product, 'get_default_attributes' ) ) {
 
        return $product->get_default_attributes();
 
    }
	else {
 
        return $product->get_variation_default_attributes();
 
    }
 
}

/**
 * Gets the Featured Event for use on the Home Slider
 * 
 * @since		{{VERSION}}
 * @return		object|boolean		WP_Post on success, false on failure
 */
function pmwoodwind_get_featured_event() {
	
	$events = get_posts( array(
		'numberposts'	=> 1,
		'post_type'		=> 'tribe_events',
		'orderby'		=> 'date',
		'order'			=> 'DESC',
		'meta_value'       => '1',
		'post_status'      => 'publish',
		'tax_query' => array(
			'relationship' => 'AND',
			array(
				'taxonomy' => 'tribe_events_cat',
				'field' => 'slug',
				'terms' => 'featured',
			),
		),
	) );
	
	if ( is_array( $events ) && 
		isset( $events[0] ) && 
		$events[0] ) {
		return $events[0];
	}
	
	return false;
	
}

add_action( 'init', 'pmwoodwind_register_video_post_type' );

function pmwoodwind_register_video_post_type() {

	$labels = array(
		'name'               => __( 'Videos', 'pmWoodwind' ),
		'singular_name'      => __( 'Video', 'pmWoodwind' ),
		'menu_name'          => __( 'Videos', 'pmWoodwind' ),
		'name_admin_bar'     => __( 'Video', 'pmWoodwind' ),
		'add_new'            => __( 'Add New', 'pmWoodwind' ),
		'add_new_item'       => __( 'Add New Video', 'pmWoodwind' ),
		'new_item'           => __( 'New Video', 'pmWoodwind' ),
		'edit_item'          => __( 'Edit Video', 'pmWoodwind' ),
		'view_item'          => __( 'View Video', 'pmWoodwind' ),
		'all_items'          => __( 'All Videos', 'pmWoodwind' ),
		'search_items'       => __( 'Search Videos', 'pmWoodwind' ),
		'parent_item_colon'  => __( 'Parent Videos:', 'pmWoodwind' ),
		'not_found'          => __( 'No videos found.', 'pmWoodwind' ),
		'not_found_in_trash' => __( 'No videos found in Trash.', 'pmWoodwind' ),
	);

	$args = array(
		'menu_icon'          => 'dashicons-video-alt2',
		'labels'             => $labels,
		'description'        => __( 'Description.', 'pmWoodwind' ),
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'video' ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => null,
		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt' )
	);

	register_post_type( 'video', $args );

	$labels = array(
		'name'              => __( 'Video Categories', 'pmWoodwind' ),
		'singular_name'     => __( 'Video Category', 'pmWoodwind' ),
		'search_items'      => __( 'Search Video Categories', 'pmWoodwind' ),
		'all_items'         => __( 'All Video Categories', 'pmWoodwind' ),
		'parent_item'       => __( 'Parent Video Category', 'pmWoodwind' ),
		'parent_item_colon' => __( 'Parent Video Category:', 'pmWoodwind' ),
		'edit_item'         => __( 'Edit Video Category', 'pmWoodwind' ),
		'update_item'       => __( 'Update Video Category', 'pmWoodwind' ),
		'add_new_item'      => __( 'Add New Video Category', 'pmWoodwind' ),
		'new_item_name'     => __( 'New Video Category Name', 'pmWoodwind' ),
		'menu_name'         => __( 'Video Category', 'pmWoodwind' ),
	);

	$args = array(
		'hierarchical'      => true,
		'labels'            => $labels,
		'show_ui'           => true,
		'show_admin_column' => true,
		'query_var'         => true,
		'rewrite'           => array( 'slug' => 'video-category' ),
	);

	register_taxonomy( 'video-category', array( 'video' ), $args );

}

add_action( 'init', 'pmwoodwind_register_media_post_type' );

function pmwoodwind_register_media_post_type() {

	$labels = array(
		'name'               => __( 'Media', 'pmWoodwind' ),
		'singular_name'      => __( 'Media', 'pmWoodwind' ),
		'menu_name'          => __( 'Media', 'pmWoodwind' ),
		'name_admin_bar'     => __( 'Media', 'pmWoodwind' ),
		'add_new'            => __( 'Add New', 'pmWoodwind' ),
		'add_new_item'       => __( 'Add New Media', 'pmWoodwind' ),
		'new_item'           => __( 'New Media', 'pmWoodwind' ),
		'edit_item'          => __( 'Edit Media', 'pmWoodwind' ),
		'view_item'          => __( 'View Media', 'pmWoodwind' ),
		'all_items'          => __( 'All Media', 'pmWoodwind' ),
		'search_items'       => __( 'Search Media', 'pmWoodwind' ),
		'parent_item_colon'  => __( 'Parent Media:', 'pmWoodwind' ),
		'not_found'          => __( 'No media found.', 'pmWoodwind' ),
		'not_found_in_trash' => __( 'No media found in Trash.', 'pmWoodwind' ),
	);

	$args = array(
		'menu_icon'          => 'dashicons-video-alt2',
		'labels'             => $labels,
		'description'        => __( 'Description.', 'pmWoodwind' ),
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'media' ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => null,
		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt' )
	);

	register_post_type( 'media', $args );

	$labels = array(
		'name'              => __( 'Media Types', 'pmWoodwind' ),
		'singular_name'     => __( 'Media Type', 'pmWoodwind' ),
		'search_items'      => __( 'Search Media Types', 'pmWoodwind' ),
		'all_items'         => __( 'All Media Types', 'pmWoodwind' ),
		'parent_item'       => __( 'Parent Media Type', 'pmWoodwind' ),
		'parent_item_colon' => __( 'Parent Media Type:', 'pmWoodwind' ),
		'edit_item'         => __( 'Edit Media Type', 'pmWoodwind' ),
		'update_item'       => __( 'Update Media Type', 'pmWoodwind' ),
		'add_new_item'      => __( 'Add New Media Type', 'pmWoodwind' ),
		'new_item_name'     => __( 'New Media Type Name', 'pmWoodwind' ),
		'menu_name'         => __( 'Media Types', 'pmWoodwind' ),
	);

	$args = array(
		'hierarchical'      => true,
		'labels'            => $labels,
		'show_ui'           => true,
		'show_admin_column' => true,
		'query_var'         => true,
		'rewrite'           => array( 'slug' => 'mediatype' ),
	);

	register_taxonomy( 'mediatype', array( 'media' ), $args );

}

add_filter( 'posts_orderby', function( $orderby, \WP_Query $q ) {
    
	if ( 'last_name' === $q->get( 'orderby' ) && $get_order =  $q->get( 'order' ) ) {
			
			if( in_array( strtoupper( $get_order ), ['ASC', 'DESC'] ) ) {
					
					global $wpdb;
					$orderby = " RIGHT(post_title, LOCATE(' ', REVERSE(post_title)) - 1) " . $get_order;
					
			}
			
	}
	
	return $orderby;
	
}, PHP_INT_MAX, 2 );

add_action( 'tribe_before_get_template_part', function( $template, $file, $template_2, $slug, $name ) {

	if ( strpos( $slug, 'title-bar' ) === false ) return;

	echo '<div class="category-head">';

}, 10, 5 );

add_action( 'tribe_after_get_template_part', function( $template, $file, $slug, $name ) {

	if ( strpos( $slug, 'title-bar' ) === false ) return;

	echo '</div>';

}, 10, 4 );

add_action( 'tribe_events_after_the_title', function() {

	ob_start();

	?>

		<div class="bars-animation">
			<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/hicon.png" alt="PM">
		</div>
	
	<?php 

	echo ob_get_clean();

} );

add_filter( 'gettext', 'pmwoodwinds_change_upcoming_past_events_text', 10, 4 );
/**
 * Alter the label for Upcomming Events
 * 
 * @param		string  $translation			The resulting Translation
 * @param		string  $untranslated_text      The original string
 * @param		string  $domain					The Text Domain
 *                                       
 * @since		{{VERSION}}
 * @return		string  The resulting Translation
 */
function pmwoodwinds_change_upcoming_past_events_text( $translation, $untranslated_text, $domain ) {
	
	if ( $domain !== 'the-events-calendar' ) return $translation;

	if ( $untranslated_text == 'Upcoming %s' || $untranslated_text == 'Past %s' ) {
		return '%s';
	}

	return $translation;

}

add_filter( 'gettext', 'pmwoodwinds_change_next_previous_events_links_text', 10, 4 );
/**
 * Alter the label for Upcomming Events
 * 
 * @param		string  $translation			The resulting Translation
 * @param		string  $untranslated_text      The original string
 * @param		string  $domain					The Text Domain
 *                                       
 * @since		{{VERSION}}
 * @return		string  The resulting Translation
 */
function pmwoodwinds_change_next_previous_events_links_text( $translation, $untranslated_text, $domain ) {
	
	if ( $domain !== 'the-events-calendar' ) return $translation;

	if ( $untranslated_text == 'Next %s') {
		return 'Next';
	}

	if ( $untranslated_text == 'Previous %s') {
		return 'Previous';
	}

	return $translation;

}

add_action( 'tribe_before_get_template_part', function( $template, $file, $template_2, $slug, $name ) {

	if ( strpos( $slug, 'list/content' ) === false ) return;

	?>

	<div class="cd-tab-filter-wrapper">
		<div class="cd-tab-filter">
			<ul class="cd-filters tribe-events-sub-nav">
				<li><a class="previous-filter tribe-events-past<?php echo ( isset( $_GET['tribe_event_display'] ) && $_GET['tribe_event_display'] == 'past' ) ? ' selected' : ''; ?>" rel="prev" href="/events/list/?tribe_event_display=past&tribe_paged=1">Past Events</a></li>
				<li><a class="upcoming-filter tribe-events-nav-next<?php echo ( ! isset( $_GET['tribe_event_display'] ) || $_GET['tribe_event_display'] !== 'past' ) ? ' selected' : ''; ?>" rel="next" href="/events/list/?tribe_event_display=list&tribe_paged=1">Upcoming Events</a></li>
			</ul>
		</div>
	</div>

	<?php 

}, 10, 5 );

/**
 * Figure out what the longest length for a SKU stored in the database is
 * This is normally only called in the batch import process
 *
 * @return  [integer]  Length of longest SKU
 */
function pmwoodwind_get_max_sku_length() {

	global $wpdb;

	$max_sku_length = $wpdb->get_var( "
		SELECT MAX(LENGTH(meta_value))
		FROM {$wpdb->postmeta}
		WHERE meta_key = '_sku'
	" );

	return $max_sku_length;

}

/**
 * Pad a SKU for sorting. Ensures they are all the length of the longest SKU currently known in the database
 *
 * @param   [string]  $sku  Product SKU
 *
 * @return  [string]        Product SKU with 0s padded at the front to meet the proper length
 */
function pmwoodwind_pad_sku_for_sorting( $sku ) {

	$sorting_sku = str_pad( $sku, get_option( 'pmwoodwind_sku_length', 0 ), '0', STR_PAD_LEFT );

	return $sorting_sku;

}

/*

add_filter( 'woocommerce_csv_product_export_args', function( $args ) {

	$taxonomy = wc_attribute_taxonomy_name( 'Is New?' );

	$term = term_exists( 'used', $taxonomy );
	$term_id = (int) $term['term_id'];

	$tax_query = ( isset( $args['tax_query'] ) && $args['tax_query'] ) ? $args['tax_query'] : array();

	$tax_query[] = array(
		'taxonomy' => $taxonomy,
		'field' => 'term_id',
		'terms' => array( $term_id ),
		'operator' => 'IN',
	);
	
	$args['tax_query'] = $tax_query;

	return $args;

} );

*/