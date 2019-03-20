( function( $ ) {
	
	$( document ).on( 'found_variation', 'form', function( event, variation ) {
		
		$( 'p.price span.msrp' ).wc_set_content( Number( variation.msrp ).toFixed( 2 ) );
		
		$( 'p.price span.regular-price' ).wc_set_content( Number( variation.display_regular_price ).toFixed( 2 ) );
		
	} );
	
} )( jQuery );