<?php
/**
 * Basic WooCommerce support
 * For an alternative integration method see WC docs
 * http://docs.woothemes.com/document/third-party-custom-theme-compatibility/
 */

get_header(); ?>

<div class="container">
	
	<div class="row">
		
		<?php if ( is_tax( 'product_cat' ) ) : ?>
		
			<div class="col-sm-12 product-cat-header">
				
				<?php do_action( 'pmwoodwind_product_cat_header' ); ?>
		
			</div>
		
		<?php endif; ?>
		
		<?php if ( ! is_single() ) : ?>

			<div class="col-sm-12 col-md-3 shop-sidebar">
				
				<div class="<?php echo ( is_tax( 'product_cat' ) ) ? ' cd-filter filter-is-visible' : ''; ?>">
				
					<?php dynamic_sidebar( 'shop' ); ?>

					<?php if ( is_tax( 'product_cat' ) ) : ?>

						<a href="#0" class="cd-close"><i class="fa fa-times" aria-hidden="true"></i></a>

					<?php endif; ?>
					
				</div>
				
				<?php if ( is_tax( 'product_cat' ) ) : ?>
				
					<a href="#0" class="cd-filter-trigger"><i class="fa fa-filter" aria-hidden="true"></i> Filters</a>
				
				<?php endif; ?>
				
			</div>

		<?php endif; ?>

		<div class="col-sm-12 content<?php echo ( ! is_single() ) ? ' col-md-9' : ''; ?><?php echo ( is_tax( 'product_cat' ) ) ? ' cd-gallery filter-is-visible' : ''; ?>">
			
			<?php woocommerce_content(); ?>
			
		</div>
		
	</div>

</div>

<?php get_footer();