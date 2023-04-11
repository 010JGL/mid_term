const { pool } = require('./pool.js');


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

// find user by email

const findUserByEmail = (email) => {
  const userEmail = email;
  //const usersDatabase = database;

  return pool
  .query(`SELECT * FROM users WHERE users.email = $1`, [userEmail])
  .then((result) => {
    console.log('result:', result);
    return result.rows;
  })
  .catch((err) => {
    console.log('add user error;', err.message);
    return null;
  });
};


// log in func

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

<<<<<<< HEAD
module.exports = { getUsers, getAllTheListings, getFeatured, getFavoritesWithId, getOurListings, filterByAsc, filterByDesc, showMessagesForListing, addListing, addUser, markSold, addToFavorites, removeListing };
=======

module.exports = {  addUser, findUserByEmail };
>>>>>>> master


////// This was already in the folder /////


// module.exports = { getUsers };
