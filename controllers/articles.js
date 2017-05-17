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
        articlesArr[i].note = [];
      }

      //filters the duplicate articles because the article model says the title must be unique
        Article.collection.insertMany(articlesArr, { ordered: false }, function(err, docs) {
          callback(err, docs);
        });
    });
  },
  get: function(query, cb) {
    //query is currently hardcoded to {saved: true}
    Article.find(query)
      .sort({
        _id: -1
      })
      .exec(function(err, doc) {
        //send saved articles back to routes to be rendered
        cb(doc);
      });
  },
  update: function(query, cb) {
    // saves or unsaves an article depending on the user query comes from the patch request in app.js
    Article.update({ _id: query.id }, {
      $set: {saved: query.saved}
    }, {}, cb);
  },
  addNote: function(query, cb) {
    Article.findOneAndUpdate({_id: query.id }, {
      $push: {note: query.note}
    }, {}, cb);
  }
};
