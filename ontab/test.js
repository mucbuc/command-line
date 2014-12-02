var assert = require( 'assert' )
  , OnTab = require( './index.js' )
  , Expector = require( 'Expector' ).Expector;

suite( 'basics', function() {

  var emitter
    , ot;

  setup( function() {
    emitter = new Expector();
    ot = new OnTab( function( value ) {
      emitter.emit( value ); 
    } );
  } );

  teardown( function() {
    emitter.check();
    delete emitter;
    delete ot;
  } );

  test( 'getter/setter', function() {
    assert( typeof OnTab === 'function' );

    var a
      , b = [ a ];

    ot.context = b;
    assert( ot.context === b );

    ot.context = a;
    assert( ot.context[0] === a );
  });

  test( 'existance of methods', function() {
    assert( typeof ot.autoComplete === 'function' );
    assert( typeof ot.reverseAutoComplete === 'function' );
    assert( typeof ot.cancelAutoComplete === 'function' );
  }); 

  test( 'autoCompleteSingleContext', function() {
    var single = 'hello';
    ot.context = single; 
    emitter.expect( single );
    ot.autoComplete( 'h' ); 
  });

  test( 'autoComplete', function() {
    var set = [ 'apple', 'hello', 'orange' ];
    ot.context = set; 

    emitter.expect( 'orange' );
    ot.autoComplete( 'o' ); 
  });

  test( 'autoCompleteCycle', function() {
    var set = [ 'apple', 'hello', 'asshole' ];
    ot.context = set; 

    emitter.expect( 'apple' )
    emitter.expect( 'asshole' );

    ot.autoComplete( 'a' ); 
    ot.autoComplete( 'a' );
  });


});
