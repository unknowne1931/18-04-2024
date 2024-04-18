const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
    user : String,
    pass : String,
});
 
module.exports = mongoose.model('Password', passwordSchema)