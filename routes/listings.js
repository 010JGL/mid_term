const express = require('express');
const { addListing } = require('../db/queries/shoes');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('listings_index');
});

//will need if statements to make sure user is loggedin in and has admin priveleges for these two routes

router.get('/new', (req, res) => {

  res.render('listings_new');
});



router.post('/new', (req, res) => {
  //redirect to listing upon submission
  console.log('req.session.userId', req.session.userId);
  console.log('req.body', req.body);
  const currentUser = req.session.userId;
  const newEntry = req.body;
  // not sure if i can just transfert the whole info or seperate yet
  const setGender = newEntry.gender;
  const setPrice = newEntry.price;
  const setBrand = newEntry.brand;
  const setSize = newEntry.size;
  const setUrl = newEntry.url;
  const setDescription = newEntry.description;

  addListing(newEntry, )

  // if (!userId) {
  //   const box = `<div>You have to be logged in</div>`;
  //   return res.status(400).send(box);
  // }
  res.redirect('/my_listings');
});

router.get('/:id', (req, res) => {
  res.render('listings_id');
});

router.post('/favorite', (req, res) => {
  //redirect to listing or user favourites?
});

router.post('/sold', (req, res) => {
  //mark item sold, redirect to where?
});

module.exports =  router;
