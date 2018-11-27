<?php
session_start();
include_once('PHPExcel.php');
include_once('excel.php');
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
add_filter ( 'nav_menu_css_class', 'so_37823371_menu_item_class', 10, 4 );

function so_37823371_menu_item_class ( $classes, $item, $args, $depth ){
  $classes[] = 'nav-item';
  return $classes;
}
function add_menuclass($ulclass) {
   return preg_replace('/<a /', '<a class="nav-link" ', $ulclass);
}
add_filter('wp_nav_menu','add_menuclass');
	register_nav_menus( array(
		'primary' => __( 'Primary Menu',      'softicious' ),
		'services'  => __( 'Footer Services', 'softicious' ),
		'about'  => __( 'Footer About', 'softicious' ),
	) );
	
function main_price($postid){
	return get_post_meta($postid,'_price',true);
	
}
function is_new($postid){
	$new = get_post_meta($postid,'_product_new',true);
	if($new === 'yes'){
		return true;
	} else {
		return false;
	}
	
}
function get_serial($postid){
	$serial = get_post_meta($postid,'_sku',true);
	if($serial){
		return $serial;
	}
}	
function get_year($postid){
	$year = get_post_meta($postid,'_product_year',true);
	if($year){
		return $year;
	}
}
function get_brand($postid){
	$brand = wp_get_post_terms($postid, 'pwb-brand');
	if($brand){
		return $brand;
	}
}
function get_inventory($postid){
	$inventory = get_post_meta($postid,'_inhouse_inventory',true);
	if($inventory){
		return $inventory;
	}
}	
function is_mouthpiece($postid){
	$types = wp_get_post_terms($postid, 'product_cat');
	$mouthpiece = false;
	foreach($types as $type){

		if($type->slug == 'mouthpieces'){
		
			$mouthpiece = true;
		}
	}	
	return $mouthpiece;
}
function is_accesory($postid){
	$types = wp_get_post_terms($postid, 'product_cat');
	$accesory = false;
	foreach($types as $type){

		if($type->slug == 'accessories'){
		
			$accesory = true;
		}
	}	
	return $accesory;
}	
function main_thumbnail_url($postid=false){

	$serial = get_post_meta($postid,'_sku',true);
	$dir = wp_upload_dir();
	$zoom = '';
	$thumbnail = get_bloginfo( 'template_url' ).'/assets/img/noimage.png';
	if(file_exists($dir['basedir'].'/products/'.$serial.'/'.$serial.'-0.jpg') && $postid && !is_mouthpiece($postid) && !is_accesory($postid)){
		$thumbnail = $dir['baseurl'].'/products/'.$serial.'/'.$serial.'-0.jpg';
		$zoom = 'zoom';
	} 
	if(file_exists($dir['basedir'].'/products/mouthpieces/'.$serial.'-1.jpg') && $postid && is_mouthpiece($postid) && !is_accesory($postid)){
		$thumbnail = $dir['baseurl'].'/products/mouthpieces/'.$serial.'-1.jpg';
		$zoom = 'zoom';
	}	
	if(file_exists($dir['basedir'].'/products/accessories/'.$serial.'-1.jpg') && $postid && !is_mouthpiece($postid) && is_accesory($postid)){
		$thumbnail = $dir['baseurl'].'/products/accessories/'.$serial.'-1.jpg';
		$zoom = 'zoom';
	}	
	if(file_exists($dir['basedir'].'/products/accessories/'.$serial.'.jpg') && $postid && !is_mouthpiece($postid) && is_accesory($postid)){
		$thumbnail = $dir['baseurl'].'/products/accessories/'.$serial.'.jpg';
		$zoom = 'zoom';
	}	
	return $thumbnail;
}	
function main_thumbnail($postid=false){
	$serial = get_post_meta($postid,'_sku',true);
	$dir = wp_upload_dir();
	$zoom = '';
	$thumbnail = get_bloginfo( 'template_url' ).'/assets/img/noimage.png';
	if(file_exists($dir['basedir'].'/products/'.$serial.'/'.$serial.'-0.jpg') && $postid){
		$thumbnail = $dir['baseurl'].'/products/'.$serial.'/'.$serial.'-0.jpg';
		$zoom = 'zoom';
	} 
	if(file_exists($dir['basedir'].'/products/mouthpieces/'.$serial.'-1.jpg')){
	
		$thumbnail = $dir['baseurl'].'/products/mouthpieces/'.$serial.'-1.jpg';
		$zoom = 'zoom';
	}	
	if(file_exists($dir['basedir'].'/products/accessories/'.$serial.'.jpg')){
	
		$thumbnail = $dir['baseurl'].'/products/accessories/'.$serial.'.jpg';
		$zoom = 'zoom';
	}	
	if(file_exists($dir['basedir'].'/products/accessories/'.$serial.'-1.jpg')){
	
		$thumbnail = $dir['baseurl'].'/products/accessories/'.$serial.'-1.jpg';
		$zoom = 'zoom';
	}	
	return '<img src="'.$thumbnail.'" class="main-image '.$zoom.'" alt="'.get_the_title($postid).'">';
}
function product_images($postid=false,$nr=false){
	$dir = wp_upload_dir();
	$images = array();
	$serial = get_post_meta($postid,'_sku',true);
	if($serial){
	foreach (glob($dir['basedir'].'/products/'.$serial.'/'.$serial.'*') as $filename) {
		$images[] = $dir['baseurl'].str_replace($dir['basedir'],'',$filename);
	}
	if(is_mouthpiece($postid)){

		foreach (glob($dir['basedir'].'/products/mouthpieces/'.$serial.'*') as $filename) {
			$images[] = $dir['baseurl'].str_replace($dir['basedir'],'',$filename);
		}
		
		if($nr){
		if(!file_exists($dir['basedir'].'/products/mouthpieces/'.$serial.'-'.$nr.'.jpg') && $postid){
			return get_bloginfo( 'template_url' ).'/assets/img/noimage.png';
		} 
		return $images[$nr];
		}	
	}	
	if(is_accesory($postid)){

		foreach (glob($dir['basedir'].'/products/accessories/'.$serial.'*') as $filename) {
			$images[] = $dir['baseurl'].str_replace($dir['basedir'],'',$filename);
		}
		
		if($nr){
		if(!file_exists($dir['basedir'].'/products/accessories/'.$serial.'-'.$nr.'.jpg') && $postid){
			return get_bloginfo( 'template_url' ).'/assets/img/noimage.png';
		} 
		return $images[$nr];
		}	
	}	
	natsort($images);
	unset($images[0]);

	if($nr){
		if(!file_exists($dir['basedir'].'/products/'.$serial.'/'.$serial.'-'.$nr.'.jpg') && $postid){
			$thumbnail = $dir['baseurl'].'/products/'.$serial.'/'.$serial.'-'.$nr.'.jpg';
			return get_bloginfo( 'template_url' ).'/assets/img/noimage.png';
		} 
		return $dir['baseurl'].'/products/'.$serial.'/'.$serial.'-'.$nr.'.jpg';
	}
	return $images;
	}
}	


