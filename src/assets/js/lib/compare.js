( function( $ ) {
	
	if ( ! $( 'body' ).hasClass( 'page-template-compare') ) return;
	
	$( document ).on( 'change', 'input.woocommerce-products-compare-checkbox', function( event ) {
		
		if ( ! $( this ).prop( 'checked' ) ) {
			
			$( this ).closest( 'tr' ).remove();
			
		}
		
	} );
	
} )( jQuery );