( function( $ ) {
	
	var loaded = false,
		$media = false;
	
	// Ensure this does not fire on page load
	$( document ).on( 'facetwp-refresh', function() {

		if ( loaded ) {

			$media.each( function( index, element ) {
				Foundation.Motion.animateOut( element, 'scale-out-down' );
			} );

		}
		else {
			loaded = true;
		}

	} );
	
	$( document ).on( 'facetwp-loaded', function() {
		
		$media = $( '.post-type-archive-media .content .media' );
		
		$media.each( function( index, element ) {
			Foundation.Motion.animateIn( element, 'scale-in-up' );
		} );
		
		setTimeout( function() {
		
			$( document ).trigger( 'media-animations-done' );
			
		}, 250 ); // Wait until animation finishes, 500ms is Motion-UI default
		
	} );
	
} )( jQuery );