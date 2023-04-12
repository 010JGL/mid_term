/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
//const bcrypt = require("bcrypt");
const userQueries = require('../db/queries/users');

router.get('/login', (req, res) => {
  if(req.session.userId){
    return res.send('You\'re already logged in!');
  }
  res.render('users_login');
});

router.post('/login', (req, res) => {


  const email = req.body.email;
  const password = req.body.password;

  userQueries.findUserByEmail(email).then(data => {
    if (!data[0]) {
      return res.send('Error: That e-mail is not in our database! Please sign up first.');
    }

    if (password != data[0].password) {
      return res.send('Error: Your password is incorrect!');
    }

    req.session.userId = data[0].id;

    res.send({
      user: {
        id: data[0].id,
        name: data[0].name,
        email: email,
        password: password,
        role: data[0].role
      }
    });

    res.render('listings_index');
  });
});

router.get('/sign_up', (req, res) => {
  if(req.session.userId){
    return res.send('Error: You\'re already logged in!');
  }
    res.render('users_sign_up');
});

router.post('/sign_up', (req, res) => {
  user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.admin
  }

  userQueries.findUserByEmail(user.email).then(data => {
    if (data[0]) {
      return res.send('Error: That e-mail is not in our database! Please sign up first.');
    }
  });

  userQueries.addUser(user).then(data => {

    req.session.userId = data[0].id;
    res.render('index');
  });

});

router.post('/logout', (req, res) => {
  req.session.userId = null;
  res.send({});
  res.render('listings_index');
});

router.get('/favorites', (req, res) => {
  res.render('user_favorites');
});

router.get('/my_listings', (req, res) => {
  res.render('my_listings');
});

module.exports = router;
