process.env.NODE_ENV = 'test';

var BASE_URL = "http://localhost:3000/api/v1";
var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest(BASE_URL);

var TOKEN = null;

beforeEach(function () {
});

describe('GET /getAllCompany', function () {
    it('should get AllCompanyList', function (done) {
        api.get('/getAllCompany')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /getTotalUser', function () {
    it('should get TotalUser', function (done) {
        api.get('/backend/getTotalUser')
            .expect(401, done);
    });
});


describe('POST /signUp', function () {
    it('should have same username', function (done) {
        api.post('/signUp')
            .set('Accept', 'application/x-www-form-urlencoded').send({
                username: "sampleUsername",
                password: "samplePassword"
            })
            .expect('Content-Type', /json/)
            .expect(200).end(function (err, res) {
                expect(res.body).to.not.equal(null);
                expect(res.body.data).to.equal('User already exists!');
                done();
            });
    });
});


describe('POST /signUp', function () {
    var randomNumber = Math.floor((Math.random() * 500) + 1);

    it('should have different username', function (done) {
        api.post('/signUp')
            .set('Accept', 'application/x-www-form-urlencoded').send({
                username: "sampleUsername" + randomNumber,
                password: "samplePassword"
            })
            .expect('Content-Type', /json/)
            .expect(200).end(function (err, res) {
                expect(res.body).to.not.equal(null);
                expect(res.body.data).to.equal('sampleUsername' + randomNumber);
                done();
            });
    });
});


describe('GET /getSectorAndCity/bilisim/istanbul', function () {
    it('should get AllCompanyList', function (done) {
        api.get('/getAllCompany')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});


describe('POST /Get Access Token', function () {
    it('should have one access token', function (done) {
        api.post('/oauth/token')
            .set('Accept', 'application/x-www-form-urlencoded').send({
                username: 'sampleUsername',
                password: 'samplePassword',
                grant_type: 'password',
                client_id: 'client',
                client_secret: 'client'
            })
            .expect('Content-Type', /json/)
            .expect(200).end(function (err, res) {
                TOKEN = res.body.access_token;
                expect(res.body).to.not.equal(null);
                expect(res.body.token_type).to.equal('Bearer');
                done();
            });
    });
});



