( function( $ ) {

    if ( $( 'body.post-type-archive-media' ).length < 0 ) return;

    $( document ).on( 'click touch', 'a.media-fresco', function( event ) {

        event.preventDefault();

        var items       = $( this ).data( 'gallery' );

		var gallery = Fresco.show( items, {
            onShow: function() {
                $( '#wpadminbar' ).hide();
            },
            afterHide: function() {
                $( '#wpadminbar' ).show();
            },
        } );

    } );

} )( jQuery ); 