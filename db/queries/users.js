const db = require('../connection');
const users = require('../connection');
const shoes = require('../connection');
const favorites = ('../connection');
// might have to import ou tables

const { Pool } = require('pg');
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

//////////  FUNCTIONS  //////////
// TODO: line 165


// Get all the listings functions
const getAllTheListings = () => {
  return pool
    .query(`SELECT * FROM shoes;`)
    .then((result) => {
      console.log('result:', result);
      return result.rows;
    })
    .catch((err) => {
      console.log('add user error;', err.message);
      return null;
    });
};

// Get the featured     set to random limit 5 -We should modify limit amount to what looks best with the interface
const getFeatured = () => {
  return pool
    .query(`SELECT * FROM shoes ORDER BY RANDOM() LIMIT 5;`)
    .then((result) => {
      console.log('result:', result);
      return result.rows;
    })
    .catch((err) => {
      console.log('add user error;', err.message);
      return null;
    });
};

// add to favorite
const addToFavorites = (userId, shoeId) => {
  const loggedUser = userId;
  const newFav = [shoeId];

  pool.query(`SELECT shoes_id FROM favorites WHERE favorites.user_id = $1;`, [loggedUser])
    .then((result) => {
      console.log('result.rows', result.rows);
      if (result.rows !== newFav) {
        pool
          .query(`INSERT INTO favorites (user_id, shoes_id) VALUES ($1, $2);`, [newFav, loggedUser])
          .then((result) => {
            console.log('result:', result);
            return result.rows;
          })
          .catch((err) => {
            console.log('add user error;', err.message);
            return null;
          });
      }
      pool
        .catch((err) => {
          console.log('These shoes are already in favorites!', err.message);
          return null;
        });
    });
};
//addToFavorites(1, 3);


// Get favorites with user ID          SELECT ALL FAV for a user ID
const getFavoritesWithId = (id) => {
  const loggedUser = id;
  //console.log('loggedUser:', loggedUser);
  return pool
    .query(`SELECT shoes_id FROM favorites WHERE favorites.user_id = $1;`, [loggedUser])
    .then((result) => {
      console.log('result:', result);
      return result.rows;
    })
    .catch((err) => {
      console.log('add user error;', err.message);
      return null;
    });
};
//getFavoritesWithId(3);

// Get our listing page         SELECT ALL from shoes idk what is best to show for listing, might modify it
const getOurListings = (id) => {
  const loggedUser = id;
  console.log('loggedUser:', loggedUser);
  return pool
    .query(`SELECT * FROM shoes WHERE seller_id = $1;`, [loggedUser])
    .then((result) => {
      console.log('result:', result);
      return result.rows;
    })
    .catch((err) => {
      console.log('add user error;', err.message);
      return null;
    });
};

// Filter by price ASC
const filterByAsc = () => {
  return pool
    .query(`SELECT * FROM shoes ORDER BY price ASC;`)
    .then((result) => {
      console.log('result:', result);
      return result.rows;
    })
    .catch((err) => {
      console.log('add user error;', err.message);
      return null;
    });
};

// Filter by price DESC
const filterByDesc = () => {
  return pool
    .query(`SELECT * FROM shoes ORDER BY price DESC;`)
    .then((result) => {
      console.log('result:', result);
      return result.rows;
    })
    .catch((err) => {
      console.log('add user error;', err.message);
      return null;
    });
};

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
//writeMessage(2, 3, 1);  works in theory, need to be tested


// show the messages (should show messages associated with the shoe_id / dont just show all the messages in one place)
// When you click my listings, you can see your items. If you click on an item you should see messages associated with it

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


// add a listing     /// have to input seller_id in here ///
const addListing = (shoe, sellerId) => {
  const currentUser = sellerId;
  const values = [shoe.gender, shoe.price, shoe.brand, shoe.size, currentUser, shoe.image_url, shoe.is_sold, shoe.description];
  return pool
    .query(`INSERT INTO shoes (gender, price, brand, size, seller_id, image_url, is_sold, description) VALUES ($1, $2, $3, 4$, 5$, 6$, 7$, $8) RETURNING *;`, values)
    .then((result) => {
      console.log('result:', result);
      return result.rows;
    })
    .catch((err) => {
      console.log('add user error;', err.message);
      return null;
    });
};

// Create a new user
const addUser = (user) => {
  const values = [user.name, user.email, user.password, user.role];
  return pool
    .query(`INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, 4$) RETURNING *;`, values)
    .then((result) => {
      console.log('result:', result);
      return result.rows;
    })
    .catch((err) => {
      console.log('add user error;', err.message);
      return null;
    });
};

// Mark the item as sold
const markSold = (id) => {
  const shoeId = [id];
  return pool
    .query(`UPDATE shoes SET is_sold = true WHERE id = $1;`, [shoeId])
    .then((result) => {
      console.log('result:', result);
      return result.rows;
    })
    .catch((err) => {
      console.log('add user error;', err.message);
      return null;
    });
};



//remove items from the site
const removeListing = (shoeId) => {
  const shoeToRemove = shoeId;
  return pool
    .query(`DELETE FROM shoes WHERE shoes.id = $1`, [shoeToRemove])
    .then((result) => {
      console.log('result:', result);
      return result.rows;
    })
    .catch((err) => {
      console.log('add user error;', err.message);
      return null;
    });
};


module.exports = { getAllTheListings, getFeatured, getFavoritesWithId, getOurListings, filterByAsc, filterByDesc, showMessagesForListing, addListing, addUser, markSold, addToFavorites, removeListing, writeMessage };


////// This was already in the folder /////

// const getUsers = () => {
//   return db.query('SELECT * FROM users;')
//     .then(data => {
//       return data.rows;
//     });
// };

// module.exports = { getUsers };
