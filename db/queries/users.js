const { pool } = require('./pool.js');


// Create a new user
const addUser = (user) => {
  const values = [user.name, user.email, user.password, user.role];
  return pool
    .query(`INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *;`, values)
    .then((result) => {
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
    return result.rows;
  })
  .catch((err) => {
    console.log('add user error;', err.message);
    return null;
  });
};

const findEmailById = (id) => {
  const userId = id;

  return pool
  .query(`SELECT users.email FROM users WHERE users.id = $1;`, [userId])
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log('add user error;', err.message);
    return null;
  });
};



module.exports = {  addUser, findUserByEmail, findEmailById };




