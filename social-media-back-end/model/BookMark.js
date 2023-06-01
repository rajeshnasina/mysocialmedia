var mongoose = require('mongoose') ;
var {Schema} = mongoose ;

var BookMarkSchema = new Schema({
    title : String,
    description : String,
    imageUrl : String,
    date : Date,
    time : String
})

var BookMark = mongoose.model('bookmarks',BookMarkSchema) ;

module.exports = BookMark ;