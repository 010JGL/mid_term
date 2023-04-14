
const express = require('express');
const { showMessagesForItem, writeMessage, getSellerIdwithShoeId, } = require('../db/queries/messages');
const router  = express.Router();
const nodemailer = require('nodemailer');
const { findEmailById } = require('../db/queries/users');

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

router.post('/email', (req, res) => {

  // how to send an email  for gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sneakervaultlhl@gmail.com',
      pass: 'rogdwnenbagsptpn'
    }
  });
  const currentUser = req.session.userId;
  const currentSubject = req.body['your_subject'];
  const currentMessage = req.body['new-email']

  findEmailById(currentUser)

    .then((result) => {
      const currentUserEmail = result.email;
      //console.log('currentUserEmail', currentUserEmail)
      const mailOptions = {
        from: 'SneakerVaultLHL@gmail.com',
        to: currentUserEmail,
        subject: currentSubject,
        text: currentMessage
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.redirect('/messages')
        }
      })

    })


});


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
