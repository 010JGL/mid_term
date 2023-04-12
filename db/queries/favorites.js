const { pool } = require('./pool.js')

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

module.exports = { addToFavorites, getFavoritesWithId }
