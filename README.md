# staj.io
Türkiyede stajyer alan firmaların bilgileri listeleyen bir servistir.




### Staj
[![Build Status](https://magnum-ci.com/status/962be120e085cfec6a6660ce3d5202f7.png)](https://magnum-ci.com/projects/2624)   [![Gittip](http://img.shields.io/gratipay/previousdeveloper.svg)](https://www.gittip.com/previousdeveloper/)
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)


## Run server

### Install Node Module Dependencies
Install all the Node dependencies listed in package.json run the following command in Terminal

    npm install



### Start MongoDB

Step 1: if exist Remove lock file.
sudo rm /var/lib/mongodb/mongod.lock

Step 2: Repair mongodb.
mongod --repair 

Step 3: start mongodb.
sudo start mongodb 

### Setup ElastichSearch
http://www.elastic.co/guide/en/elasticsearch/reference/current/setup.html

### RUN SERVER 

To run server execute:
```
node bin/www
```


## The API Endpoints

### GET api/v1
Check api is working if user authenticated

### POST api/v1/signup
Sign Up

``` js
username ='sampleUser'
password ='samplePassword'
name='name'
email='email@test.com'
```

### GET api/v1/user
Get user information if user authenticated.
``` js
Authorization: Bearer 7yr8KHwufOc0po+0qkwE6z+l
```

### POST api/v1/updateInformation
Change user information if user authenticated.
``` js
email='email2@test.com'
```


### POST api/v1/oauth/token
Creating access tokens:
``` js
client_id ='client'
client_secret ='client'
grant_type='password'
username='sampleUser'
password='samplePassword'
```

### GET api/v1/company
Getting all company list.


### GET api/v1/company?page=1
Pagining company list


### GET api/v1/sector/:sector
Find sector based company

### GET api/v1/city/:city
Find city based company

### POST api/v1/search
``` js
q='elastichsearchbased'
```



## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
