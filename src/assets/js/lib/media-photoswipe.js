( function( $ ) {

    if ( $( 'body.post-type-archive-media' ).length < 0 ) return;

    $( document ).on( 'click touch', 'a.media-photoswipe', function( event ) {

        event.preventDefault();

        var pswpElement = $( '.pswp' )[0],
			items       = $( this ).data( 'gallery' );

		var options = $.extend( {
			index: 0,
			addCaptionHTMLFn: function( item, captionEl ) {
				if ( ! item.title ) {
					captionEl.children[0].textContent = '';
					return false;
				}
				captionEl.children[0].textContent = item.title;
				return true;
			}
		}, wc_single_product_params.photoswipe_options );

		// Initializes and opens PhotoSwipe.
		var photoswipe = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options );
		photoswipe.init();

    } );

} )( jQuery );