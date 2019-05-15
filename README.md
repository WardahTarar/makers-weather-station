# makers-weather-station

/api page will redirect user to /api/data

## Retrieve all data

**Api route: /api/data**

This route will send back a json object with all the data in the database
`http://localhost:3000/api/data`

Test from terminal with cURL:  
`curl http://localhost:3000/api/data`

## Retrieve n records

**Api route: data/:limit**

Send a post request like this: `http://localhost:3000/api/data/2`

## Insert data

### One record

**Api route: POST api/data**

Send a post request with a json to this api:

`http://localhost:3000/api/data`

```json
{
  "temperature": 10,
  "pressure": 10,
  "humidity": 10
}
```

Test with cURL

```
curl --header "Content-Type: application/json" \
 --request POST \
 --data '{
    "temperature": 55,
    "pressure": 55,
    "humidity": 55
  }' \
 http://localhost:3000/api/data
```

## Multiple records

**Api route: apo/data/bulkInsert**

`http://localhost:3000/api/data/bulkInsert`

Send a post request at this route with a json in this format:

```json
[
  {
    "temperature": 10,
    "pressure": 10,
    "humidity": 10
  },
  {
    "temperature": 10,
    "pressure": 10,
    "humidity": 10
  }
]
```

## Delete one record

**API route: /api/data/:id**

`http://localhost:3000/api/data/5cdb105fd98c191972d7e103`

## HTTP requests

- can use cURL (client for urls), to make one through the command line
- case use request package in node to send a request

```js
var request = require('request');
request('http://localhost:3000/api/data', function(error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
```
