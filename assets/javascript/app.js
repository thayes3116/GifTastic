var topics = ["Silver Surfer", "Captain America", "Thor", "Spiderman", "Batman", "Superman", "Wonder Woman", "Robin", "Green Lantern"];

var animate = 0;
//get the document ready
$(document).ready(function() {
    console.log("ready!");

    createButton();

    $("#addhero").on("click", function(event) {
        event.preventDefault();

        //Capture user input
        var hero = $("#newhero").val().trim()
            //prevent creation of empty buttons
            if(hero !== ""){
                //Add user input to array and fire function to make new button
                topics.push(hero);
                createButton();
            }
    });
    //function to make new button
    function createButton() {
        //empty button div to prevent repeat buttons
        $("#buttons").empty();

        for (var i = 0; i < topics.length; i++) {
            var newbutton = $("<button>");
            newbutton.addClass("herobtn");
            newbutton.attr("data-name", topics[i]);
            newbutton.text(topics[i]);
            $("#buttons").append(newbutton);
        }
    }




// }    		
    function displayGif() {
    	$(".herogifs").empty();
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
                var prating = $("<p class = rating>").text("Rating: " + rating);
                herodiv.prepend(prating);
                var herogifsrcstill = response.data[i].images.fixed_width_still.url;
                //var herogifsrc = response.data[i].images.fixed_width.url;
                var herogifstill = $("<img class = heroimg>").attr("src", herogifsrcstill).val(i);
                    
                herodiv.prepend(herogifstill);
                $(".herogifs").append(herodiv);
}
            
            $(".heroimg").on("click", function(event) {
                    event.preventDefault();
                    
                if (animate == 0){ 
                    //console.log("heroimg click");
                    //console.log(this.value)
                    var imgvalue = this.value;
                    //console.log(imgvalue)
                    $(this).attr("src", response.data[imgvalue].images.fixed_width.url);
                    animate++
                    console.log(animate);
                }else{
                    var imgvalue = this.value;
                    $(this).attr("src", response.data[imgvalue].images.fixed_width_still.url);
                    animate--
                    console.log(animate);
                }
                });
   
            
        });
    };

    $(document).on("click", ".herobtn", displayGif);

   


   				
});