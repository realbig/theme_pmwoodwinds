<?php
/**
 * Template name:Testimonials
 */
 get_header();?>
 	<div id="blog" class="blog-home container hover-section">
		<div class="category-head">
			<h4><?php the_title();?></h4>
			<div class="bars-animation">
				<img src="<?php bloginfo( 'template_url' ); ?>/assets/img/elements/hicon.png" alt="PM">
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
     <div id="testimonials" class="testimonial">
	 <?php
	 $posts = get_posts(array(
		'numberposts'	=> -1,
		'post_type'		=> 'clients',
		'meta_key'		=> 'wpcf-testimonial'
	));
	foreach($posts as $post):
		$show = get_post_meta($post->ID, 'wpcf-is-testimonial', true);
		if($show):
	?>
	<div class="testimonial-item">
			<div class="info">
			<div class="trd-user-img-wrapper">
				<img src="<?php echo get_post_meta($post->ID, 'wpcf-image', true);?>" alt="<?php echo $post->post_title;?>">
			</div>           
			
		</div>
		<div class="text">
			<h3><?php echo $post->post_title;?></h3>
			<p><?php echo get_post_meta($post->ID, 'wpcf-testimonial', true);?></p>
		</div>

	</div>
     <?php 
	 endif;
	 endforeach;?>      
 
	</div>
	</div>
	<?php get_footer();?>