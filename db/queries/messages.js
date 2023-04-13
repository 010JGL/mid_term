const { pool } = require('./pool.js')


const getSellerIdwithShoeId = (id) => {
  const shoeId = id;
  console.log('shoeId', shoeId)
  return pool
  .query(`SELECT shoes.seller_id FROM shoes WHERE shoes.id = $1;`, [shoeId])
  .then((result) => {
    console.log('result:', result);
    return result.rows[0];
  })
  .catch((err) => {
    console.log('Cannot get the seller_id;', err.message);
    return null;
  });
}
//Write a message to a user with a shoe_id
// how to get timestamp
const writeMessage = (shoeId, message, senderId, receiverId) => {
  //gotta import shoeId from a func
  const currentShoe = shoeId;
  const sender = senderId; // current user
  const receiver = receiverId;
  const content = message;
  const timestamp = Date.now();
  console.log('timestamp', timestamp);

  return pool
    .query(`INSERT INTO messages (shoe_id, message, date, sender_id, receiver_id) VALUES ($1, $2, to_timestamp($3), $4, $5) RETURNING *;`, [currentShoe, content, (timestamp / 1000.0), sender, receiver])
    .then((result) => {
      console.log('result:', result);
      return result.rows[0];
    })
    .catch((err) => {
      console.log('Add message error;', err.message);
      return null;
    });
};

// show the messages (should show messages associated with the shoe_id / dont just show all the messages in one place)
// When you click my listings, you can see your items. If you click on an item you should see messages associated with it
//SHOULD BE CAHNGE FOR SPECIFIC ID

///////////// NOT USING THIS ONE RIGHT NOW //////////////
// const showMessagesForListing = (userId, shoeId) => {
//   const currentUser = userId;
//   //const currentShoes = shoeId;   NOT USING IT FOR NOW
//   return pool
//     .query(`SELECT role FROM users WHERE users.id = $1;`, [currentUser])
//     .then((result) => {
//       console.log('result:', result);
//       if (result.rows === 'admin') {
//         // show admin/seller side logic
//         pool
//           .query(`SELECT shoes.id, messages.message, messages.date, users.name FROM messages JOIN shoes ON shoe_id = shoes.id JOIN users ON sender_id = users.id WHERE users.id = $1 OR receiver_id = $1 ORDER BY date;`, [currentUser]);

//       } else {
//         // show user/buyer side logic
//         pool
//           .query(`SELECT shoes.id, messages.message, messages.date, users.name FROM messages JOIN shoes ON shoe_id = shoes.id JOIN users ON receiver_id = users.id WHERE users.id = $1 OR sender_id = $1 ORDER BY date;`, [currentUser]);
//       }
//     })
//     .catch((err) => {
//       console.log('add user error;', err.message);
//       return null;
//     });

// };
// maybe we can modify to include the shoe id in reference
// Add a scss file for the display here
// we could show the item up top in a box
const showMessagesForItem = (userId, shoeId) => {
  const currentUser = userId;
  return pool
    .query(`SELECT shoes.id, messages.message, messages.date, users.name FROM messages JOIN shoes ON shoe_id = shoes.id JOIN users ON sender_id = users.id WHERE users.id = $1 OR receiver_id = $1 ORDER BY date;`, [currentUser])
    .then((result) => {
      console.log('result:', result);
      return result.rows;
    })
    .catch((err) => {
      console.log('add user error;', err.message);
      return null;
    });
};

module.exports = { writeMessage, showMessagesForItem, getSellerIdwithShoeId }
