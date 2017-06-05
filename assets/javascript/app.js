var topics = ["Silver Surfer", "Captain America", "Thor", "Spiderman", "Batman", "Superman", "Wonder Woman", "Robin", "Green Lantern"];

var animate = 0;
//get the document ready
$(document).ready(function() {
    console.log("ready!");
    //create button when doc opens
    createButton();
    //Add new hero button clicked
    $("#addhero").on("click", function(event) {
        event.preventDefault();

        //Capture user input
        var hero = $("#newhero").val().trim()
            //prevent creation of empty buttons
            if(hero !== ""){
                //Add user input to array and fire function to make new button
                topics.push(hero);
                //run create button function
                createButton();
            }
    });
    //function to make new button
    function createButton() {
        //empty button div to prevent repeat buttons
        $("#buttons").empty();
        //create buttons and give attributes
        for (var i = 0; i < topics.length; i++) {
            var newbutton = $("<button>");
            newbutton.addClass("herobtn");
            newbutton.attr("data-name", topics[i]);
            newbutton.text(topics[i]);
            $("#buttons").append(newbutton);
        }
    }
    //function to display gifs
    function displayGif() {
    	$(".herogifs").empty();
        var apikey = "dc6zaTOxFJmzC";
        var typedhero = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + typedhero + "&limit=10&api_key=" + apikey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);
            //run for loop to create hero div to appear with rating
            //and img
            for (var i = 0; i < 10; i++) {
                var herodiv = $("<div class = hero>");
                var rating = response.data[i].rating;
                var prating = $("<p class = rating>").text("Rating: " + rating);
                herodiv.prepend(prating);
                var herogifstill = $("<img class = heroimg>").attr("src", response.data[i].images.fixed_width_still.url).val(i);   
                herodiv.prepend(herogifstill);
                $(".herogifs").append(herodiv);
            }
            //change img src on buuton click to toogle between 
            //still and animated img
            $(".heroimg").on("click", function(event) { 
                if (animate == 0){ 
                    $(this).attr("src", response.data[this.value].images.fixed_width.url);
                    animate++
                }else{
                    $(this).attr("src", response.data[this.value].images.fixed_width_still.url);
                    animate--
                }
            });
   
            
        });
    };
    //fire displaygif function when hero button is clicked
    $(document).on("click", ".herobtn", displayGif); 				
});