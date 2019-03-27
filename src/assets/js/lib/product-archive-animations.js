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
		
		var $select = $( '.facetwp-facet-show select' );
		
		if ( $select.find( 'option[value="' + $( this ).data( 'value' ) + '"]' ).length <= 0 ) {
			$select.append( '<option value="' + $( this ).data( 'value' ) + '">' + $( this ).data( 'value' ) + '</option>' );
		}
		
		$select.val( $( this ).data( 'value' ) ).trigger( 'change' );
		
	} );
	
	// Parent Category
	$( document ).on( 'click touch', '.facetwp-facet > .facetwp-checkbox', function( event ) {
		
		// This is read _before_ the class is applied
		var isChecking = $( this ).hasClass( 'checked' ) ? false : true;
		
		var $childCategories = $( this ).next( '.facetwp-depth' ).find( '.facetwp-checkbox' );
		
		if ( ! isChecking ) return;
		
		// If we're checking a Parent Category, force-uncheck all Child Categories
		// We make them appear checked via CSS. Having them actually be checked causes issues with the query, and the end result is the same anyway
		$childCategories.removeClass( 'checked' );
		
	} );
	
	// Child Category
	$( document ).on( 'click touch', '.facetwp-facet .facetwp-depth .facetwp-checkbox', function( event ) {
		
		// This is read _before_ the class is applied
		var isChecking = $( this ).hasClass( 'checked' ) ? false : true;
		
		if ( ! isChecking ) return;
		
		var $parentCategory = $( this ).closest( '.facetwp-depth' ).first().prev( '.facetwp-checkbox' );
		
		// If the Parent Category isn't checked, we don't care
		if ( ! $parentCategory.hasClass( 'checked' ) ) return;
		
		$parentCategory.removeClass( 'checked' );
		
	} );
	
	$( document ).on( 'product-animations-done', function() {
		
		$('img.zoom')
		.wrap('<span style="display:inline-block;top: 5px;"></span>')
		.css('display', 'block')
		.parent()
		.zoom();
		
	} );
	
} )( jQuery );