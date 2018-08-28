var key = "bd6clIioYnNPIJXuTHnBqevN42Y5O6Gz";
var numPrint = 2;
var gifList = ["tree", "sunbear", "rick and morty"];
var inSearch = "test"
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + inSearch + "&limit=" + numPrint + "&api_key=" + key;


$("#test").html("test");
// "GET" data from api
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {

    // display info based on
    for (i = 0; i < response.data.length; i++) {
        console.log(response.data);
        var gifDiv = $('<div class="gifs">');
        var gifRating = response.data[i].rating;
        var pRating = $("<p>").text("Rating: " + gifRating);
        gifDiv.append(pRating);

        var gifUrl = response.data[i].images.fixed_height.url;
        var gifGif = $("<img>");
        gifGif.attr("src", gifUrl);
        gifGif.attr("alt", "test");
        $("#test").append(gifGif);
    };
});

// function to render button on call

function renderButtons() {
    $("#buttonPlace").empty();
    for (var i = 0; i < gifList.length; i++) {
        var a = $("<button>");
        a.addClass("gifBtn");
        a.attr("dataName", gifList[i]);
        a.text(gifList[i]);
        $("#buttonPlace").append(a);
    }
}
// add new button and push back entry to array
$("#addGif").on("click", function (event) {
    event.preventDefault();
    var gif = $("#gifInput").val().trim();
    gifList.push(gif);
    renderButtons();
});





renderButtons();