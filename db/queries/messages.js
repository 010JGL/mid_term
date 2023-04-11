const { pool } = require('./pool.js')

//Write a message to a user with a shoe_id

const writeMessage = (shoeId, senderId, receiverId) => {
  const currentShoe = shoeId;
  const sender = senderId; // current user
  const receiver = receiverId;
  const content = 'message content';
  const timestamp = '2023-04-22 23:11:32';

  return pool
    .query(`INSERT INTO messages (shoe_id, message, date, sender_id, receiver_id) VALUES ($1, $2, $3, $4, $5);`[currentShoe, content, timestamp, sender, receiver])
    .then((result) => {
      console.log('result:', result);
      return result.rows;
    })
    .catch((err) => {
      console.log('add user error;', err.message);
      return null;
    });
};

// show the messages (should show messages associated with the shoe_id / dont just show all the messages in one place)
// When you click my listings, you can see your items. If you click on an item you should see messages associated with it
//SHOULD BE CAHNGE FOR SPECIFIC ID
const showMessagesForListing = (userId, shoeId) => {
  const currentUser = userId;
  //const currentShoes = shoeId;   NOT USING IT FOR NOW
  return pool
    .query(`SELECT role FROM users WHERE users.id = $1;`, [currentUser])
    .then((result) => {
      console.log('result:', result);
      if (result.rows === 'admin') {
        // show admin/seller side logic
        pool
          .query(`SELECT shoes.id, messages.message, messages.date, users.name FROM messages JOIN shoes ON shoe_id = shoes.id JOIN users ON sender_id = users.id WHERE users.id = $1 OR receiver_id = $1 ORDER BY date;`, [currentUser]);
      } else {
        // show user/buyer side logic
        pool
          .query(`SELECT shoes.id, messages.message, messages.date, users.name FROM messages JOIN shoes ON shoe_id = shoes.id JOIN users ON receiver_id = users.id WHERE users.id = $1 OR sender_id = $1 ORDER BY date;`, [currentUser]);
      }
    })
    .catch((err) => {
      console.log('add user error;', err.message);
      return null;
    });

};

module.exports = { writeMessage, showMessagesForListing }
