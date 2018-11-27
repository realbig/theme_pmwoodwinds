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
<div id="blog" class="blog-home container hover-section category-layout">
		<div class="category-head">
			<h4>Clients</h4>
			<div class="bars-animation">
				<img src="<?php bloginfo( 'template_url' ); ?>/assets/img/elements/hicon.png" alt="PM">
			</div>
		</div><!-- Category Head -->

	<?php
		if ( have_posts() ) : ?>
			<?php
			/* Start the Loop */
			while ( have_posts() ) : the_post();

				?>
	<div class="client-item">
		<div class="text">
			<h3><?php echo $post->post_title;?></h3>
			<p><?php echo get_post_meta($post->ID, 'wpcf-testimonial', true);?></p>
		</div>

	</div>
				<?php

			endwhile;
endif; ?>
	</div>

<?php get_footer();
