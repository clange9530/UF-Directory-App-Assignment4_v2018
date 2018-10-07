
/* Dependencies */
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial 
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */


/* Create a listing */
module.exports.create = function(req, res) {
  /* Instantiate a Listing */
  var listing = new Listing(req.body);
  /* save the coordinates (located in req.results if there is an address property) */
  if(req.results) {
    listing.coordinates = {
      latitude: req.results.lat, 
      longitude: req.results.lng
    };
  }
  /* Then save the listing */
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

/* Show the current listing */
module.exports.read = function(req, res) {
  res.json(req.listing);
  /* send back the listing as json from the request */
};

/* Update a listing */
module.exports.update = function(req, res) {
  /* Replace the article's properties with the new properties found in req.body */
  var props = req.body;
  var id = new mongoose.Types.ObjectId(req.params.listingID);
  Listing.findByIdAndUpdate({_id: id}, props, function(err, listing){
    if(err){
      res.status(404).send(err);
    } else {
      res.json(listing);
    }
  });
  /* save the coordinates (located in req.results if there is an address property) */
  
  /* Save the article */
};

/* Delete a listing */
module.exports.delete = function(req, res) {
  var id = new mongoose.Types.ObjectId(req.params.listingID);
  Listing.findByIdAndRemove(id, function(err, listing){
    if(err){
      res.status(404).send(err);
    } else {
      res.json(listing);
  }});
  /* Remove the article */
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
module.exports.list = function(req, res) {
  /* Your code here */
  console.log('Finding Listings');
  Listing.find({}, function(err, listing){
    if(err){
      res.status(404).send(err);
    } else {
      res.json(listing);
  }});
};


/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  HINT: Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
module.exports.listingByID = function(req, res, next, _id) {
  Listing.findById(_id, function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};