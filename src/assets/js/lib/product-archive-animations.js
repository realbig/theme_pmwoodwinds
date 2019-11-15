import ResponsiveBootstrapToolkit from 'responsive-toolkit';

var facets = jQuery( '.shop-sidebar .widget' ).html();
	
( function( $, viewport ) {

	$( document ).ready( function() {

		// Ensure our secondary set of Filters for mobile works
		if ( viewport.is( '>sm' ) ) {

			if ( $( '.shop-sidebar .widget' ).length <= 0 ) {

				$( 'shop-sidebar .cd-filter' ).prepend( facets );

			}

		}
		else {

			$( '.shop-sidebar .widget' ).remove();

		}

	} );

} )( jQuery, ResponsiveBootstrapToolkit );

( function( $ ) {
	
	var loaded = false,
		$products = false;

	// Check to see if we're on the right page
	if ( $( '.woocommerce-result-count' ).length <= 0 ) return;

	var content = $( '.woocommerce-result-count' ).html().trim();

	content = content.replace( /(\d+(?:.*\d)?|the single result)/i, "<span class='facetwp-counts'>$1</span>" );

	// Update the string with FacetWP's values as appropriate
	$( '.woocommerce-result-count' ).html( content );
	
	// Ensure this does not fire on page load
	$( document ).on( 'facetwp-refresh', function() {

		if ( loaded ) {

			$( '.facetwp-type-search .facetwp-search' ).prop( 'readonly', false );

			$products.each( function( index, element ) {
				Foundation.Motion.animateOut( element, 'scale-out-down' );
			} );

		}
		else {
			loaded = true;
		}

	} );
	
	$( document ).on( 'facetwp-loaded', function() {
		
		$products = $( '.woocommerce ul.products li.product' );
		
		$products.each( function( index, element ) {
			Foundation.Motion.animateIn( element, 'scale-in-up' );
		} );
		
		setTimeout( function() {
		
			$( document ).trigger( 'product-animations-done' );
			
		}, 250 ); // Wait until animation finishes, 500ms is Motion-UI default
		
	} );
	
	$( document ).on( 'click touch', '.new-used-filter', function( event ) {
		
		event.preventDefault();

		$( '.new-used-filter' ).removeClass( 'selected' );
		$( this ).addClass( 'selected' );
		
		var $select = $( '.facetwp-facet-show select' );
		
		if ( $select.find( 'option[value="' + $( this ).data( 'value' ) + '"]' ).length <= 0 ) {
			$select.append( '<option value="' + $( this ).data( 'value' ) + '">' + $( this ).data( 'value' ) + '</option>' );
		}
		
		$select.val( $( this ).data( 'value' ) ).trigger( 'change' );
		
	} );
	
	$( document ).on( 'product-animations-done', function() {
		
		$('img.zoom')
		.wrap('<span style="display:inline-block;top: 5px;"></span>')
		.css('display', 'block')
		.parent()
		.zoom();
		
	} );
	
} )( jQuery );