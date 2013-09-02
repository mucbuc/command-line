window.addEventListener( 'load', function() { 

	var element = document.getElementById( 'commandLine' )
 	  , cl = new CommandLine( element )
    , TIMEOUT = 0
    , carret = { start: 0, end: 0 };

	cl.on( 'Tab', checkActive );
  cl.on( 'Up', checkCarret );
  cl.on( 'Down', checkCarret );

  function checkActive( e ) {
    if (  e.action == 'activate' 
       || e.action == 'repeat') {
      setTimeout( function() {
        if(   element.value
          &&  document.activeElement != element) {
          failTest();
        } 
        
        if (  !element.value 
          &&  document.activeElement == element) {
          failTest();
        }
      }, TIMEOUT ); 
    }
  }

  function checkCarret(e) {
    var start = element.selectionStart
      , end = element.selectionEnd;

    if (  e.action == 'activate' 
       || e.action == 'repeat') {
      carret.start = element.selectionStart;
      carret.end = element.selectionEnd;
    }
    else if (e.action == 'release') {
      if (  carret.start != element.selectionStart
         || carret.end != element.selectionEnd) {
        failTest();
      }
    }
  }

  function failTest() {
    window.alert( 'test failed' );
  }
} );


