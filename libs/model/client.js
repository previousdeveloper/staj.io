var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    Client = new Schema({
        name: {
            type: String
        },
        clientId: {
            type: String
        },
        clientSecret: {
            type: String
        }
    });

module.exports = mongoose.model('Client', Client);
