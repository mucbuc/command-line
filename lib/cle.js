(function() {

	function CommandLine( element ) {
		
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

			if (	e.action == 'activate'
				||	e.action == 'repeat') {			
				e.preventDefault();
			}
		});

		keyboard.on( 'Enter', function(e) {
			if (	e.action == 'activate'
				||	e.action == 'repeat') {
				element.value = '';
			} 
		}); 

		keyboard.on( 'Up', function(e) {
			if (	e.action == 'activate'
				||	e.action == 'repeat') {
				e.preventDefault();
			}
		}); 

		keyboard.on( 'Down', function(e) {
			if (	e.action == 'activate'
				||	e.action == 'repeat') {
				e.preventDefault();
			}
		}); 

		function init( e ) {
			e.spellcheck = false;
		}
	}

	window.CommandLine = CommandLine;

})();