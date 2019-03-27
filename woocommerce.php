<?php
/**
 * Basic WooCommerce support
 * For an alternative integration method see WC docs
 * http://docs.woothemes.com/document/third-party-custom-theme-compatibility/
 */

get_header(); ?>

<?php if ( ! is_tax( 'product_cat' ) && ! is_post_type_archive( 'product' ) ) : ?>

<div class="container">
	
<?php endif; ?>
	
	<div class="row">
		
		<?php if ( is_tax( 'product_cat' ) || is_post_type_archive( 'product' ) ) : ?>
		
			<div class="col-sm-12 product-cat-header">

				<?php do_action( 'pmwoodwind_product_cat_header' ); ?>

			</div>
		
		</div>
	
		<div class="row cd-main-content">
	
			<div class="cd-tab-filter-wrapper">
				<div class="cd-tab-filter">
					<ul class="cd-filters">
						<li class="placeholder"> 
							<a data-type="used" hr="" ef="#used">Used</a> <!-- selected option on mobile -->
						</li> 

						<?php 
						
						global $wp;
						
						if ( ! isset( $_GET['_show'] ) ) $_GET['_show'] = 'all';
	
						$show = esc_attr( $_GET['_show'] );
						
						?>

						<li class="filtertype"><a class="new-used-filter<?php echo ( $show == 'used' ) ? ' selected' : ''; ?>" href="<?php echo add_query_arg( '_show', 'used' ); ?>" data-value="used">Used</a></li>
						<li class="filtertype"><a class="new-used-filter<?php echo ( $show == 'new' ) ? ' selected' : ''; ?>" href="<?php echo add_query_arg( '_show', 'new' ); ?>" data-value="new">New</a></li>
						<li class="filtertype"><a class="new-used-filter<?php echo ( $show == 'all' ) ? ' selected' : ''; ?>" href="<?php echo trailingslashit( home_url( $wp->request ) ); ?>" data-value="">All</a></li>

					</ul> <!-- cd-filters -->
				</div> <!-- cd-tab-filter -->
			</div>
		
		<?php endif; ?>
			
		<?php if ( is_tax( 'product_cat' ) || is_post_type_archive( 'product' ) ) : ?>
			
			<div class="content cd-gallery col-sm-12 col-md-9 col-md-push-3 filter-is-visible">
				
		<?php else : ?>
				
			<div class="content col-sm-12<?php echo ( ! is_single() ) ? ' col-md-9' : ''; ?>">
				
		<?php endif; ?>
			
			<?php woocommerce_content(); ?>
			
		</div>
		
		<?php if ( ! is_single() ) : ?>

			<div class="col-sm-12 col-md-3 col-md-pull-9 shop-sidebar">
				
				<div class="<?php echo ( is_tax( 'product_cat' ) || is_post_type_archive( 'product' ) ) ? 'cd-filter filter-is-visible' : ''; ?>">
					
					<?php 
					
					$term_slug = '';
					
					if ( is_tax( 'product_cat' ) ) : 
					
						$queried_object = get_queried_object();
					
						// Find top parent
						while ( $queried_object->parent > 0 ) {
							$queried_object = get_term( $queried_object->parent, 'product_cat' );
						}
					
						$term_slug = $queried_object->slug;
					
					endif;
					
					if ( is_active_sidebar( $term_slug ) ) : 
					
						dynamic_sidebar( $term_slug );
					
					elseif ( is_active_sidebar( 'shop' ) ) : ?>
				
						<?php dynamic_sidebar( 'shop' ); ?>
					
					<?php else : ?>
					
						Please add Widgets to the "Shop" Sidebar under Appearance -> Widgets
					
					<?php endif; ?>

					<?php if ( is_tax( 'product_cat' ) || is_post_type_archive( 'product' ) ) : ?>

						<a href="#0" class="cd-close"><i class="fa fa-times" aria-hidden="true"></i></a>

					<?php endif; ?>
					
				</div>
				
				<?php if ( is_tax( 'product_cat' ) || is_post_type_archive( 'product' ) ) : ?>
				
					<a href="#0" class="cd-filter-trigger"><i class="fa fa-filter" aria-hidden="true"></i> Filters</a>
				
				<?php endif; ?>
				
			</div>

		<?php endif; ?>
		
	</div>
	
<?php if ( ! is_tax( 'product_cat' ) ) : ?>

</div>

<?php endif; ?>

<?php get_footer();