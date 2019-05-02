<?php

 get_header();?>

<div class="category-head">
			<h4><?php the_title();?></h4>
			
			<div class="bars-animation">
				<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/hicon.png" alt="PM">
			</div>
		</div><!-- Category Head -->
	<main class="cd-main-content">
		<div class="cd-tab-filter-wrapper">
			<div class="cd-tab-filter">
				<ul class="cd-filters">


					
					<li class="filtertype"><a <?php if($navid=='529'):?>class="selected"<?php endif;?>href="/mediatype/photos/">Photos</a></li>
					<li class="filtertype"><a <?php if($navid=='553'):?>class="selected"<?php endif;?>href="/mediatype/video/">Videos</a></li>
				
				</ul> <!-- cd-filters -->
			</div> <!-- cd-tab-filter -->
		</div> <!-- cd-tab-filter-wrapper -->

		<section class="cd-gallery">
				<div class="row">
			<div class="col-sm-12">

			<?php
			while ( have_posts() ) : the_post();

			the_content();
			endwhile;
			?>				
		</div>
	
		

		</div>
		</section> <!-- cd-gallery -->

		

	</main> <!-- cd-main-content -->
	



	
	

<?php get_footer();?>
