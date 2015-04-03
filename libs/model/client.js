var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    Client = new Schema({
        name: {
            type: String,
            unique: true,
            required: true,
            default: 'client'
        },
        clientId: {
            type: String,
            unique: true,
            required: true,
            default: 'client'
        },
        clientSecret: {
            type: String,
            required: true,
            default: 'client'
        }
    });

module.exports = mongoose.model('Client', Client);
