var scrape = require("../scripts/scrape");
var Article = require("../models/Article");
var Note = require("../models/Note");
var articlesController = require("../controllers/articles");
var notesController = require("../controllers/notes");

module.exports = function(router) {


  router.get("/", function(req, res) {
      Article.find({saved: false}, function(error, found) {
          if (error) {
              console.log(error);
          } else if (found.length === 0) {
              res.render("empty")
          } else {

            var hbsObject = {
                articles: found
            };
            res.render("index", hbsObject);

          }
      });
  });

  router.get("/api/fetch", function(req, res) {

      // scrapes articles and saves unique ones to database
      articlesController.fetch(function(err, docs) {
          //lets user know if there were new articles or not
          if (!docs || docs.insertedCount === 0) {
              res.json({message: "No new articles today. Check back tomorrow!"});
          }
          else {
              res.json({message: "Added " + docs.insertedCount + " new articles!"});

          }
      });
  });

  //retrieves the saved articles
  router.get("/saved", function(req, res) {

      articlesController.get({saved: true}, function(data) {

          var hbsObject = {
            articles: data
          };
          res.render("saved", hbsObject);
      });
  });

  //for saving or unsaving articles
  router.patch("/api/articles", function(req, res) {

      articlesController.update(req.body, function(err, data) {
          //this gets sent back to app.js and the article is either saved or unsaved
          res.json(data);
      });
  });

  router.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    console.log("**********************************************");
  console.log("**********what is req.body on note post********")
  console.log(req.body.body);
    console.log("***********************************************");
    var newNote = new Note(req.body);

    // And save the new note the db
    newNote.save(function(error, doc) {
      // Log any errors
      if (error) {
        console.log(error);
      }
      // Otherwise
      else {
        // Use the article id to find and update it's note
        Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
        // Execute the above query
        .exec(function(err, doc) {
          // Log any errors
          if (err) {
            console.log(err);
          }
          else {
            // Or send the document to the browser
            res.send(doc);
          }
        });
      }
    });
  });

};
