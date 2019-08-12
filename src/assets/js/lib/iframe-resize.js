/**
 * Resizes an iFrame to fit the width of its Parent and adjusts the height to match the original Aspect Ratio
 * 
 * @param		{object} iFrame DOM Object of the iFrame
 * @since		{{VERSION}}
 * @return		void
 */
function resizeIframe( iFrame ) {

	var $el = jQuery( iFrame ),
		newWidth = $el.parent().width();

	if ( ! $el.data( 'aspectRatio' ) ) {

		$el
			.data( 'aspectRatio', iFrame.height / iFrame.width )

		// and remove the hard coded width/height
			.removeAttr( 'height' )
			.removeAttr( 'width' );

	}

	$el
		.width( newWidth )
		.height( newWidth * $el.data( 'aspectRatio' ) );

}

( function( $ ) {
	
	function resizeAll() {
		
		// Find all YouTube videos
		var $allVideos = $( 'iframe:not(.ignore-responsive)' );
		
		// Resize all videos according to their own aspect ratio
		$allVideos.each( function() {

			resizeIframe( this );

		} );
		
	}
	
	$( document ).ready( function() {
		
		// When the window is resized
		// (You'll probably want to debounce this)
		$( window ).resize( function() {

			resizeAll();

		// Kick off one resize to fix all videos on page load
		} ).resize();
		
		$( document ).on( 'open.zf.reveal media-animations-done video-animations-done', function() {
			
			resizeAll();
			
		} );
		
	} );
	
} )( jQuery );