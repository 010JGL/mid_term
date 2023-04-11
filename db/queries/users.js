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



module.exports = {  addUser };


////// This was already in the folder /////

// const getUsers = () => {
//   return db.query('SELECT * FROM users;')
//     .then(data => {
//       return data.rows;
//     });
// };

// module.exports = { getUsers };
