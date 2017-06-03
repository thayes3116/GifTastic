var topics = ["Thing", "Silver Surfer", "Captain America", "Thor", "Spiderman", "Batman", "Superman", "Wonder Woman", "Robin", "Green Lantern"];

//get the document ready
$(document).ready(function() {
    console.log("ready!");

    $("#addhero").on("click", function(event) {
        event.preventDefault();

        var hero = $("#newhero").val().trim()
            .toLowerCase();
        topics.push(hero);
        createButton();

    });

    function createButton() {

        $("#buttons").empty();

        for (var i = 0; i < topics.length; i++) {
            var newbutton = $("<button>");
            newbutton.addClass("herobtn");
            newbutton.attr("data-name", topics[i]);
            newbutton.text(topics[i]);
            $("#buttons").append(newbutton);
        }
    }

    function displayGif() {
    	$(".heorgifs").empty();
        var apikey = "dc6zaTOxFJmzC";
        var typedhero = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + typedhero + "&limit=10&api_key=" + apikey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);

            for (var i = 0; i < 10; i++) {
                var herodiv = $("<div class = hero>");
                var rating = response.data[i].rating;
                console.log(response.data[i]);

                var prating = $("<p class = rating>").text("Rating: " + rating);
                herodiv.prepend(prating);
                var herogifsrc = response.data[i].images.fixed_height_still.url;
                var herogif = $("<img>").attr("src", herogifsrc);
                herodiv.prepend(herogif);
                $(".herogifs").append(herodiv);
                
            }
        });
    };

    $(document).on("click", ".herobtn", displayGif);
    	createButton();
});