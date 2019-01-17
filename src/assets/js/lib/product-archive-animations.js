( function( $ ) {
	
	var loaded = false,
		$products = false;

	// Check to see if we're on the right page
	if ( $( '.woocommerce-result-count' ).length <= 0 ) return;

	var content = $( '.woocommerce-result-count' ).html().trim();

	content = content.replace( /(\d+(?:.*\d)?)/i, "<span class='facetwp-counts'>$1</span>" );

	// Update the string with FacetWP's values as appropriate
	$( '.woocommerce-result-count' ).html( content );
	
	// Ensure this does not fire on page load
	$( document ).on( 'facetwp-refresh', function() {

		if ( loaded ) {

			$products.each( function( index, element ) {
				Foundation.Motion.animateOut( element, 'scale-out-down' );
			} );

		}
		else {
			loaded = true;
		}

	} );
	
	$( document ).on( 'facetwp-loaded', function() {
		
		$products = $( '.woocommerce ul.products li.product' );
		
		$products.each( function( index, element ) {
			Foundation.Motion.animateIn( element, 'scale-in-up' );
		} );
		
		setTimeout( function() {
		
			$( document ).trigger( 'product-animations-done' );
			
		}, 500 ); // Wait until animation finishes, 500ms is Motion-UI default
		
	} );
	
	$( document ).on( 'click touch', '.new-used-filter', function( event ) {
		
		event.preventDefault();
		
		$( '.facetwp-facet-show select' ).val( $( this ).data( 'value' ) ).trigger( 'change' );
		
	} );
	
	$( document ).on( 'product-animations-done', function() {
		
		$('img.zoom')
		.wrap('<span style="display:inline-block;top: 5px;"></span>')
		.css('display', 'block')
		.parent()
		.zoom();
		
	} );
	
} )( jQuery );