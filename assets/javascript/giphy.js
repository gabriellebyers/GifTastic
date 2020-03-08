var emotions = ["anger", "sadness", "joy", "confusion", "surprise"]

    // Function for displaying emotion data
    function renderButtons() {

        // Deleting the emotions prior to adding new emotions
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of emotions
        for (var i = 0; i < emotions.length; i++) {

          // Then dynamicaly generating buttons for each emotion in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("emotion");
          // Adding a data-attribute
          a.attr("data-name", emotions[i]);
          // Providing the initial button text
          a.text(emotions[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

           // Calling the renderButtons function to display the intial buttons
           renderButtons();
           ajaxcall();


    


function ajaxcall() {
$(".emotion").on("click", function() {
    // Grabbing and storing the data-emotion property value from the button
    var emotion = $(this).attr("data-name");

    // Constructing a queryURL using the emotion name
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
      emotion + "&api_key=94n5NFxVL6AJ9JnsLMcqySUyiqcllpTz&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var emotionDiv = $("<div>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var emotionImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          emotionImage.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and image tag to the emotionDiv
          emotionDiv.append(p);
          emotionDiv.append(emotionImage);

          // Prependng the emotionDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifs-appear-here").prepend(emotionDiv);
        }
      });
  });
}



  $("#add-emotion").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var emotionadd = $("#emotion-input").val().trim();

    // Adding movie from the textbox to our array
    emotions.push(emotionadd);
console.log(emotions)
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
    ajaxcall();

    
  });



      // This function handles events where a movie button is clicked
     

      // Adding a click event listener to all elements with a class of "movie"
    //   $(document).on("click", ".emotion", displayMovieInfo);

 