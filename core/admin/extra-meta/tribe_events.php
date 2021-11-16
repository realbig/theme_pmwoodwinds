<?php
/**
 * Event extra meta.
 *
 * @since   {{VERSION}}
 * @package pmwoodwind
 */

// Don't load directly
if ( ! defined( 'ABSPATH' ) ) {
	die;
}

add_filter( 'post_type_labels_tribe_events', 'pmwoodwind_post_type_labels_tribe_events' );

/**
 * Adjust Post Type labels for Events
 *
 * @param   object  $labels  Post Type Labels
 *
 * @since   {{VERSION}}
 * @return  object           Post Type Labels
 */
function pmwoodwind_post_type_labels_tribe_events( $labels ) {
    
    $labels->featured_image = __( 'Featured Image. Recommended 100px * 100px.', 'pmWoodwinds' );

    return $labels;

}