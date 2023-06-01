var mongoose = require('mongoose') ;
var {Schema} = mongoose ;

var SocialMediaSchema = new Schema({
    title : String,
    description : String,
    imageUrl : String,
    date : Date,
    time : String,
    bookmarked: {
        type: Boolean,
        default: false
      }
});

var socialMedia = mongoose.model('facebook', SocialMediaSchema) ;

module.exports = socialMedia ;