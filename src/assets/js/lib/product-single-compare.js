( function( $ ) {
	
	$( document ).on( 'click touch', '.compare-header', function() {
		
		$( '.woocommerce-products-compare-checkbox' ).click();
		
	} );
	
	$( document ).on( 'click touch', '#pmwoodwind-clear-compare', function() {
		
		var $removeLinks = $( this ).closest( '.woocommerce-products-compare-widget' ).find( '.remove-compare-product' );
		
		$removeLinks.each( function( index, link ) {
			
			// The plugin does not expose any helper methods to clear out the data, so we'll just click each of them
			$( link ).click();
			
		} );
		
	} );
	
} )( jQuery );