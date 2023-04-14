
const express = require('express');
const { showMessagesForItem, writeMessage, getSellerIdwithShoeId, } = require('../db/queries/messages');
const router  = express.Router();

router.get('/', (req, res) => {
  const currentUser = req.session.userId;
  //console.log('currentUser',currentUser);

  showMessagesForItem(currentUser)

  .then(result => {
    const templateVars = { result, userId: currentUser  }
    //console.log('templateVars', templateVars)
    res.render('messages', templateVars);
  })

});

router.get('/new', (req, res) => {
  const currentUser = req.session.userId;
  const templateVars = { userId: currentUser  }
  res.render('new_message', templateVars);
});

// router.get('/messages', (req, res) => {

//     res.redirect('/');

// });


//redirect to listing of item related to message or back to messages?
router.post('/new', (req, res) => {
  const currentUser = req.session.userId;
  //console.log('req.body', req.body)
  const newMessage = req.body['new-message'];
  const shoeId = req.body['shoe-id'];

  getSellerIdwithShoeId(shoeId)
  .then((result) => {
    const receiverId = result.seller_id;
    writeMessage(shoeId, newMessage, currentUser, receiverId)
    .then(() => {
      res.redirect('/messages')
    })
  })
  .catch((err) => {
    console.log('Cant write the new mesage;', err.message);
    return null;
  });

});

module.exports = router;
