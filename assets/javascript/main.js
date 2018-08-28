var gifList = ["tree", "sunbear", "rick and morty"];

function displayGifCombo() {
    $("#test").html("test");
    var key = "bd6clIioYnNPIJXuTHnBqevN42Y5O6Gz";
    var numPrint = 5;
    var inSearch = $(this).attr("dataName");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + inSearch + "&limit=" + numPrint + "&api_key=" + key;

    // "GET" data from api
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // display info based on
        for (var i = 0; i < response.data.length; i++) {
            console.log(response.data);
            var gifDiv = $('<div class="gifHolder">');
            var gifRating = response.data[i].rating;
            var pRating = $("<p>").text("Rating: " + gifRating);
            gifDiv.append(pRating);
            var gifUrlStill = response.data[i].images.fixed_height_small_still.url;
            var gifUrl = response.data[i].images.fixed_height_small.url;
            var gifImg = $("<img>").attr("src", gifUrl);
            gifImg.attr("data-still", gifUrlStill);
            gifImg.attr("data-animate", gifUrl);
            gifImg.attr("data-state", "still")
            gifImg.attr("class", "gifs");
            gifDiv.append(gifImg);
            $("#test").prepend(gifDiv);
        }
    });
};

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

// pause gif
$(".gifs").on("click", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});

$(document).on("click", ".gifBtn", displayGifCombo);
renderButtons();