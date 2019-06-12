<?php

 global $wp_query;
 
 get_header(); ?>
	
		<div id="latest-work" class="latest-work container hover-section">

		<?php if ( ! isset( $wp_query->query['post_type'] ) || $wp_query->query['post_type'] !== 'tribe_events' ) : ?>
			<div class="category-head">
				<h4><?php the_title(); ?></h4>
				<div class="bars-animation">
					<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/hicon.png" alt="PM">
				</div>
			</div><!-- Category Head -->
		<?php endif; ?>

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
	</div>
	



	
	

<?php get_footer();?>
