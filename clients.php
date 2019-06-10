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
     <div id="clients">
	 <?php
	 $posts = new WP_Query( array(
		'posts_per_page'	=> -1,
		'post_type'		=> 'clients',
		'meta_key'		=> 'wpcf-testimonial',
		'orderby'		=> 'last_name',
		'order'			=> 'ASC',
		'meta_query' => array(
			array(
				'key' => 'wpcf-show-in-clients',
				'compare' => 'EXISTS',
			),
		),
	) );

	global $post;

	$index = 0;
	$max_per_row = 1; // 0 indexed

	if ( $posts->have_posts() ) : 

		while ( $posts->have_posts() ) : $posts->the_post();

			if ( $index == 0 ) : ?>

				<div class="row">

			<?php endif; ?>

			<div class="col-sm-12 col-md-6">

				<div class="trd-testimonial-text">

					<?php if ( $website_url = get_post_meta(get_the_ID(), 'wpcf-link', true) ) : ?>
					
						<a href="<?php echo get_post_meta(get_the_ID(), 'wpcf-link', true);?>" target="_blank">
							
					<?php endif; ?>
				
					<h3>
						
						<?php echo $post->post_title;?>
					
					</h3>

					<?php if ( $website_url ) : ?>
						
						</a>
				
					<?php endif; ?>

				</div>

			</div>

			<?php 

			if ( $index == $max_per_row ) : ?>

				</div>

			<?php

				$index = 0;

			else : 

				$index++;

			endif; 

		endwhile; 

		wp_reset_postdata();

		// Ensure that the row closes out
		if ( $index < $max_per_row && 
			$index > 0 ) : ?>

			</div>

		<?php endif;

	endif; ?>
 
	</div>
	</div>
	<?php get_footer();?>