
$(document).ready(function() {


$(".new-tweet textarea").on('input',function() {

    let $count = ($(this).val().length)
    let $parent = $(this).parent();
    let $counter = $parent.find(".counter");
    $counter.text($count)
     console.log($count)
    if ($count > 140) {
    $counter.css("color", "red").text(140 - $count)
    } else {$counter.css("color", "black").text($count)

    }

});



});