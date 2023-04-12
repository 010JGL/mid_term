const express = require('express');
const { addListing, getAllTheListings, getFeatured, removeListing } = require('../db/queries/shoes');
const { pool } = require('../db/queries/pool');
const router = express.Router();

// have to list all the shoes
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
  // not sure if i can just transfert the whole info or seperate yet
  const setGender = newEntry.gender;
  const setPrice = newEntry.price;
  const setBrand = newEntry.brand;
  const setSize = newEntry.size;
  const setUrl = newEntry.image_url;
  const setDescription = newEntry.description;

  addListing(newEntry, currentUser)

  res.render('my_listings');
});

// router.get('/:id', (req, res) => {
//   res.render('listings_id');
// });

router.post('/favorite', (req, res) => {
  //redirect to listing or user favourites?
});

router.post('/sold', (req, res) => {
  res.render('my_listings')
});

router.post('/delete/:shoe_id', (req,res) => {
  const {shoe_id} = req.params
  removeListing(shoe_id)
  .then(result => {
    console.log("_________", shoe_id, result)
    res.render('my_listings')
  })
})

router.get('/my_listings', (req, res) => {
  
  res.render('my_listings');
});


module.exports = router;
