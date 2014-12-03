/* 
  events: 
    "auto", "eval"
  dependencies: eventstream
*/ 

(function() {

  function CommandLine( element, emitter, OnTab ) {
    
    var keyboard = new Keyboard( element )
      , instance = this
      , shifted = false
      , history = []
      , searchIndex = 0
      , tabber = new OnTab( function( value ) {
          element.value = value;
        } ); 

    init( element );

    this.on = function( key, handler ) {
      keyboard.on( key, handler );
    };

    keyboard.on( 'Right', function(e) {
      if (  instance.hasOwnProperty( 'macros' ) 
        &&  actionFilter(e.action)) {
        if (element.value) {
          var b = element.value.lastIndexOf( ' ' )
            , tail = element.value.substr( b == -1 ? 0 : b + 1 )
            , macros = instance.macros;

          if (macros.hasOwnProperty(tail))
            element.value = element.value.slice( 0, -tail.length ) + macros[tail];
        }
      }
    }); 

    keyboard.on( 'Shift', function(e) {
      if (e.action == 'activate') {
        shifted = true;
      }
      else if (e.action == 'release') {
        shifted = false;
      }
    });

    keyboard.on( 'Enter', function(e) {
      if (actionFilter(e.action)) {
        e.preventDefault();
        emitter.emit('eval', element.value );
        if (history[history.length-1] !== element.value)
          history.push( element.value );
        element.value = '';
        searchIndex = 0;
      } 
    }); 

    keyboard.on( 'Up', function(e) {
      if (actionFilter(e.action)) {
        e.preventDefault();
        if (searchIndex < history.length) {
          applyHistory( ++searchIndex );
        }
      }
    }); 

    keyboard.on( 'Down', function(e) {
      if (actionFilter(e.action)) {
        e.preventDefault();
        if (searchIndex > 1) {
          applyHistory( --searchIndex ); 
        }
      }
    });

    keyboard.on( 'Tab', onTab ); 
    keyboard.on( 'Backspace', tabber.cancelAutoComplete );
    keyboard.on( '/', function(e) {
      if (actionFilter(e.action)) {
        emitter.emit( '/', e );
      }
    } );

    element.addEventListener( 'textInput', tabber.cancelAutoComplete ); 
    
    element.addEventListener( 'focus', function() {
      emitter.on( 'auto', tabber.autoComplete );
      emitter.on( 'reverse auto', tabber.reverseAutoComplete );
      emitter.on( '/', emitCD );
    } ); 

    element.addEventListener( 'blur', function() {
      emitter.removeListener( 'auto', tabber.autoComplete );
      emitter.removeListener( 'reverse auto', tabber.reverseAutoComplete );
      emitter.removeListener( '/', emitCD );
    } );

    this.__defineSetter__( 'registerAutoComplete', function( list ) {
      tabber.context = list;
    } );

    this.__defineGetter__( 'getAutoComplete', function() {
      return tabber.context;
    } );

    function emitCD(e) {
      tabber.cancelAutoComplete();
      emitter.emit( 'cd' );
    } 

    function onTab(e) {
      
      if (!element.value) {
        return;
      }

      if (actionFilter(e.action)) {
        emitter.emit( shifted ? 'reverse auto' : 'auto', element.value );
        e.preventDefault();
      }
    }

    function applyHistory( index ) {
      element.value = history[ history.length - index ];
    }

    function actionFilter( action ) {
      return action == 'activate' || action == 'repeat';
    }

    function init( e ) {
      e.spellcheck = false;
    }
  }

  window.CommandLine = CommandLine;

})();