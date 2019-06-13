( function( $ ) {

    if ( $( 'body.post-type-archive-tribe_events' ).length <= 0 ) return;

    // Events calendar uses ts as the variable name, so I guess I will too
    var ts = tribe_ev.state;

    $( document ).on( 'click touch', '.cd-tab-filter-wrapper a', function( event ) {

        $( '.cd-tab-filter-wrapper a' ).removeClass( 'selected' );

        $( this ).addClass( 'selected' );

    } );

    $( document ).on( 'click touch', 'nav.tribe-events-nav-pagination a', function( event ) {

        var interval;

        interval = setInterval( function() {

            // Wait for Ajax to finish
            if ( ! ts.ajax_running ) {

                if ( ts.view == 'list' ) {

                    if ( ! $( '.cd-tab-filter-wrapper a[rel="next"]' ).hasClass( 'selected' ) ) {
                        $( '.cd-tab-filter-wrapper a' ).removeClass( 'selected' );
                        $( '.cd-tab-filter-wrapper a[rel="next"]' ).addClass( 'selected' );
                    }

                }
                else {
                    
                    if ( ! $( '.cd-tab-filter-wrapper a[rel="prev"]' ).hasClass( 'selected' ) ) {
                        $( '.cd-tab-filter-wrapper a' ).removeClass( 'selected' );
                        $( '.cd-tab-filter-wrapper a[rel="prev"]' ).addClass( 'selected' );
                    }

                }

                clearInterval( interval );

            }

        }, 100 );

    } );

} )( jQuery );