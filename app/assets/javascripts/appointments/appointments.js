$( document ).ready( function() {
	
	if( $( '#calendar' ).length > 0 ) {
		
		$( '#calendar' ).fullCalendar({
			editable: true,
			defaultView: 'month'
		});
		
	}
    if ( $ ('#appointment_doctor').length > 0) {
      $("#appointment_doctor").autocomplete({
          source: "/doctors/search"
      })
    }

    if ( $ ('#appointment_date').length > 0) {
        $( "#appointment_date").datepicker();
    }


});