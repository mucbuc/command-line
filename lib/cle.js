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
		  , searchIndex = 0;

		init( element );

		this.on = function( key, handler ) {
			keyboard.on( key, handler );
		};

		keyboard.on( 'Tab', function(e) {
			
			if (!element.value) {
				return;
			}

			if (actionFilter(e.action)) {
				emitter.onTickEmit( shifted ? 'reverse auto' : 'auto', element.value );
				e.preventDefault();
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
				emitter.onTickEmit('eval', element.value );
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
				if (searchIndex > 0) {
					applyHistory( --searchIndex ); 
				}
			}
		}); 

		function applyHistory( index ) {
			element.value = history[ history.length - index ];
		}

		function actionFilter(action) {
			return action == 'activate' || action == 'repeat';
		}

		function init( e ) {
			e.spellcheck = false;
		}
	}

	window.CommandLine = CommandLine;

})();