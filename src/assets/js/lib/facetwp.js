( function( $ ) {
	
	$( document ).on( 'facetwp-loaded', function() {
		
		$( 'html, body' ).animate( {
			scrollTop: 0,
		}, 500 );
		
	} );
	
} )( jQuery );