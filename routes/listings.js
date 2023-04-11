const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('listings_index');
});

//will need if statements to make sure user is loggedin in and has admin priveleges for these two routes

router.get('/new', (req, res) => {
  res.render('listings_new');
});


router.post('/new', (req, res) => {
  res.redirect('/:id');
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

module.exports = router;
