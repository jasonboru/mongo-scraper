var scrape = require("../scripts/scrape");
var Article = require("../models/Article");
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


};
