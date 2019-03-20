<?php

// The Compare Products Plugin would randomly stop using the actual Page that was created, so this will stop that from being a problem

add_filter( 'body_class', function( $body_class ) {
	
	$body_class = array_merge( $body_class, array( 'page-template-compare' ) );
	
	return $body_class;
	
} );

locate_template( 'compare.php', true, true );