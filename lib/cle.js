(function() {

	function CommandLine( element ) {
		var keyboard = new Keyboard( element );

		init( element );

		keyboard.on( 'Tab', function(e) {
			
			switch (e.action) {
				case 'activate':
				case 'repeat':
					
					e.preventDefault();
					break;
			}
		} );

		function init( e ) {
			e.spellcheck = false;
		}
	}

	window.CommandLine = CommandLine;

})();