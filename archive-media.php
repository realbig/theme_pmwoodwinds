<?php
/**
 * The template for displaying archive pages
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

get_header(); 
?>
<div id="blog" class="blog-home hover-section category-layout">
		<div class="category-head">
			<h4>Media</h4>
			<div class="bars-animation">
				<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/hicon.png" alt="PM">
			</div>
		</div><!-- Category Head -->
	
	<div class="row cd-main-content">
		
		<div class="cd-tab-filter-wrapper">
				<div class="cd-tab-filter">
					<ul class="cd-filters">
					</ul>
			</div>
		</div>
		
		<div class="col-sm-12 col-md-3 col-md-pull-9 sidebar">
				
			<div class="cd-filter filter-is-visible">

				<?php if ( is_active_sidebar( 'media' ) ) : ?>

					<?php dynamic_sidebar( 'media' ); ?>

				<?php else : ?>

					Please add Widgets to the "Media" Sidebar under Appearance -> Widgets

				<?php endif; ?>

				<a href="#0" class="cd-close"><i class="fa fa-times" aria-hidden="true"></i></a>

			</div>

			<a href="#0" class="cd-filter-trigger"><i class="fa fa-filter" aria-hidden="true"></i> Filters</a>

		</div>
		
		<div class="content cd-gallery col-sm-12 col-md-9 col-md-push-3 filter-is-visible">

			<?php
				if ( have_posts() ) : ?>
					<?php
					/* Start the Loop */
					while ( have_posts() ) : the_post();

						?>
						<div <?php post_class( array( 'col-sm-12', 'col-md-4' ) ); ?>>

							<div class="background">

								<?php 
								
								$content = get_the_content();

								$did_match = preg_match( '/\[gallery.*?ids="(.*?)"/', $content, $matches );

								$attachment_ids = array();
								if ( $did_match && 
									isset( $matches[1] ) && 
									$matches[1] ) {

									$attachment_ids = explode( ',', preg_replace( '/\s/', '', $matches[1] ) );

								}

								$img_data = array();

								foreach ( $attachment_ids as $attachment_id ) {

									$attachment_id = preg_replace( '/\D/', '', $attachment_id );

									$image = wp_get_attachment_image_src( $attachment_id, 'full', false );
									$caption = wp_get_attachment_caption( $attachment_id );

									$img_data[] = array(
										'src' => $image[0],
										'w' => $image[1],
										'h' => $image[2],
										'caption' => $caption,
									);

								}

								?>

								<a href="<?php echo get_permalink();?>" <?php echo ! empty( $attachment_ids ) ? 'class="media-photoswipe"  data-gallery="' . esc_attr( json_encode( $img_data ) ) . '"' : ''; ?>">

									<div class="image">
										<?php the_post_thumbnail();?>
									</div>
									<div class="text">
										<h5><?php the_title();?></h5>
									</div>

								</a>

							</div>

						</div>
			
						<?php

					endwhile;

				endif; ?>
			
		</div>

	</div>
	
<?php get_footer();
