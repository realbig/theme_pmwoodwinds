( function( $ ) {
	
	var $products = $( '.woocommerce ul.products li.product' );
	
	var disableFilters = function() {
		
		$( '.cd-filter' ).addClass( 'disabled' );
		
		Foundation.Motion.animateOut( $products, 'scale-out-down' );
		
	};
	
	var enableFilters = function() {
		
		$( '.cd-filter' ).removeClass( 'disabled' );
		
	};
	
	$( document ).on( 'ready', function() {
		
		Foundation.Motion.animateIn( $products, 'scale-in-up' );
		
	} );
	
	$( document ).on( 'click touch', '.wcpf-checkbox-label, .wcpf-button', function() {
		disableFilters();
	} );
	
	$( window ).on( 'wcpf_update_products', function() {	
		
		$products = $( '.woocommerce ul.products li.product' );
		
		if ( ! $products.length ) return;
		
		enableFilters();
		
		Foundation.Motion.animateIn( $products, 'scale-in-up' );
		
	} );
	
} )( jQuery );