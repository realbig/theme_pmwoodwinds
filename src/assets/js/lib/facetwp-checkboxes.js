( function( $ ) {
	
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
	
} )( jQuery );