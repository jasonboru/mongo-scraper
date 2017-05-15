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

});
