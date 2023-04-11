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
  const userId = req.user_id;
  console.log('req.body', req.body);
  console.log('req.params', req.params);
  if (!userId) {
    const box = `<div>You have to be logged in</div>`;
    return res.status(400).send(box);
  }
  addListing(userId)
  res.redirect('/my_listings');
});

router.get('/:id', (req, res) => {
  res.render('listings_id');
});

router.post('/favourite', (req, res) => {
  //redirect to listing or user favourites?
});

module.exports = router;
