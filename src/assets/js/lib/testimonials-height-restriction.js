( function( $ ) {

	$( document ).on( 'ready', function() {

		if ( $( '#trd-testimonial' ).length > 0 ) {

			var $element, $children, $container, totalHeight;

			$( '#trd-testimonial .read-more-container a' ).click( function() {

				totalHeight = 0

				$element = $( this );
				$container = $element.closest( '.trd-testimonial-text' );
				
				$children = $container.find( '> *' );

				if ( ! $container.hasClass( 'opened' ) ) {
					
					$container.removeClass( 'closed' );

					// measure how tall inside should be by adding together heights of all inside paragraphs
					$children.each( function() {
						totalHeight += $( this ).outerHeight( true );
					} );

					totalHeight += $container.innerHeight() - $container.height(); // Top and Bottom Padding

					$container.addClass( 'closed' );

					$container.data( 'max-height', $container.css( 'max-height' ) );

					$container.css( {
						// Set height to prevent instant jumpdown when max height is removed
						'height': $container.innerHeight(),
						'max-height': 9999
					} )
					.removeClass( 'closed' )
					.addClass( 'opened' )
					.animate( {
						'height': totalHeight
					} );
					
					$element.text( pmwoodwind.testimonialsSlider.collapse );

				}
				else {

					$container.removeClass( 'opened' )
					.addClass( 'closed' )
					.animate( {
						'height': $container.data( 'max-height' ),
						'max-height': $container.data( 'max-height' )
					} );
					
					$element.text( pmwoodwind.testimonialsSlider.readMore );

				}

				// prevent jump-down
				return false;

			} );

		}

	} );

} )( jQuery );