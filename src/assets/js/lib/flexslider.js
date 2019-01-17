( function( $ ) {
	
	if ( typeof wc_single_product_params == 'undefined' ) return;
	
	$( document ).on( 'ready', function() {
		
		var defaultflexSliderOptions = Object.assign( {}, wc_single_product_params.flexslider ),
			flexSliderOptions = Object.assign( {}, defaultflexSliderOptions );

		var flexSliderOptions = $.extend( {
			asNavFor: '.woocommerce-product-gallery',
			itemWidth: 100,
			itemMargin: 5,
		}, defaultflexSliderOptions );

		flexSliderOptions.sync = '';
		flexSliderOptions.directionNav = true;

		// Assign the global Flexslider options to ours
		window.wc_single_product_params.flexslider = flexSliderOptions;
		
		console.log( window.wc_single_product_params.flexslider );

		// Run WooCommerce's Flexslider JS to gain any styling it has
		$( '.pmwoodwind-product-gallery-carousel' ).wc_product_gallery();

		// Restore the global Flexslider options so that the Primary Image Slider can use it
		window.wc_single_product_params.flexslider = defaultflexSliderOptions;
		
	} );
	
} )( jQuery );