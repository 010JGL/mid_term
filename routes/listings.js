const express = require('express');
const { addListing, getAllTheListings, getFeatured, removeListing, getOurListings, markSold } = require('../db/queries/shoes');
const { pool } = require('../db/queries/pool');
const router = express.Router();
const { getFavoritesWithId } = require('../db/queries/favorites');
const { addToFavorites } = require('../db/queries/favorites');

// MOST SPECIFIC TO LESS SPECIFIC

// have to list all the shoes
router.get('/favorite', (req, res) => {

  const currentUser = req.session.userId;
  //console.log('req.session.userId:', req.session.userId)
  getFavoritesWithId(currentUser)
  .then(data => {
    const templateVars = { data, userId: currentUser };
    console.log('data',data);
    res.render('user_favorites', templateVars);
  })
});

router.get('/', (req, res) => {

  const templateVars = {
    userId: req.session.userId,
  };
  console.log(templateVars.userId);
  res.render('index', templateVars);
});

router.get('/new', (req, res) => {

  res.render('listings_new');
});



router.post('/new', (req, res) => {
  // if (!userId) {
  //   const box = `<div>You have to be logged in</div>`;
  //   return res.status(400).send(box);
  // }
  //redirect to listing upon submission
  // console.log('req.session.userId', req.session.userId);
  // console.log('req.body', req.body);
  const currentUser = req.session.userId;
  const newEntry = req.body;

  addListing(newEntry, currentUser)

  res.render('my_listings');
});

// router.get('/:id', (req, res) => {
//   res.render('listings_id');
// });

router.post('/favorite', (req, res) => {


});


router.post('/sold/:shoe_id', (req, res) =>{
  const {shoe_id} = req.params
  markSold(shoe_id)
  .then(result => {
    res.redirect('/listings/my_listings')
  })
});

router.post('/delete/:shoe_id', (req,res) => {
  const {shoe_id} = req.params
  removeListing(shoe_id)
  .then(result => {
    res.redirect('/listings/my_listings')
  })
})

router.get('/my_listings', (req, res) => {
  const currentUser = req.session.userId;
  //console.log('req.session.userId', req.session.userId)
  getOurListings(currentUser)
  .then(result => {
    const templateVars = {
      result,
      userId: req.session.userId,
    };
    // console.log('templateVars', templateVars)
    res.render('my_listings', templateVars);
  } )
});

// })
// router.post('/my_listings', (req, res) => {
//   const currentUser = req.session.userId;
//   //console.log('req.session.userId', req.session.userId)
//   getOurListings(currentUser)
//   .then(result => {
//     const templateVars = { data: result };
//     console.log('templateVars', templateVars)
//     res.render('my_listings', templateVars);
//   } )
// });

module.exports = router;




