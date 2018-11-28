<?php

class pmwoodwinds_image_import_process extends WP_Background_Process {

	/**
	 * @var string
	 */
	protected $action = 'pmwoodwinds_image_import';

	/**
	 * Task
	 *
	 * Override this method to perform any actions required on each
	 * queue item. Return the modified item for further processing
	 * in the next pass through. Or, return false to remove the
	 * item from the queue.
	 *
	 * @param mixed $item Queue item to iterate over
	 *
	 * @return mixed
	 */
	protected function task( $product_id ) {
		
		require_once( ABSPATH . 'wp-admin/includes/image.php' );
		
		$images = pmwoodwind_product_images( $product_id, false, true );
			
		// No images found
		if ( empty( $images ) ) return false;

		$featured_image = $images[0];

		$attachment_id = pmwoodwind_media_file_exists( $featured_image );

		if ( ! $attachment_id ) {

			$filetype = wp_check_filetype( basename( $featured_image ), null );

			$attachment = array(
				'post_mime_type' => $filetype['type'],
				'post_title' => sanitize_file_name( basename( $featured_image ) ),
				'post_content' => '',
				'post_status' => 'inherit'
			);

			$attachment_id = wp_insert_attachment( $attachment, $featured_image );

			$attachment_data = wp_generate_attachment_metadata( $attachment_id, $featured_image );
			wp_update_attachment_metadata( $attachment_id, $attachment_data );

		}

		if ( $attachment_id ) {

			update_post_meta( $product_id, '_thumbnail_id', $attachment_id );
			update_post_meta( $product_id, '_pmwoodwinds_thumbnail_import', true );
			
			error_log( "$product_id had its Featured Image set as $attachment_id" );

		}

		// Only a featured image
		if ( count( $images ) === 1 ) return false;

		$gallery_images = array_slice( $images, 1 );
		$gallery_image_ids = array();

		foreach ( $gallery_images as $image ) {

			$attachment_id = pmwoodwind_media_file_exists( $image );

			if ( ! $attachment_id ) {

				$filetype = wp_check_filetype( basename( $image ), null );

				$attachment = array(
					'post_mime_type' => $filetype['type'],
					'post_title' => sanitize_file_name( basename( $image ) ),
					'post_content' => '',
					'post_status' => 'inherit'
				);

				$attachment_id = wp_insert_attachment( $attachment, $image );

				$attachment_data = wp_generate_attachment_metadata( $attachment_id, $image );
				wp_update_attachment_metadata( $attachment_id, $attachment_data );

			}

			if ( $attachment_id ) {

				$gallery_image_ids[] = $attachment_id;

			}

		}

		if ( ! empty( $gallery_image_ids ) ) {

			update_post_meta( $product_id, '_product_image_gallery', implode( ',', $gallery_image_ids ) );
			update_post_meta( $product_id, '_pmwoodwinds_gallery_import', true );
			
			error_log( "$product_id had its Image Gallery set as " . implode( ',', $gallery_image_ids ) );

		}

		return false;
		
	}

	/**
	 * Complete
	 *
	 * Override if applicable, but ensure that the below actions are
	 * performed, or, call parent::complete().
	 */
	protected function complete() {
		parent::complete();

		// Show notice to user or perform some other arbitrary task...
		
		error_log( "Photo Import Complete" );
		update_option( 'photo_import_complete', true );
		
	}

}