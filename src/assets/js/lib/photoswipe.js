( function( $ ) {
	
	if ( typeof wc_single_product_params == 'undefined' ) return;
	
	// Force Photoswipe to zoom further
	// https://stackoverflow.com/a/40459340
	wc_single_product_params.photoswipe_options.getDoubleTapZoom = function( isMouseClick, item ) {
		if ( isMouseClick ) {
            return 2;
        }
		else {
            return item.initialZoomLevel < 0.7 ? 2 : 1.33;
        }
    };
	
} )( jQuery );