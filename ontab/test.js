var assert = require( 'assert' )
  , OnTab = require( './index.js' )
  , Expector = require( 'Expector' ).Expector;

suite( 'basics', function() {

  test( 'getter/setter', function() {
    assert( typeof OnTab === 'function' );

    var ot = new OnTab()
      , a
      , b = [ a ];

    ot.context = b;
    assert( ot.context === b );

    ot.context = a;
    assert( ot.context[0] === a );
  });

  test( 'existance of methods', function() {
    var ot = new OnTab(); 
    assert( typeof ot.autoComplete === 'function' );
    assert( typeof ot.reverseAutoComplete === 'function' );
    assert( typeof ot.cancelAutoComplete === 'function' );
  }); 

  test( 'autoCompleteSingleContext', function() {
    var single = 'hello'
      , ot = new OnTab( function( value ) {
          assert( single === value );
        } );

    ot.context = single; 
    ot.autoComplete( 'h' ); 
  });

  test( 'autoComplete', function() {
    var set = [ 'apple', 'hello', 'orange' ]
      , ot = new OnTab( function( value ) {
          assert( value === 'orange' );
        } );

    ot.context = set; 
    ot.autoComplete( 'o' ); 
  });

  test( 'autoCompleteCycle', function() {
    var emitter = new Expector()
      , set = [ 'apple', 'hello', 'asshole' ]
      , ot = new OnTab( function( value ) {
          emitter.emit( value ); 
        } );

    ot.context = set; 

    emitter.expect( 'apple' )
    emitter.expect( 'asshole' );

    ot.autoComplete( 'a' ); 
    ot.autoComplete( 'a' );

    emitter.check();
  });


});
