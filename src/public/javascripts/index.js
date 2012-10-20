( function( $, undefined ) {
  var chart;
  
  $( document ).ready( init );
  
  function init() {
    registerEventListeners();
  }
  
  function registerEventListeners() {
    $( ".submit" ).click( handleSubmit );
    $('#fileupload').fileupload({
            dataType: 'json',
            done: function (e, data) {
              $( ".output" ).val( JSON.stringify(data.result) );
              showChart( data.result );
            }
        });
  }
  
  function showChart( data ) {
    chart = new Highcharts.Chart( data );
  }
  
  function handleSubmit() {
    $('#fileupload').click();
  }
  
})( jQuery );