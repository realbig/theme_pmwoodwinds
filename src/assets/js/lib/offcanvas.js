( function( $ ) {
    'use strict'
  
    $( document ).on( 'click touch', '[data-toggle="offcanvas"]', function() {
      $( '.offcanvas-collapse' ).toggleClass( 'open' )
    } );

  } )( jQuery );