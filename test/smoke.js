window.addEventListener( 'load', function() { 

	var element = document.getElementById( 'commandLine' )
  	  , cl = new CommandLine( element );

  	cl.on( 'Tab', function( e ) {
  		
      if(   e.action == 'activate'
        &&  document.activeElement == element) {
          setTimeout( checkActive, 100 ); 
      }
      
			function checkActive() {
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

    cl.on( 'Up', doTest );
    cl.on( 'Down', doTest );

    function doTest() {
      var start = element.selectionStart
        , end = element.selectionEnd;

      setTimeout( checkCaret, 100 );

      function checkCaret() {
        if (  start != element.selectionStart
           || end != element.selectionEnd) {
          alert( 'test failed' );
        }
      }
    }
} );


