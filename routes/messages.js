const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('messages');
});

router.get('/new', (req, res) => {
  res.render('new_message');
});

router.post('/new', (req, res) => {
  //redirect to listing of item related to message or back to messages?
});

module.exports = router;
