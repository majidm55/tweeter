// $(function() {
//   $form = $('<form>'); ///have to add url //
//   $form.'submit', function () {
//     event.preventDefault();
//     console.log('Button clicked, performing ajax call...');

//    $.post( "/tweets", $( "<form>" ).serialize() );
// };
// });

// // $textarea = $('<textarea>').text()
// // $input = $('<input>').

// $(function postingData() {
//   $form = $('.new-tweet form');
//   $form.'submit', function (event) {
//   event.preventDefault();
//   console.log('Button clicked, performing ajax call...');
//   $.post( "/tweets", $form .serialize() );
// };
// console.log($form)
// });
// postingData();


$.get( "/tweets", function( data ) {
  $( "body" )
    .append( "Name: " + data.name ) // John
    .append( "Time: " + data.time ); //  2pm
}, "json" );