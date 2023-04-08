/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// router.get('/', (req, res) => {
//   res.render('users');
// });

router.get('/login', (req, res) => {
  res.render('users_login');
});

router.post('/login', (req, res) => {
  res.render('listings_index');
});

router.get('/sign_up', (req, res) => {
  res.render('users_sign_up');
});

router.post('/sign_up', (req, res) => {
  res.render('listings_index');
});

router.post('/logout', (req, res) => {
  res.render('listings_index');
});

module.exports = router;
