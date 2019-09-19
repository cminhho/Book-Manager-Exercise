var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var genreSchema = new Schema({
  _id: {type: mongoose.Schema.ObjectId, auto: true},
  __v: {type: Number, select: false},
  title: String,
  author: String,
  publicationDate: String
},
{
  timestamps: true
});

genreSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
genreSchema.set('toJSON', {
    virtuals: true
});

var Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;