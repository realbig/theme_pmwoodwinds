<?php
/**
 * Basic WooCommerce support
 * For an alternative integration method see WC docs
 * http://docs.woothemes.com/document/third-party-custom-theme-compatibility/
 */

get_header(); ?>

<div class="container">
	
	<div class="row">
		
		<?php if ( ! is_single() ) : ?>

			<div class="col-sm-12 col-md-3 columns shop-sidebar">
				<?php dynamic_sidebar( 'shop' ); ?>
			</div>

		<?php endif; ?>

		<div class="col-sm-12 content<?php echo ( ! is_single() ) ? ' col-md-9' : ''; ?>">
			<?php woocommerce_content(); ?>
		</div>
		
	</div>

</div>

<?php get_footer();