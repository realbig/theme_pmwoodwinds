( function( $ ) {
	
	var $products = $( '.woocommerce ul.products li.product' );
	
	var disableFilters = function() {
		
		$( '.cd-filter' ).addClass( 'disabled' );
		
		$products.each( function( index, element ) {
			Foundation.Motion.animateOut( element, 'scale-out-down' );
		} );
		
	};
	
	var enableFilters = function() {
		
		$( '.cd-filter' ).removeClass( 'disabled' );
		
	};
	
	$( document ).on( 'ready', function() {
		
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
		
	} );
	
} )( jQuery );