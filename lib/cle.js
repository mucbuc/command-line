/* 
	events: 
		"auto", "eval"
	dependencies: eventstream
*/ 

(function() {

	function CommandLine( element, emitter ) {
		
		var keyboard = new Keyboard( element )
		  , instance = this
		  , shifted = false
		  , history = []
		  , searchIndex = 0
		  , autoCompleteState = null
		  , pathList = [];

		init( element );

		this.on = function( key, handler ) {
			keyboard.on( key, handler );
		};

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
				emitter.onTickEmit('eval', element.value );
				if (element.value != history[ history.length - 1 ])
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
		keyboard.on( 'Backspace', cancelAutoComplete );
		element.addEventListener( 'textInput', cancelAutoComplete ); 
		
		element.addEventListener( 'focus', function() {
			emitter.on( 'auto', autoComplete );
			emitter.on( 'reverse auto', reverseAutoComplete );
		} ); 

		element.addEventListener( 'blur', function() {
			emitter.removeListener( 'auto', autoComplete );
			emitter.removeListener( 'reverse auto', reverseAutoComplete );
		} );
	
		this.clearAuto = function() {
			emitter.removeListener( 'auto', auto );
			emitter.removeListener( 'reverse auto', reverseAuto );
		};

		this.registerAutoComplete = function( list ) {
			pathList = list;
		};

		function onTab(e) {
			
			if (!element.value) {
				return;
			}

			if (actionFilter(e.action)) {
				emitter.onTickEmit( shifted ? 'reverse auto' : 'auto', element.value );
				e.preventDefault();
			}
		}

		function cancelAutoComplete() {
			autoCompleteState = null;
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

		function applyAuto( command ) {
			
			command = command.substr( 0, autoCompleteState.position );
			
			if (command.length) {
				command += ' ';
			}

			element.value = command + autoCompleteState.options[autoCompleteState.index];
		//	$scope.$apply();
		}

  		function initAutoComplete( command ) {

			var ind = command.lastIndexOf( ' ' )
			  , accept = []
			  , end = command.substr( ind + 1 )
			  , re = new RegExp( '^' + end, "i" );		// case insensitive
		
			pathList.forEach( function( e ) {
				if (re.test( e )) {
				  accept.push( e );
				}
			} ); 

			return { index: 0, options: accept, position: ind };
		}

		function autoComplete( command ) {
			
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
		}

		function reverseAutoComplete( command ) {

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
		}

	}

	window.CommandLine = CommandLine;

})();