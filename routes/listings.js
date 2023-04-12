const express = require('express');
const { addListing, getAllTheListings } = require('../db/queries/shoes');
const { getFavoritesWithId } = require('../db/queries/favorites');
const { pool } = require('../db/queries/pool');
const router = express.Router();
// MOST SPECIFIC TO LESS SPECIFIC

// have to list all the shoes
router.get('/favorite', (req, res) => {

  const currentUser = req.session.userId;
  console.log('req.session.userId:', req.session.userId)
  getFavoritesWithId(currentUser)
  .then(data => {
    const templateVars = { data };
    //console.log('data',data);
    res.render('user_favorites', templateVars);


  })
});

router.get('/', (req, res) => {

  // getFeatured()

  // pool
  // getAllTheListings()
  // .then((shoes) => res.send({ shoes }))

  // .catch((e) => {
  //   console.error(e);
  //   res.send(e);
  // });
  res.render('index');
});


//will need if statements to make sure user is loggedin in and has admin priveleges for these two routes

router.get('/new', (req, res) => {

  res.render('listings_new');
});



router.post('/new', (req, res) => {
  // if (!userId) {
  //   const box = `<div>You have to be logged in</div>`;
  //   return res.status(400).send(box);
  // }
  //redirect to listing upon submission
  console.log('req.session.userId', req.session.userId);
  console.log('req.body', req.body);
  const currentUser = req.session.userId;
  const newEntry = req.body;

  addListing(newEntry, currentUser)

  res.render('my_listings');
});


router.post('/favorite', (req, res) => {


});


router.post('/sold', (req, res) => {
  //mark item sold, redirect to where?
});

router.get('/:id', (req, res) => {
  console.log('problem error', req.params)
  res.render('listings_id');
});
module.exports =  router;
