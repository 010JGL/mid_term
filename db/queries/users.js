const db = require('../connection');
const users = require('../connection');
const shoes = require('../connection');
// might have to import ou tables

const { Pool } = require('pg');
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

//////////  FUNCTIONS  //////////
// TODO: line 47 157


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

// add to favorite         like this im overwriting the list with the new shoe, we want to push data to the existing list
const addToFavorites = (id, shoe_id) => {
  const loggedUser = id;
  const newFav = [shoe_id];

  return pool
    .query(`SELECT * FROM favorites WHERE favorites.user_id = $1;`, [loggedUser])
  // need an IF condition : if user_id already exist, console.log error if not create it
  // if (newFav !== shoes_id) {
  // }
  .query(`INSERT favorites WHERE user_id = users.id SET list = $1`, newFav)
  .then((result) => {
    console.log('result:', result);
    return result.rows;
  })
  .catch((err) => {
    console.log('add user error;', err.message);
    return null;
  });

};
//addToFavorites(3);

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

const writeMessage = (shoe_id, sender_id, receiver_id) => {
  const currentShoe = shoe_id;
  const sender = sender_id; // current user
  const receiver = receiver_id;
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

// if we are admin we see seller side if we are user we see user side?
const showMessagesForListing = (user_id, shoe_id) => {
  const currentUser = user_id;
  const currentshoes = shoe_id;
  return pool
    .query(`SELECT role FROM users WHERE users.id = $1;`, [currentUser])
    .then((result) => {
      console.log('result:', result);
      // if (result.rows === 'admin') {
      //   // show seller side logic
      //   .query(`SELECT * FROM messages JOIN users ON sender_id = users.id WHERE users.id = $1 ORDER BY date;`, [currentUser])
      // } else {
      //   // show user side logic
      //   //
      // }
    })
    .catch((err) => {
      console.log('add user error;', err.message);
      return null;
    })

};


// add a listing     /// have to input seller_id in here ///
const addListing = (shoe, seller_id) => {
  const currentUser = seller_id
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
const removeListing = (shoe_id) => {
  shoeToRemove = shoe_id;
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

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers, getAllTheListings, getFeatured, getFavoritesWithId, getOurListings, filterByAsc, filterByDesc, showMessagesForListing, addListing, addUser, markSold, addToFavorites, removeListing };


////// This was already in the folder /////


// module.exports = { getUsers };
