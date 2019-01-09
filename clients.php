<?php
/**
 * Template name:Clients
 */
 get_header();?>
 	<div id="blog" class="blog-home container hover-section">
		<div class="category-head">
			<h4><?php the_title();?></h4>
			<div class="bars-animation">
				<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/hicon.png" alt="PM">
			</div>
			
		</div>
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
     <div id="trd-testimonial" class="trd-testimonial">
	 <?php
	 $posts = get_posts(array(
		'numberposts'	=> -1,
		'post_type'		=> 'clients',
		'meta_key'		=> 'wpcf-testimonial',
		'orderby'		=> 'title',
		'order'			=> 'DESC'
	));
	foreach($posts as $post):
		$show = get_post_meta($post->ID, 'wpcf-show-in-clients', true);
		$link = get_post_meta($post->ID, 'wpcf-link', true);
		if($show):
	?>
	<div class="trd-testimonial-slides">
		
		<div class="trd-testimonial-text">
			<p><?php echo get_post_meta($post->ID, 'wpcf-testimonial', true);?></p>
		</div>
		<div class="trd-satisfied-user-info">
			
			<?php if ( $image_url = get_post_meta($post->ID, 'wpcf-image', true) ) : ?>
				<div class="trd-user-img-wrapper">
					<img src="<?php echo $image_url;?>" alt="<?php echo $post->post_title;?>">
				</div>
			<?php endif; ?>
			
			<h3>
			
				<?php 

				$website_url = get_post_meta($post->ID, 'wpcf-link', true);

				if ( $website_url ) : ?>
			
					<a href="<?php echo get_post_meta($post->ID, 'wpcf-link', true);?>" target="_blank">
						
				<?php endif; ?>
						
						<?php echo $post->post_title;?>
				
				<?php if ( $website_url ) : ?>
				
					</a>
			
				<?php endif; ?>
			
			</h3>
			
		</div>

	</div>
     <?php 
	 endif;
	 endforeach;?>      
 
	</div>
	</div>
	<?php get_footer();?>