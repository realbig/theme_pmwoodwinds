<?php
/**
 * The template for displaying archive pages
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

get_header(); 
?>
<div id="blog" class="blog-home container hover-section category-layout">
		<div class="category-head">
			<h4><?php echo single_cat_title();?></h4>
			<div class="bars-animation">
				<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/hicon.png" alt="PM">
			</div>
		</div><!-- Category Head -->
	<h3>Upcoming Events</h3>
	<?php
		query_posts( 'cat=551' );
		if ( have_posts() ) : ?>
			<?php
			/* Start the Loop */
			while ( have_posts() ) : the_post();
				$meta = get_post_meta(get_the_id(),false);
				$date = get_post_meta(get_the_id(),'wpcf-date',true);
				$hour = get_post_meta(get_the_id(),'wpcf-hour',true);
				$autor = get_post_meta(get_the_id(),'wpcf-event-author',false);
			
				?>
		<div class="row article">
			<div class="col-sm-4">
			<div class="event">
			<a href="<?php echo get_permalink();?>">
			<?php the_post_thumbnail();?>
				<h4><?php the_title();?></h4>
				<h5><?php echo strftime("%a, %b %e %G",$date);?></h5>
				<h5><?php echo $hour;?></h5>
				</a>
			</div>
			</div>
		</div>
				<?php

			endwhile;
else:?>
	<p>No Upcoming Events found.</p>
<?php endif; ?>
	<h3>Past Events</h3>
		<?php
		query_posts( 'cat=552' );
		if ( have_posts() ) : ?>
			<?php
			/* Start the Loop */
			while ( have_posts() ) : the_post();
				$meta = get_post_meta(get_the_id(),false);
				$date = get_post_meta(get_the_id(),'wpcf-date',true);
				$hour = get_post_meta(get_the_id(),'wpcf-hour',true);
				$autor = get_post_meta(get_the_id(),'wpcf-event-author',false);
			
				?>
		<div class="row article">
			<div class="col-sm-4">
			<div class="event">
			<a href="<?php echo get_permalink();?>">
			<?php the_post_thumbnail();?>
				<h4><?php the_title();?></h4>
				<h5><?php echo strftime("%a, %b %e %G",$date);?></h5>
				<h5><?php echo $hour;?></h5>
				</a>
			</div>
			</div>
		</div>
				<?php

			endwhile;
else:?>
	<p>No Past events found.</p>
<?php endif; ?>
	</div>

<?php get_footer();
