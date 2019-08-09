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
			<h4>Videos</h4>
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

				<?php if ( is_active_sidebar( 'video' ) ) : ?>

					<?php dynamic_sidebar( 'video' ); ?>

				<?php else : ?>

					Please add Widgets to the "Video" Sidebar under Appearance -> Widgets

				<?php endif; ?>

				<a href="#0" class="cd-close"><i class="fa fa-times" aria-hidden="true"></i></a>

			</div>

			<a href="#0" class="cd-filter-trigger"><i class="fa fa-filter" aria-hidden="true"></i> Filters</a>

		</div>
		
		<div class="content cd-gallery col-sm-12 col-md-9 col-md-push-3 filter-is-visible">

            <div id="video-categories">

				<?php 

					$terms = get_terms( array(
						'taxonomy' => 'video-category',
						'hide_empty' => true,
						'meta_key' => 'tax_position',
						'orderby' => 'tax_position'
					) );

					$index = 0;
					$max_per_row = 3; // 0 indexed

					foreach ( $terms as $term ) : 
					
						if ( $index == 0 ) : ?>

							<div class="row">
		
						<?php endif; ?>

						<div class="col-sm-6 col-md-3 video-category" style="<?php echo ( isset( $_GET['_video_categories'] ) && $_GET['_video_categories'] ) ? 'display: none;' : 'display: block;' ?>">

							<a href="<?php esc_attr_e( get_term_link( $term, $term->taxonomy ) ); ?>" data-slug="<?php echo $term->slug; ?>">

								<?php if ( ! get_term_meta( $term->term_id, 'wpcf-typeimage', true ) ) : ?>
									<?php echo wc_placeholder_img( 'main_image' ); ?>
								<?php elseif ( function_exists( 'types_render_termmeta' ) ) : ?>
									<?php echo types_render_termmeta( 'typeimage', array( 'term_id' => $term->term_id, 'size' => 'main_image' ) ); ?>
								<?php endif; ?>

								<?php echo $term->name; ?>
							</a>

						</div>

						<?php if ( $index == $max_per_row ) : ?>

							</div>

							<?php

							$index = 0;

						else : 

							$index++;

						endif; ?>

					<?php endforeach;

					// Ensure that the row closes out
					if ( $index < $max_per_row && 
						$index > 0 ) : ?>

						</div>

					<?php endif;

				?>
                
            </div>

            <div id="video-archive">

				<?php if ( have_posts() ) : 
					
					$index = 0;
					$max_per_row = 3; // 0 indexed

					?>
                    <?php
                    /* Start the Loop */
					while ( have_posts() ) : the_post();
					
					if ( $index == 0 ) : ?>

						<div class="row">
		
					<?php endif; ?>
					
                        <div <?php post_class( array( 'col-sm-12', 'col-md-3' ) ); ?> style="display: none;">

                            <div class="background">

                                <div class="image">
                                    <?php the_post_thumbnail();?>
                                </div>
                                <div class="text">

									<?php echo wp_oembed_get( get_post_meta( get_the_ID(), 'wpcf-video-url', true ) ); ?>
									
									<h5><?php the_title();?></h5>

                                    <a href="<?php echo get_permalink();?>" class="button"><i class="flaticon-plus79"></i> Read more</a>
                                </div>

                            </div>

                        </div>
            
                        <?php

						if ( $index == $max_per_row ) : ?>

							</div>

							<?php

							$index = 0;

						else : 

							$index++;

						endif; 

					endwhile;

					// Ensure that the row closes out
					if ( $index < $max_per_row && 
						$index > 0 ) : ?>

						</div>

					<?php endif;
					
					echo do_shortcode( '[facetwp pager="true"]' ); 

                endif; ?>

            </div>
			
		</div>

	</div>

</div>
	
<?php get_footer();
