( function( $ ) {
	
	$( document ).on( 'found_variation', 'form', function( event, variation ) {
		
		$( 'p.price span.msrp' ).wc_set_content( variation.msrp );
		
		$( 'p.price span.regular-price' ).wc_set_content( variation.display_regular_price.toFixed( 2 ) );
		
	} );
	
} )( jQuery );