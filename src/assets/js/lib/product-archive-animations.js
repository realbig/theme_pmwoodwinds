( function( $ ) {
	
	var $products = $( '.woocommerce ul.products li.product' );
	
	var disableFilters = function() {
		
		$( '#product-search' ).attr( 'disabled', true );
		
		$( '.cd-filter' ).addClass( 'disabled' );
		
		$products.each( function( index, element ) {
			Foundation.Motion.animateOut( element, 'scale-out-down' );
		} );
		
	};
	
	var enableFilters = function() {
		
		$( '#product-search' ).attr( 'disabled', false );
		
		$( '.cd-filter' ).removeClass( 'disabled' );
		
	};
	
	$( document ).on( 'ready', function() {
		
		var search = getURLParam( 's' );
		
		if ( search ) {
			
			$( '#product-search' ).val( search );
			
		}
		
		$products.each( function( index, element ) {
			Foundation.Motion.animateIn( element, 'scale-in-up' );
		} );
		
	} );
	
	$( document ).on( 'click touch', '.wcpf-checkbox-label, .wcpf-button', function() {
		disableFilters();
	} );
	
	$( window ).on( 'wcpf_update_products', function() {	
		
		$products = $( '.woocommerce ul.products li.product' );
		
		if ( ! $products.length ) return;
		
		enableFilters();
		
		$products.each( function( index, element ) {
			Foundation.Motion.animateIn( element, 'scale-in-up' );
		} );
		
		$('img.zoom')
		.wrap('<span style="display:inline-block;top: 5px;"></span>')
		.css('display', 'block')
		.parent()
		.zoom();
		
	} );
	
	var typingTimer,
		doneTypingInterval = 1000; // Wait 1s after they stop typing
	
	function doneTyping() {
		
		var url = location.href.replace( /\?.*/g, '' );
		
		window.history.pushState( '', '', url + setURLParam( 's', $( '#product-search' ).val() ) );
		
		$( '.filter-submit.hidden button' ).click();
		
	}
	
	$( '#product-search' ).on( 'keyup', function() {
		clearTimeout( typingTimer );
		typingTimer = setTimeout( doneTyping, doneTypingInterval );
	} );
	
	$( '#product-search' ).on( 'keydown', function() {
		if ( typingTimer ) {
			clearTimeout( typingTimer );
		}
	} );
	
	$( '.new-used-filter' ).on( 'click touch', function( event ) {
		
		event.preventDefault();
		
		var url = location.href.replace( /\?.*/g, '' ), 
			show = getURLParam( 'show', $( this ).attr( 'href' ) );
		
		if ( show == 'all' ) {
			url = url + setURLParam( 'show', false );
		}
		else {
			url = url + setURLParam( 'show', show );
		}
		
		window.history.pushState( '', '', url );
		
		$( '.new-used-filter' ).removeClass( 'selected' );
		$( this ).addClass( 'selected' );
		
		$( '.filter-submit.hidden button' ).click();
		
	} );
	
	/**
	 * Returns a Query String for the current Page with your changes
	 * 
	 * @param		{string} key   Key
	 * @param 		{string} value Value
	 *                         
	 * @since		{{VERSION}}
	 * @returns 	{string} Query String
	 */
	function setURLParam( key, value ) {
		
		key = encodeURIComponent( key );
		value = encodeURIComponent( value );
		
		var urlParams = location.search.substr(1).split( '&' );
		
		if ( urlParams == '' && 
			value !== 'false' ) {
			return '?' + key + '=' + value;
		}
		else {

			var paramCount = urlParams.length,
				param; 
			
			while ( paramCount-- ) {
                param = urlParams[ paramCount ].split('=');

                if ( param[0] == key ) {
					
					if ( value !== 'false' ) {
					
						param[1] = value;
						urlParams[ paramCount ] = param.join( '=' );
						
					}
					else {
						
						urlParams.splice( paramCount, 1 );
						
					}
					
					break;
					
				}
				
            }

            if ( paramCount < 0 ) { 
				
				urlParams[ urlParams.length ] = [key, value].join( '=' );
			
			}
			
            return '?' + urlParams.join( '&' );
			
        }
		
		return '';
		
    }
	
	/**
	 * Grabs GET Parameter from the URL
	 * 
	 * @param		{string} variable Variable Name
	 * @param 		{string} url      URL. Defaults to the current URL
	 *                            
	 * @since		{{VERSION}}
	 * @return 		{string} Parameter Value
	 */
	function getURLParam( variable, url = undefined ) {

		if ( url === undefined ) {
			url = location.href;
		}
		
		// Remove Hash from URL
		url = url.replace( /#.*$/, '' );
		
		// Remove URL before your params
		url = url.replace( /^.*\?/, '' );

		var vars = url.split( '&' );

		for ( var i = 0; i < vars.length; i++ ) {

			var pair = vars[ i ].split( '=' );

			if ( pair[0] == variable ) {
				return pair[1];
			}

		}

		return false;

	}
	
} )( jQuery );