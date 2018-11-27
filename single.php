<?php

 get_header();?>


   <!-- Header Revolution Slider -->
	
		<div id="latest-work" class="latest-work container hover-section" style="margin-bottom:100px;">
		<div class="category-head">
			<h4><?php the_title();?></h4>
			<div class="bars-animation">
				<img src="<?php bloginfo( 'template_url' ); ?>/assets/img/elements/hicon.png" alt="PM">
			</div>
			<p><?php the_excerpt();?></p>
		</div><!-- Category Head -->



		<div class="row">
			<div class="col-sm-6">
			<p><i class="fa fa-calendar" aria-hidden="true"></i> <?php echo strftime("%A, %d %B", get_post_meta(get_the_id(), 'wpcf-date', true));?></p>
			<p><i class="fa fa-user" aria-hidden="true"></i> <?php echo get_post_meta(get_the_id(), 'wpcf-event-author', true);?></p>
			<p><i class="fa fa-phone" aria-hidden="true"></i> <?php echo get_post_meta(get_the_id(), 'wpcf-phone', true);?></p>
			<?php
			/* Start the Loop */
			while ( have_posts() ) : the_post();

			the_content();
			endwhile;
?>				
		</div>
			<div class="col-sm-6 full">
				<?php the_post_thumbnail(get_the_id());?>
			</div>
		

		</div>
	</div>
	



	
	


	</div>
	



	
	

<?php get_footer();?>
