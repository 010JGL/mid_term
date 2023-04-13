
const express = require('express');
const { showMessagesForListing, showMessagesForItem } = require('../db/queries/messages');
const router  = express.Router();

router.get('/', (req, res) => {
  const currentUser = req.session.userId;
  console.log('currentUser',currentUser);

  showMessagesForItem(currentUser)

  .then(result => {
    const templateVars = { result }
    console.log('templateVars', templateVars)
    res.render('messages', templateVars);
  })

});

router.get('/new', (req, res) => {
  res.render('new_message');
});

router.post('/new', (req, res) => {
  //redirect to listing of item related to message or back to messages?
});

module.exports = router;