add_action('init', 'do_output_buffer');
function do_output_buffer() 
{
     ob_start();
}
add_action('admin_print_footer_scripts','wpse57033_add_new_voucher_link');
function wpse57033_add_new_voucher_link(){
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
		   jQuery('#order-terms').prepend('<a href="javascript:void(0);" onclick="sortalphabetically()" class="button button-primary" >Alphabetically Sort</a>');
			var desc = false;
		   function sortalphabetically(){
			    sortUnorderedList("tto_sortable", desc);
				desc = !desc;
				
				return false;
		   }
		    function sortUnorderedList(ul, sortDescending) {
			
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
	if($_GET['display'] == 'minimal'){ ?>
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
function pmjs($hook) {

    wp_enqueue_script('pm', get_template_directory_uri(__FILE__) . '/pm.js');
}

add_action('admin_enqueue_scripts', 'pmjs');
if(isset($_GET['import'])){



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


remove_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_get_product_thumbnail', 10);
add_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_get_product_thumbnail', 10);
/**
 * WooCommerce Loop Product Thumbs
 **/


 if ( ! function_exists( 'woocommerce_get_product_thumbnail' ) ) {
	
	function woocommerce_get_product_thumbnail( $size = 'shop_catalog', $placeholder_width = 0, $placeholder_height = 0  ) {
		global $post, $woocommerce;
		return $output .= '<img src="'. main_thumbnail_url($post->ID) .'" alt="Placeholder" width="' . $placeholder_width . '" height="' . $placeholder_height . '" />';
 }
 }
 function mytheme_add_woocommerce_support() {
	add_theme_support( 'woocommerce' );
}
add_action( 'after_setup_theme', 'mytheme_add_woocommerce_support' );

if($_GET['updateprice']){
	
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
if($_GET['updateserial']){
	
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

add_action( 'restrict_manage_posts', 'wpse45436_admin_posts_filter_restrict_manage_posts' );
/**
 * First create the dropdown
 * make sure to change POST_TYPE to the name of your custom post type
 * 
 * @author Ohad Raz
 * 
 * @return void
 */

add_action( 'woocommerce_product_options_general_product_data', 'woo_add_custom_general_fields' );

// Save Fields
add_action( 'woocommerce_process_product_meta', 'woo_add_custom_general_fields_save' );

function woo_add_custom_general_fields() {

  global $woocommerce, $post;
  
  echo '<div class="options_group">';
  
	woocommerce_wp_text_input( 
		array( 
			'id'          => '_product_year', 
			'label'       => __( 'Year', 'woocommerce' ), 
			'placeholder' => 'Year',
			'desc_tip'    => 'true',
			'description' => __( 'Enter the year here.', 'woocommerce' ) 
		)
	);
  woocommerce_wp_checkbox( 
	array( 
		'id'            => '_product_new', 
		'label'         => __('Is New?', 'woocommerce' )
		)
	);
woocommerce_wp_select( 
	array( 
		'id'      => '_inhouse_inventory', 
		'label'   => __( 'Inhouse Inventory', 'woocommerce' ), 
		'description' => __( 'Not visible on shop.', 'woocommerce' ),
		'options' => array(
			'New'   => "New",
			'Used'   => "Used",
			'OutOnTrial'   => "Out On Trial",
			'SalePending' => "Sale Pending",
			'Sold' => "Sold",
			'TBD' => "TBD",
			'IS' => "In Stock",
			'OOS' => "Out Of Stock",
			'TOOT' => "Temporarily Out Of Stock",
			'Discontinued' => "Discontinued"
			)	
		)
	);	
  echo '</div>';
	
}
function woo_add_custom_general_fields_save( $post_id ){
	
	// Text Field
	$woocommerce_text_field = $_POST['_product_year'];
	if( !empty( $woocommerce_text_field ) )
		update_post_meta( $post_id, '_product_year', esc_attr( $woocommerce_text_field ) );
		
	// Select
	$woocommerce_select = $_POST['_inhouse_inventory'];
	if( !empty( $woocommerce_select ) )
		update_post_meta( $post_id, '_inhouse_inventory', esc_attr( $woocommerce_select ) );
		
	// Checkbox
	$woocommerce_checkbox = isset( $_POST['_product_new'] ) ? 'yes' : 'no';
	update_post_meta( $post_id, '_product_new', $woocommerce_checkbox );
	
	
	
}
function ra_change_translate_text_multiple( $translated ) {
	$text = array(
		'In stock' => 'Sale',
		'Out of stock' => 'Sold',
		'On backorder' => 'TBD',
		'WooCommerce' => 'Shop',
		'SKU' => 'Serial',
		'Stock status' => 'Sale Status',
		'Move to Trash' => 'Delete'
	);
	$translated = str_ireplace(  array_keys($text),  $text,  $translated );
	return $translated;
}
add_filter( 'gettext', 'ra_change_translate_text_multiple', 20 );
function levels_init() {
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
add_action( 'init', 'levels_init' );

function remove_my_post_metaboxes() {

}
add_action('admin_menu','remove_my_post_metaboxes');
add_action('admin_head', 'admin_css');

function admin_css() {
  echo '<style>
    #minor-publishing{display:none;}
    #duplicate-action{display:none;}
    #submitdiv .handlediv{display:none;}
    #submitdiv h2{display:none;}
	#major-publishing-actions {
		padding: 10px;
		clear: both;
		border-top: 0px solid #ddd;
		background: #fff;
	}	
    #product_typediv, #tagsdiv-product_tag, #postimagediv, #woocommerce-product-images, #slugdiv, #postcustom, #commentsdiv, #sharing_meta {display:none;} 
	#dashboard-widgets-wrap .postbox-container{width:100%!important}
	#adminmenu #toplevel_page_woocommerce .menu-icon-generic div.wp-menu-image::before {
    font-family: dashicons !important;
    content: "\f174"!important;
	}
	select#dropdown_product_type{display:none}
	select#product_type{display:none}	
	.newstatus.dashicons-no{
		color:#dc3232;
	}
	.newstatus.dashicons-yes{
		color:#46b450;
	}
  </style>';
}
function wisdom_filter_tracked_plugins() {
  global $typenow;
  global $wp_query;
    if ( $typenow == 'product' ) { // Your custom post type slug

      $_product_new = '';
      if( isset( $_GET['_product_new'] ) ) {
        $_product_new = $_GET['_product_new']; // Check if option has been selected
      } ?>
      <select name="_product_new" id="_product_new">
         <option value="" <?php selected( 'all', $_GET['_product_new'] ); ?>><?php _e( 'Product Type', 'wisdom-plugin' ); ?></option>
         <option value="yes" <?php selected( 'yes', $_GET['_product_new'] ); ?>>New</option>
         <option value="no" <?php selected( 'no', $_GET['_product_new'] ); ?>>Used</option>
         <option value="x" <?php selected( 'x', $_GET['_product_new'] ); ?>>Not Specified</option>
      </select>
  <?php }
}
add_action( 'restrict_manage_posts', 'wisdom_filter_tracked_plugins' );

function wisdom_sort_plugins_by_slug( $query ) {
  global $pagenow;
  // Get the post type
  $post_type = isset( $_GET['post_type'] ) ? $_GET['post_type'] : '';
  if ( is_admin() && $pagenow=='edit.php' && $post_type == 'product' && isset( $_GET['_product_new'] ) && $_GET['_product_new'] !='all' && $_GET['_product_new'] !='' ) {
	if($_GET['_product_new'] =='x'){
		$query->query_vars['meta_key'] = '_product_new';
		$query->query_vars['meta_compare'] = 'NOT EXISTS';
	 } else {
	 
		$query->query_vars['meta_key'] = '_product_new';
		$query->query_vars['meta_value'] = $_GET['_product_new'];
		$query->query_vars['meta_compare'] = '=';	 
	 }


  }  
  if ( is_admin() && $pagenow=='edit.php' && $post_type == 'product' && !isset( $_GET['_product_new'] ) && !isset( $_GET['product_cat'] )) {
    $query->query_vars['meta_key'] = '_ordermeta';
    $query->query_vars['orderby'] = 'meta_value';
    $query->query_vars['order'] = 'ASC';
  }
}
add_filter( 'parse_query', 'wisdom_sort_plugins_by_slug' );

if($_GET['cronproducts']){
	    add_action('init', 'cronproducts', 99);  

}
function cronproducts(){
	$args = array( 'posts_per_page' => -1, 'post_type' => 'product' );
	
	$myposts = get_posts( $args );
	foreach ( $myposts as $post ) : setup_postdata( $post );
		$cats = wp_get_post_terms( $post->ID, 'product_cat',array( 'orderby' => 'term_id' ) );
		$brand = get_brand($post->ID);
		$order = array();
	    foreach ( $cats as $cat ) {
		$order[$cat->parent] = $cat->name;
		}
	
		$images = product_images($post->ID);
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
function list_hierarchical_terms($pid, $taxonomy) {
$rd_terms = wp_get_post_terms( $pid, $taxonomy, array( "fields" => "ids" ) ); // getting the term IDs
$terms = array();
if( $rd_terms ) {
	$term_array = trim( implode( ',', (array) $rd_terms ), ' ,' );
	$neworderterms = get_terms($rd_taxonomy, 'orderby=none&include=' . $term_array );
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
function cw_woo_attribute(){
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

add_action('woocommerce_single_product_summary', 'cw_woo_attribute', 25);

add_action( 'woocommerce_variation_options_pricing', 'bbloomer_add_custom_field_to_variations', 10, 3 ); 
 
function bbloomer_add_custom_field_to_variations( $loop, $variation_data, $variation ) {
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
 
add_action( 'woocommerce_save_product_variation', 'bbloomer_save_custom_field_variations', 10, 2 );
  
function bbloomer_save_custom_field_variations( $variation_id, $i ) {
    $msrp = $_POST['msrp'][$i];
    if ( ! empty( $msrp ) ) {
        update_post_meta( $variation_id, 'msrp', esc_attr( $msrp ) );
    } else delete_post_meta( $variation_id, 'msrp' );
}
  
// -----------------------------------------
// 3. Store custom field value into variation data
  
add_filter( 'woocommerce_available_variation', 'bbloomer_add_custom_field_variation_data' );
 
function bbloomer_add_custom_field_variation_data( $variations ) {

    $variations['msrp'] = '<div class="woocommerce_custom_field">MSRP: ' . money_format("$ %i",get_post_meta( $variations[ 'variation_id' ], 'msrp', true )). '</span></div>';

    $variations['price_html'] = '<div class="woocommerce_custom_field">Our Price: ' . money_format("$ %i",get_post_meta( $variations[ 'variation_id' ], '_price', true )). '</span></div>';
    return $variations;
}
function product_in_term($tax, $term, $_post = NULL) {
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