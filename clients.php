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
     <div id="testimonials" class="testimonial">
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
	<div class="client-item">
		<div class="text">
			<?php if(!$link):?>
			<h3><?php echo $post->post_title;?></h3>
			<?php else:?>
			<h3><a href="<?php echo $link;?>" target="_blank"><?php echo $post->post_title;?></a></h3>
			<?php endif;?>
		</div>

	</div>
     <?php 
	 endif;
	 endforeach;?>      
 
	</div>
	</div>
	<?php get_footer();?>