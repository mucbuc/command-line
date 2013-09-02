/* 
	events: 
		"auto", "eval", "previous", "next" 

	dependencies: eventstream
*/ 


(function() {

	function CommandLine( element, emitter ) {
		
		var keyboard = new Keyboard( element )
		  , instance = this;

		init( element );

		this.on = function( key, handler ) {
			keyboard.on( key, handler );
		};

		keyboard.on( 'Tab', function(e) {
			
			if (!element.value) {
				return;
			}

			if (actionFilter(e.action)) {
				emitter.onTickEmit('auto', element.value );
				e.preventDefault();
			}
		});

		keyboard.on( 'Enter', function(e) {
			if (actionFilter(e.action)) {
				emitter.onTickEmit('eval', element.value );
				element.value = '';
				e.preventDefault();
			} 
		}); 

		keyboard.on( 'Up', function(e) {
			if (actionFilter(e.action)) {
				emitter.onTickEmit('previous');
				e.preventDefault();
			}
		}); 

		keyboard.on( 'Down', function(e) {
			if (actionFilter(e.action)) {
				emitter.onTickEmit('next');
				e.preventDefault();
			}
		}); 

		function actionFilter(action) {
			return action == 'activate' || action == 'repeat';
		}

		function init( e ) {
			e.spellcheck = false;
		}
	}

	window.CommandLine = CommandLine;

})();