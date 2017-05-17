$(document).ready(function() {

  $(".scrape").click(function(event) {
      event.preventDefault();
      $.get("/api/fetch").then(function(data) {
          $(".articles").remove();
          $.get("/").then(function(){
              bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
          });
          //articles are coming in but user has to click home to see them. tried res.redirect("/"); here but did not work. find solution.
      });
  });

  $(".removeSaved").click(function() {
      var articleToremoveSaved = {};
      articleToremoveSaved.id = $(this).data("id");
      articleToremoveSaved.saved = false;
      $.ajax({
          method: "PATCH",
          url: "/api/articles",
          data: articleToremoveSaved
      }).then(function(data) {
          location.reload();
      });
  });

// When you click the savenote button
  $(".savenote").click(function() {
  // Grab the id associated with the article from the submit button
    var thisId = $(this).data("id");


  // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input

        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
    .done(function(data) {
        // Log the response
        //console.log(data);
        $('#noteModal').modal('hide');
        // Empty the notes section
      //  $("#notes").empty();
    });

    // Also, remove the values entered in the input and textarea for note entry
      //$("#titleinput").val("");
      //$("#bodyinput").val("");
  });
});
