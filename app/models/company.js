/**
 * Created by gokhan on 3/26/15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companySchema = new Schema({
    name: String,
    information: String,
    city: String,
    sector: String,
    email: String,
    address: String,
    websiteUrl: String,
    phone: String,
    imgurl: String
});

module.exports = mongoose.model('Company', companySchema);


