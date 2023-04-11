/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
//const legitUser = require('../queries/getUsers'); have to make getUsers
const database = require('../db/queries/users');


//This was already in the file as an example. It would retreive all users. Not sure if we need to have it for our site.

// router.get('/', (req, res) => {
//   res.render('users');
// });

router.get('/login', (req, res) => {
  res.render('users_login');
});

router.post('/login', (req, res) => {

  database.getUsers().then(data => {
    console.log(data)
  res.render('listings_index');
  })
});

router.get('/sign_up', (req, res) => {
  database.getAllTheListings().then(data =>{
    console.log(data)
    res.render('users_sign_up');
  })
});

router.post('/sign_up', (req, res) => {
  //console.log(req.params);
  res.render('listings_index');
});

router.post('/logout', (req, res) => {
  res.render('listings_index');
});

router.get('/favorites', (req, res) => {
  res.render('user_favorites');
});

router.get('/my_listings', (req, res) => {
  res.render('my_listings');
});

module.exports = router;
