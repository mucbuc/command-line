window.addEventListener( 'load', function() { 

	var element = document.getElementById( 'commandLine' )
  	  , cl = new CommandLine( element );

  	cl.on( 'Tab', function( e ) {
  		window.setTimeout( function() {
			if(		element.value
				&&	document.activeElement != element) {
  	 			window.alert( 'test failed' );
  	 		}
  	 	}, 10 );
  	 	console.log( 'Tab up' );
  	} );
} );


