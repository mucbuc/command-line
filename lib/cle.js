(function() {

	function CommandLine( element ) {
		var keyboard = new Keyboard( element );

		keyboard.on( 'Tab', function(e) {
			
			switch (e.action) {
				case 'activate':
				case 'repeat':
					
					e.preventDefault();
					break;
			}
		} );
	}

	window.CommandLine = CommandLine;

})();