// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// My TimeStamp API endPoint 
app.get('/api/:string',(req,res)=> {

  console.log(req.params);
  
   let givenString = req.params.string;
   let validDate = Date.parse(givenString);
  
   if(validDate){
    let parsedDate = Date.parse(givenString)
    let givenutc = new Date(parsedDate).toGMTString()
    res.json({unix: parsedDate, utc: givenutc});
    }
    else if(new Date(givenString/1000.0*1000) > 0){
    let epochTime = givenString/1000.0;
    let myDate = new Date(epochTime * 1000);
    let datestringGMT = myDate.toGMTString();
  res.json({unix: Number(givenString), utc: datestringGMT});
    }
   
     
    else
    {
      res.json({error : "Invalid Date"})
    }

  });
// This API for Empty parameter 
  app.get('/api',(req,res)=> {
    console.log(req.params)


    let currentDate = new Date();
    let currentParsed = Date.parse(currentDate);
    let currentutc = currentDate.toGMTString();
    res.json({unix: currentParsed, utc: currentutc});
  });





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
