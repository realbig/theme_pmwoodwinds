( function( $ ) {
	
	// If the plugin got deactivated, don't start an infinite loop
	if ( $( '.dgwt-wcas-search-input' ).length <= 0 ) return;
	
	$( document ).ready( function() {
		
		var interval;
		
		interval = setInterval( function() {
			
			// The JS plugin fires at Document Ready, but doesn't tell us when it is done... So we have to wait
			if ( $( '.dgwt-wcas-suggestions-wrapp' ).length > 0 ) {
				
				$( '.dgwt-wcas-suggestions-wrapp' ).on( 'click', '.js-dgwt-wcas-suggestion-more', function( event ) {

					event.preventDefault(); // In case this functionality is ever fixed

					window.location = '/shop/?_search=' + encodeURIComponent( $( '.dgwt-wcas-search-input' ).val() );

				} );
			
				clearInterval( interval );
				
			}
			
		}, 10 );
		
	} );
	
} )( jQuery );