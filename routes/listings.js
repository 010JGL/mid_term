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
  //redirect to listing upon submission
  res.redirect('/:id');
});

router.get('/:id', (req, res) => {
  res.render('listings_id');
});

router.post('/favourite', (req, res) => {
  //redirect to listing or user favourites?
});

module.exports = router;
