window.addEventListener( 'load', function() { 

	var element = document.getElementById( 'commandLine' )
  	  , cl = new CommandLine( element );

  	cl.on( 'Tab', function( e ) {
  		
      if(   e.action == 'activate'
        &&  document.activeElement == element) {
          setTimeout( checkActive, 100 ); 
      }
      
			function checkActive() {
        console.log( 'checkActive' );
				if(	  element.value
				  &&	document.activeElement != element) {
	  	 		window.alert( 'test failed' );
	  	 	} 
	  	 		
  	 		if (	!element.value 
  	 			&& 	document.activeElement == element) {
  	 			window.alert( 'test failed' );
  	 		}
			}
  	} );
} );


