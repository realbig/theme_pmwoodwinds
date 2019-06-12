( function( $ ) {
	
	var loaded = false,
        $video = false,
        $videoCategories,
        $categoryCheckboxes;
	
	// Ensure this does not fire on page load
	$( document ).on( 'facetwp-refresh', function() {

		if ( loaded ) {

            $videoCategories.removeClass( function( index, className ) {
                return ( className.match( /scale-(?:in|out)-.+|mui-.+/gi ) || [] ).join( ' ' );
            } );

            $video.each( function( index, element ) {
                Foundation.Motion.animateOut( element, 'scale-out-down' );
            } );

            if ( $categoryCheckboxes.hasClass( 'checked' ) ) {

                // Hide Categories if something is checked
                $videoCategories.each( function( index, element ) {
                    Foundation.Motion.animateOut( element, 'scale-out-down' );
                } );

                setTimeout( function() {

                    $videoCategories.removeClass( function( index, className ) {
                        return ( className.match( /scale-(?:in|out)-.+|mui-.+/gi ) || [] ).join( ' ' );
                    } );
		
                    $videoCategories.each( function( index, element ) {

                        var classes = $( element ).attr( 'class' );

                        if ( classes.match( /scale-(?:in|out)-.+|mui-.+/gi ) !== null ) {

                            $( element ).css( 'display', 'none' );

                        }

                    } );
                    
                }, 250 ); // Wait until animation finishes, 500ms is Motion-UI default

            }
            else {

                // Show Categories if nothing is checked
                $videoCategories.each( function( index, element ) {
                    $( element ).css( 'display', 'block' );
                    Foundation.Motion.animateIn( element, 'scale-in-up' );
                } );

            }

		}
		else {
			loaded = true;
		}

	} );
	
	$( document ).on( 'facetwp-loaded', function() {
		
        $video = $( '.post-type-archive-video .content .video' );
        $videoCategories = $( '.post-type-archive-video .content .video-category' );
        $categoryCheckboxes = $( '.facetwp-facet-video_categories .facetwp-checkbox' );

        $videoCategories.removeClass( function( index, className ) {
            return ( className.match( /scale-(?:in|out)-.+|mui-.+/gi ) || [] ).join( ' ' );
        } );

        // Only show results if something is checked
        if ( $categoryCheckboxes.hasClass( 'checked' ) ) {
		
            $video.each( function( index, element ) {
                Foundation.Motion.animateIn( element, 'scale-in-up' );
            } );

        }
        else {

            $videoCategories.each( function( index, element ) {

                $( element ).css( 'display', 'block' );

                var classes = $( element ).attr( 'class' );

                if ( classes.match( /scale-(?:in|out)-.+|mui-.+/gi ) !== null ) {

                    Foundation.Motion.animateIn( element, 'scale-in-up' );

                }

            } );

        }
		
		setTimeout( function() {
		
			$( document ).trigger( 'video-animations-done' );
			
		}, 250 ); // Wait until animation finishes, 500ms is Motion-UI default
		
    } );
    
    $( document ).on( 'click touch', '.video-category > a', function( event ) {
		
		event.preventDefault();
		
		$categoryCheckboxes = $( '.facetwp-facet-video_categories .facetwp-checkbox' );
		
        let $checkbox = $categoryCheckboxes.filter( '[data-value="' + $( this ).data( 'slug' ) + '"]' );
        
		// This feels so wrong but it is basically what FacetWP expects
		$checkbox.click();
		
	} );
	
} )( jQuery );