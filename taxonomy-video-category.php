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
			<h4><?php echo single_cat_title();?></h4>
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
		
		<div class="content cd-gallery col-sm-12">

			<div class="container">

				<?php
					if ( have_posts() ) : ?>
						<?php
						/* Start the Loop */
						while ( have_posts() ) : the_post();

							?>
							<div <?php post_class( array( 'col-sm-12', 'col-md-4' ) ); ?>>

								<div class="background">

									<div class="image">
										<?php the_post_thumbnail();?>
									</div>
									<div class="text">
										<h5><?php the_title();?></h5>

										<?php the_content();?>

										<a href="<?php echo get_permalink();?>" class="button"><i class="flaticon-plus79"></i> Read more</a>
									</div>

								</div>

							</div>
				
							<?php

						endwhile;
					endif; ?>
				
			</div>

		</div>

	</div>
	
<?php get_footer();
