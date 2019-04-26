<?php
/**
 * Template name: Video Category List
 */
 get_header();?>
 
 	<div id="blog" class="blog-home hover-section category-layout">

		<div class="category-head">
			<h4><?php the_title();?></h4>
			<div class="bars-animation">
				<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/hicon.png" alt="PM">
			</div>
			
		</div>
		
		<div class="row cd-main-content">
		
			<div class="cd-tab-filter-wrapper">
					<div class="cd-tab-filter">
						<ul class="cd-filters">
						</ul>
				</div>
			</div>
			
			<div class="content cd-gallery col-sm-12">
			
				<div class="row">
					<div class="col-sm-12">

						<?php
							// Start the loop.
							while ( have_posts() ) : the_post();

								// Include the page content template.
								the_content();


								// End of the loop.
							endwhile;
						?>

					</div>

				</div>

				<div class="container category-loop">

					<?php 

						global $post;

						$terms = get_terms( array(
							'taxonomy' => 'video-category',
							'hide_empty' => true,
							'orderby' => 'term_order',
						) );

						foreach ( $terms as $term ) : ?>

							<div class="col-sm-6 col-md-3">

								<a href="<?php esc_attr_e( get_term_link( $term, $term->taxonomy ) ); ?>">

									<?php if ( ! get_term_meta( $term->term_id, 'wpcf-typeimage', true ) ) : ?>
										<?php echo wc_placeholder_img( 'main_image' ); ?>
									<?php elseif ( function_exists( 'types_render_termmeta' ) ) : ?>
										<?php echo types_render_termmeta( 'typeimage', array( 'term_id' => $term->term_id, 'size' => 'main_image' ) ); ?>
									<?php endif; ?>

									<?php echo $term->name; ?>
								</a>

							</div>

						<?php endforeach;

					?>

				</div>

			</div>

		</div>
 
	</div>
	<?php get_footer();?>