// grab the mongoose module
var mongoose = require('mongoose');

// define our estate model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Estate', {
    name : {type : String, default: ''},
    type : {type : String, default: ''},
    price : {type : Number, default: 0}
});
