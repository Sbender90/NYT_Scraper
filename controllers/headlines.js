var scrape = require('../scripts/scrape');
var makeDate = require("../scripts/date");

var Headline = require("../models/Headline");

module.exports = {
    fetch: function(callBack) {
        scrape(function(data) {
            var articles = data;
            for (var i=0; i < articles.length; i++) {
                articles[i].date = makeDate();
                articles[i].saves = false;
            }

            Headline.collection.insertMany(articles, {ordered: false}, function(err, docs) {
                callBack(err, docs);
            });
        });
    },
    delete: function(query, callBack) {
        Headline.remove(query, callBack);
    },
    get: function(query, callBack) {
        Headline.find(query)
        .sort({
            _id: -1
        })
        .exec(function(err, doc) {
            callBack(doc);
        });
    },
    update: function(query, callBack) {
        Headline.update({_id: query._id}, {
            $set: query
        }, {}, callBack);
    }
}