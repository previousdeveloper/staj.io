/**
 * Created by gokhan on 3/26/15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosastic = require('mongoosastic');
var elasticsearch = require('elasticsearch');

var companySchema = new Schema({
    name: {type: String, es_boost: 2.0},
    information: {type: String, es_boost: 2.0},
    city: {type: String, es_boost: 2.0},
    sector: {type: String, es_boost: 2.0},
    email: {type: String, es_boost: 2.0},
    address: {type: String, es_boost: 2.0},
    websiteUrl: {type: String, es_boost: 2.0},
    phone: {type: String, es_boost: 2.0},
    imgUrl: String,
    created: {
        type: Date,
        default: Date.now
    }
});

// elastic search connection.
var esClient = new elasticsearch.Client({host: 'localhost:9200'});
companySchema.plugin(mongoosastic, {
    esClient: esClient
});


module.exports = mongoose.model('Company', companySchema);


