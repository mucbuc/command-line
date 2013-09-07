window.addEventListener( 'load', function() {

	var emitter = new EventStream()
    , TIMEOUT = 0
    , line = document.getElementById( 'commandLine' )
    , area = document.getElementById( 'commandArea' );

  // need to test these 
  emitter.on( 'auto', function( command ) { console.log( 'auto:', command ); } );
  emitter.on( 'reverse auto', function( command ) { console.log( 'reverse auto:', command ); } );
  emitter.on( 'eval', function( command ) { console.log( 'eval:', command ); } );
  emitter.on( 'previous', function() { console.log( 'previous' ); } );
  emitter.on( 'next', function() { console.log( 'next' ); } );

  testElement( line ); 
  testElement( area ); 

  function testElement( element ) {

    var cl = new CommandLine( element, emitter )
    
    cl.on( 'Tab', checkActive );
    cl.on( 'Up', checkCarret );
    cl.on( 'Down', checkCarret );
    cl.on( '*', emitter.tick );

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
  }

  function failTest() {
    window.alert( 'test failed' );
  }
} );


