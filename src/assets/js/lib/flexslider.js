( function( $ ) {

	if ( typeof wc_single_product_params == 'undefined' ) return;

	$( '.woocommerce-product-gallery' ).on( 'wc-product-gallery-before-init', function( event, slider, args ) {

		var flexSliderOptions = Object.assign( {}, args );

		flexSliderOptions.flexslider = $.extend( {
			asNavFor: '.woocommerce-product-gallery',
			itemWidth: 125,
			itemMargin: 0,
		}, flexSliderOptions.flexslider );

		flexSliderOptions.flexslider.sync = '';
		flexSliderOptions.flexslider.directionNav = true;
		flexSliderOptions.flexslider.slideshow = true;
		flexSliderOptions.flexslider.animationLoop = true;
		
		flexSliderOptions.photoswipe_enabled = false;

		// Assign the global Flexslider options to ours
		//window.wc_single_product_params.flexslider = flexSliderOptions;

		// Run WooCommerce's Flexslider JS to gain any styling it has
		$( '.pmwoodwind-product-gallery-carousel' ).wc_product_gallery( flexSliderOptions );

		// Restore the global Flexslider options so that the Primary Image Slider can use it
		//window.wc_single_product_params.flexslider = defaultflexSliderOptions;

	} );

} )( jQuery );