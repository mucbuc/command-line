window.addEventListener( 'load', function() {

	var element = document.getElementById( 'commandLine' )
    , emitter = new EventStream()
 	  , cl = new CommandLine( element, emitter )
    , TIMEOUT = 0;

  cl.on( 'Tab', checkActive );
  cl.on( 'Up', checkCarret );
  cl.on( 'Down', checkCarret );
  cl.on( 'Enter', emitter.tick );

  emitter.on( 'auto', function() { console.log( 'auto' ); } );
  emitter.on( 'eval', function() { console.log( 'eval' ); } );
  emitter.on( 'previous', function(e) { console.log( 'previous' ); } );
  emitter.on( 'next', function() { console.log( 'next' ); } );

  function checkActive( e ) {
    if (  e.action == 'activate' 
       || e.action == 'repeat') {
      setTimeout( function() {
        if(element.value && document.activeElement != element) {
          failTest();
        }
        emitter.tick();
      }, TIMEOUT ); 
    }
  }

  function checkCarret(e) {
    var start = element.selectionStart
      , end = element.selectionEnd;
    if (  e.action == 'activate' 
       || e.action == 'repeat') {
      var start = element.selectionStart
        , end = element.selectionEnd;
      setTimeout( function() {
        if (  start != element.selectionStart
           || end != element.selectionEnd) {
          failTest();
        }
        emitter.tick();
      }, TIMEOUT );
    }
  }

  function failTest() {
    window.alert( 'test failed' );
  }
} );


