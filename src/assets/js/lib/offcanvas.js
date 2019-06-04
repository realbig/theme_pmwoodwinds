( function( $ ) {
    'use strict'
  
    $( document ).on( 'click touch', '[data-toggle="offcanvas"]', function() {
      $( '.offcanvas-collapse' ).toggleClass( 'open' )
    } );

    $( document ).on( 'facetwp-refresh', function() {

        $( 'button.apply-filters, button.close-filters' ).attr( 'disabled', true );

    } );

    $( document ).on( 'facetwp-loaded', function() {

        $( 'button.apply-filters, button.close-filters' ).attr( 'disabled', false );

    } );

  } )( jQuery );