<?php

 get_header();?>
	
		<div id="latest-work" class="latest-work container hover-section" style="margin-bottom:100px;">
		<div class="category-head">
			<h4><?php the_title();?></h4>
			<div class="bars-animation">
				<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/hicon.png" alt="PM">
			</div>
		</div><!-- Category Head -->



		<div class="row">
			<div class="col-sm-6">
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
