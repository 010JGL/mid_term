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

// find password for user

const findPasswordForUser = (user) => {
  const currentUser = user;
  //const usersDatabase = database;

  return pool
  .query(`SELECT users.password FROM users WHERE users.id = $1;`, [currentUser])
  .then((result) => {
    console.log('result:', result);
    return result.rows;
  })
  .catch((err) => {
    console.log('add user error;', err.message);
    return null;
  });
};



module.exports = {  addUser, findUserByEmail, findPasswordForUser };


////// This was already in the folder /////

// const getUsers = () => {
//   return db.query('SELECT * FROM users;')
//     .then(data => {
//       return data.rows;
//     });
// };

// module.exports = { getUsers };
