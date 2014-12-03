window.addEventListener( 'load', function() {

	var TIMEOUT = 0
    , line = document.getElementById( 'commandLine' )
    , area = document.getElementById( 'commandArea' );

  testElement( line ); 
  testElement( area ); 

  function testElement( element ) {

  // need to test these 
  // emitter.on( 'auto', function( command ) { console.log( 'auto:', command ); } );
  // emitter.on( 'reverse auto', function( command ) { console.log( 'reverse auto:', command ); } );
  // emitter.on( 'eval', function( command ) { console.log( 'eval:', command ); } );
  // emitter.on( 'previous', function() { console.log( 'previous' ); } );
  // emitter.on( 'next', function() { console.log( 'next' ); } );

    var emitter = new Stream()
      , cl = new CommandLine( element, emitter, OnTab );
    
    cl.on( 'Tab', checkActive );
    cl.on( 'Tab', checkAutoComplete );
    cl.on( 'Up', checkCarret );
    cl.on( 'Down', checkCarret );
       
    emitter.on( 'cd', function() {
      element.value += '/cd'; 
    } );
    
    cl.registerAutoComplete = ['on', 'off' ];

    cl.macros = { 
        "ls": "ls -la"
    };

    function checkAutoComplete(e) {
      if (   actionFilter(e.action)
          && document.activeElement == element
          && element.value == 'o') {
        var expect = element.value == 'on' ? 'off' : 'on';
        setTimeout( function() { 
          if (element.value != expect) {
            failTest();
          }
        }, 0 );
      }
    }

    function checkActive( e ) {
      if (actionFilter(e.action)) {
        setTimeout( function() {
          if(element.value && document.activeElement != element) {
            failTest();
          }
        }, TIMEOUT ); 
      }
    }

    function checkCarret(e) {
      var start = element.selectionStart
        , end = element.selectionEnd;
      if (actionFilter(e.action)) {
        var start = element.selectionStart
          , end = element.selectionEnd;
        setTimeout( function() {
          if (  start != element.selectionStart
             || end != element.selectionEnd) {
            failTest();
          }
        }, TIMEOUT );
      }
    }

    function actionFilter( action ) {
      return action == 'activate' || action == 'repeat';
    }
  }

  function failTest() {
    window.alert( 'test failed' );
  }
} );


