const { Schema, model } = require('mongoose')

let anticaps = new Schema({
    Guild: String,
    Channel: String,
    AllowedUsers: Array
});

module.exports = model('anticaps1902903487234', anticaps);