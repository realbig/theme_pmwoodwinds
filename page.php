<?php

 get_header();?>


   <!-- Header Revolution Slider -->
	
		<div id="latest-work" class="latest-work container hover-section">
		<div class="category-head">
			<h4><?php the_title();?></h4>
			<div class="bars-animation">
				<img src="<?php bloginfo( 'template_url' ); ?>/assets/img/elements/hicon.png" alt="PM">
			</div>
			<p><?php the_excerpt();?></p>
		</div><!-- Category Head -->

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
