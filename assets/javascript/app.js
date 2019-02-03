// topics array
var topics = ["lions", "whiskey", "gym", "basketball", "rugby", "sharks"];

//creates buttons for each of the starter topics
function renderButtons() {
    // Deleting the buttons prior to adding new items so there are no repeat buttons
    $("#giphyView").empty();
    $(".topic-button-placeholder").empty();
    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {
      // Then dynamicaly generating buttons for each gif in the array
      
        var a = $("<button>");
        a.addClass("topic-button"); // Add a class
        a.attr("data-name", topics[i]); // Add a data attribute
        a.text(topics[i]); // Creates button text
        $(".topic-button-placeholder").append(a); // append the button to giphs div
       
        }
  }

// Generates the new button from the user
$("#topic-input").on("submit", function(event) {
        
        event.preventDefault();
        // user provided data - input field
        var topic = $("#topic-input-field").val().trim();
        
        // Adding user provided data to the array of topics
        topics.push(topic);
        // creates buttons for the entire array, included the user buttons
        renderButtons();
        
        return false;
        
})


$(document).on("click", ".topic-button", function(event) {
        var topic = $($(this)).attr("data-name");
        console.log(topic);
        displayGiphys(topic);


})
// this is where we create a function to display the giphs
function displayGiphys(placeholder) {
    //var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + placeholder + "&limit=9&api_key=3i6J4DtIRjcoSBarXMmCL03YJ6lVNgl1";
    //console.log("display has been activated")
    //Here is where we create the AJAX call
    $.ajax({url: queryURL, method: "GET"}).done(function (response) {
        //save results from AJAX call in a container so we can manipulate and use later
        var results = response.data;
        //loop to go through all giphys and add these variables
        for (var i = 0; i < results.length; i++) {
            // save those results in a div
            var giphyDiv = $('<div class=giphs>');
            var topicGiphy = $('<img>');
                topicGiphy.attr('src', results[i].images.fixed_height_still.url);
                topicGiphy.attr('title', "Rating: " + results[i].rating);
                topicGiphy.attr('data-still', results[i].images.fixed_height_still.url);
                topicGiphy.attr('data-state', 'still');
                topicGiphy.attr('data-animate', results[i].images.fixed_height.url);
                topicGiphy.addClass('giphy');
            var rating = results[i].rating;
            var p = $('<p>').text('Rating: ' + rating);
            giphyDiv.append(topicGiphy);//testing this it was originally prepend
            giphyDiv.append(p);
            $("#giphyView").prepend(giphyDiv);
            console.log(response)
        }
    })
}

// Animate the Giphys when they are clicked on. 
$(document).on("click", ".giphy", function() {
var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
    console.log("animate this")
});


renderButtons();





