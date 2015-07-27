'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosastic = require('mongoosastic');
var elasticsearch = require('elasticsearch');

var companySchema = new Schema({
    name: {type: String, es_boost: 2.0,es_indexed:true, required: true},
    information: {type: String, es_boost: 2.0,es_indexed:true},
    city: {type: String, es_boost: 2.0,required: true,es_indexed:true},
    sector: {type: String, es_boost: 2.0,es_indexed:true},
    email: {type: String, es_boost: 2.0,es_indexed:true},
    address: {type: String, es_boost: 2.0,es_indexed:true},
    websiteUrl: {type: String, es_boost: 2.0,es_indexed:true},
    phone: {type: String, es_boost: 2.0,es_indexed:true},
    imgUrl: {type: String, es_boost: 2.0,es_indexed:true},
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


