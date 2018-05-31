var Note = require("../models/Note");
var makeDate = require("../scripts/date");

module.exports = {
    get: function(data, callBack) {
        Note.find({
            _headlineId: data._id
        }, callBack);
    },
    save: function(data, callBack) {
        var newNote = {
            _headlineId: data._id,
            date: makeDate(),
            noteText: data.noteText
        };

        Note.create(newNote, function (err, doc) {
            if(err) {
                console.log(err);
            }
            else {
                console.log(doc);
                callBack(doc);
            }
        });
    },
    delete: function(data, callBack) {
        Note.remove({
            _id: data._id
        }, callBack);
    }
};