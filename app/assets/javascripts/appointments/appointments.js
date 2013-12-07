$( document ).ready( function() {
	
	if( $( '#calendar' ).length > 0 ) {
		
		$( '#calendar' ).fullCalendar({
			editable: true,
			defaultView: 'month'
		});
		
	}
	
});