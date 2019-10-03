<?php
/**
 * Product extra meta.
 *
 * @since   {{VERSION}}
 * @package pmwoodwind
 */

// Don't load directly
if ( ! defined( 'ABSPATH' ) ) {
	die;
}

add_action( 'add_meta_boxes', 'pmwoodwind_product_featured_add_meta_box' );

function pmwoodwind_product_featured_add_meta_box() {

	global $post;

	if ( $post->post_type !== 'product' ) {
		return;
    }
    
    if ( ! class_exists( 'RBM_FieldHelpers' ) ) {
        return;
    }

	add_meta_box(
		'products-featured',
		__( 'Featured?', 'pmwoodwind' ),
		'pmwoodwind_product_featured_meta_box',
		$post->post_type,
        'side',
        'default'
    );
    
}

function pmwoodwind_product_featured_meta_box() {

    rbm_do_field_checkbox(
        'featured',
        false,
        false,
        array(
            'check_label' => __( 'Is this a featured Product?', 'pmwoodwind' ),
            'options' => array(),
        )
    );

    rbm_do_field_textarea(
        'featured_text',
        '<strong>' . __( 'Short description to show on the Homepage Slider', 'pmwoodwind' ) . '</strong>',
        false,
        array(
            'wysiwyg' => true,
        )
    );

    rbm_fh_init_field_group( 'default' );
	
}