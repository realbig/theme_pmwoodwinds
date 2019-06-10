( function( $ ) {
	
	if ( typeof wc_single_product_params == 'undefined' ) return;
	
	// Force Photoswipe to zoom further
	// https://stackoverflow.com/a/40459340
	wc_single_product_params.photoswipe_options.getDoubleTapZoom = function( isMouseClick, item ) {

		if ( $( 'body.single-product' ).length <= 0 ) {
			return item.initialZoomLevel;
		}
		else {

			if ( isMouseClick ) {
				return 2;
			}
			else {
				return item.initialZoomLevel < 0.7 ? 2 : 1.33;
			}

		}
	};
	
	$( document ).on( 'click touch', '.woocommerce-product-gallery__image a', function( event ) {

		event.preventDefault();

		$( '#wpadminbar' ).hide();

		$( 'body' ).addClass( 'photoswipe-open' );

		var checkForClose;

		checkForClose = setInterval( function() {

			if ( ! $( '.pswp' ).hasClass( 'pswp--open' ) ) {

				$( 'body' ).removeClass( 'photoswipe-open' );
				$( '#wpadminbar' ).show();

				clearInterval( checkForClose );

			}

		}, 100 );

	} );
	
} )( jQuery );