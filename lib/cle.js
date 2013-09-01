(function() {

	function CommandLine( element ) {
		var keyboard = new Keyboard( element );

		init( element );

		keyboard.on( 'Tab', function(e) {
			
			if (!element.value) {
				return;
			}
			
			switch (e.action) {
				case 'activate':
				case 'repeat':
					e.preventDefault();
					break;
			}
		});

		keyboard.on( 'Enter', function(e) {
			if (e.action == 'activate') {
				element.value = '';
			}
		}); 

		keyboard.on( 'Up', function(e) {
			if (e.action == 'activate') {
				e.preventDefault();
			}
		}); 

		keyboard.on( 'Down', function(e) {
			if (e.action == 'activate') {
				e.preventDefault();
			}
		}); 

		function init( e ) {
			e.spellcheck = false;
		}
	}

	window.CommandLine = CommandLine;

})();