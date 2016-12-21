var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var Phrases = require('./../models/Phrases');
var UrlUtility = require('./../Utility/UrlUtility');
var Response = require('./../dto/APIResponse');

 //GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var postPhrasesRoute = router.route('/addPhrase');
var getAllPhrasesRoute = router.route('/getAllphrases');
var utility = new UrlUtility(
    {
    });
// Connection URL. This is where your mongodb server is running.
var url =utility.getURL();
mongoose.connect(url, function (err, db) {
    if(err)
    {
        console.log("Failed to Connect to MongoDB");
    }
    else {
        console.log("Successfully Connected");
    }
});

postPhrasesRoute.post(function(req, res) {
    // Create a new instance of the Beer model
    var phrases = new Phrases();
    var response = new Response();
    var date = new Date();
    // Set the beer properties that came from the POST data
    phrases.phraseText = req.body.phraseText;
    phrases._blockId = req.body._blockId;
    phrases.createdOnUTC = date;
    phrases.updatedOnUTC = date;
    phrases.isDeleted = false; 
    console.log(phrases);
    // Save the beer and check for errors
    phrases.save(function(err) {
        if (err) {
            res.send(err);
        }
        else {
            response.data = phrases;
            response.message = "Success";
            response.code = 200;
            res.json(response);
            console.log('done');
        }
    });
});

getAllPhrasesRoute.get(function (req, res) {
    // Create a new instance of the Beer model
    var response = new Response();
    // Save the beer and check for errors
    
    Phrases.find({}, null, { sort: { '_id': -1 } }, function (err, phrases) {
        if (err)
        {
            res.send(err);
        }
        else
        {
            response.message = "Success";
            response.code = 200;
            response.data = phrases;
            res.json(response);
        }
    });
});
module.exports = router;


