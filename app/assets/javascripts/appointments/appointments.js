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

    $(document).ready(function() {
        $(".datepicker").datepicker({
            showOn: "button",
            buttonImage: "images/calendar.gif",
            buttonImageOnly: true})
    });
});