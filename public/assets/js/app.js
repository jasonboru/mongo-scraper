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

  $(".save-article").click(function() {
      var articleToSave = {};
      articleToSave.id = $(this).data("id");
      articleToSave.saved = true;
      $.ajax({
          method: "PATCH",
          url: "/api/articles",
          data: articleToSave
      }).then(function(data) {
          location.reload();
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

  $('.saved-buttons').on('click',  function () {
      // the NEWS article id
      var thisId = $(this).data("id");

      //attach news article _id to the save button in the modal for use in save post
      $("#saveButton").attr({"data-value": thisId});

      //make an ajax call for the notes attached to this article
      $.get("/notes/" + thisId, function(data){
          console.log(data);
          //empty modal title, textarea and notes
          $('#noteModalLabel').empty();
          $('#notesBody').empty();
          $('#notestext').val('');

          //delete button for individual note

          //add id of the current NEWS article to modal label
          $('#noteModalLabel').append(' ' + thisId);
          //add notes to body of modal, will loop through if multiple notes
          for(var i = 0; i<data.note.length; i++) {
              var button = ' <a href=/deleteNote/' + data.note[i]._id + '><button type="button" class="btn btn-danger">Delete</button></a>';
              $('#notesBody').append('<li>' + data.note[i].body + '  ' + button + '</li>');
          }
      });
  });

// When you click the savenote button
  $(".savenote").click(function() {
  // Grab the id associated with the article from the submit button
    var thisId = $(this).data("id");


  // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/notes/" + thisId,
      data: {
        // Value taken from title input

        // Value taken from note textarea
        body: $("#notestext").val().trim()
      }
    })
      // With that done
    .done(function(data) {
        // Log the response
        //console.log(data);
        $('#noteModal').modal('hide');

    });
  });
});
