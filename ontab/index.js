/* 
  'auto'
  'reverse auto' 
  'cancel'
*/ 


(function(){
  function OnTab( callback ) {

    var autoCompleteState = null
      , autoList = [];

    this.__defineGetter__( 'context', function() {
      return autoList; 
    } );

    this.__defineSetter__( 'context', function(val) {
      if (Array.isArray(val)) {
        autoList = val;
      }
      else {
        autoList = [ val ];
      }
    } );

    this.autoComplete = function( command ) {

      if (!autoCompleteState && command.length) {
        autoCompleteState = initAutoComplete( command );

        if (autoCompleteState) {
          autoCompleteState.index = autoCompleteState.options.length - 1;
        }
      }

      if (autoCompleteState && autoCompleteState.options.length) {
        ++autoCompleteState.index;
        autoCompleteState.index %= autoCompleteState.options.length;

        applyAuto( command );
      }
    };

    this.reverseAutoComplete = function( command ) {

      if (!autoCompleteState && command.length) {
        autoCompleteState = initAutoComplete( command );
      }

      if (autoCompleteState && autoCompleteState.options.length) {
        if (autoCompleteState.index) {
          --autoCompleteState.index;
        }
        else {
          autoCompleteState.index = autoCompleteState.options.length - 1; 
        }

        applyAuto( command );
      }
    };
    
    this.cancelAutoComplete = function() {
      autoCompleteState = null;
    }; 

    function initAutoComplete( command ) {

      var ind = getBeginIndex( command )
        , options = []
        , end = command.substr( ind + 1 )
        , re = new RegExp( '^' + end, "i" );    // case insensitive
    
      autoList.forEach( function( e ) {
        if (re.test( e )) {
          options.push( e );
        }
      } ); 

      return { index: 0, options: options, position: ind };
    }

    function getBeginIndex( command ) {
      var a = command.lastIndexOf( ' ' )
        , b = command.lastIndexOf( '/' );

      return b > a ? b : a;
    }

    function applyAuto( command ) {
      var value = command.substr( 0, autoCompleteState.position + 1 ) 
                + autoCompleteState.options[autoCompleteState.index];
      
      callback( value ); 
    }
  }

  if (typeof module !== 'undefined') {
    module.exports = OnTab; 
  }
  else {
    window.OnTab = OnTab;
  }
})();