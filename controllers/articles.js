var scrape = require("../scripts/scrape");
var Article = require("../models/Article");

module.exports = {
  fetch: function(callback) {

    scrape(function(data) {

      var articlesArr = data;
      // Make sure each article object has a date and is not saved by default
      for (var i = 0; i < articlesArr.length; i++) {
        articlesArr[i].date = new Date();
        articlesArr[i].saved = false;
      }

      //filters the duplicate articles because the article model says the title must be unique
        Article.collection.insertMany(articlesArr, { ordered: false }, function(err, docs) {
          callback(err, docs);
        });
    });
  }
};
