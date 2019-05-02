<?php
/**
 * Template name:Testimonials
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
	 $posts = new WP_Query(array(
		'posts_per_page'	=> -1,
		'post_type'		=> 'clients',
		'meta_key'		=> 'wpcf-testimonial',
		'orderby' => 'menu_order',
		'order' => 'ASC',
	));
		 
	global $post;

	$index = 0;
	$max_per_row = 1; // 0 indexed
		 
	if ( $posts->have_posts() ) : 
		 
		 while ( $posts->have_posts() ) : $posts->the_post();

		 if ( $index == 0 ) : ?>

			<div class="row">

		<?php endif;
		 
			$show = get_post_meta( get_the_ID(), 'wpcf-is-testimonial', true);
			if($show):
				?>
				<div class="testimonial-item col-sm-12 col-md-6">
						<div class="info">
						<div class="trd-user-img-wrapper">
							
							<?php if ( ! get_post_meta( $post->ID, 'wpcf-image', true ) ) : ?>
								<?php echo wc_placeholder_img( 'thumbnail' ); ?>
							<?php elseif ( function_exists( 'types_render_field' ) ) : ?>
								<?php echo types_render_field( 'image', array( 'post_id' => $post->ID, 'size' => 'thumbnail' ) ); ?>
							<?php endif; ?>

						</div>           

					</div>
					<div class="text">
						<h3><?php the_title()?></h3>
						<p><?php echo esc_html( get_post_meta($post->ID, 'wpcf-testimonial', true) );?></p>
					</div>

				</div>
				 <?php 
			 endif;
			 
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
		 
	endif;
		 ?>      
 
	</div>
	</div>
	<?php get_footer();?>