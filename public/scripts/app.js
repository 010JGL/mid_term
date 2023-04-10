// Client facing scripts here


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
// Get the featured (what is the criteria? most favorites or random in featured?)


// Get favorites with user ID
const getFavoritesWithId = (id) => {
  const loggedUser = id;
  console.log('loggedUser:', loggedUser);
  return pool
    .query(`SELECT * FROM shoes WHERE users.id = $1;`, [loggedUser])
    .then((result) => {
      console.log('result:', result);
      return result.rows;
    })
    .catch((err) => {
      console.log('add user error;', err.message);
      return null;
    });
};

// Get our listing page
const getOurListings = (id) => {
  const loggedUser = id;
  console.log('loggedUser:', loggedUser);
  return pool
    .query(`SELECT * FROM shoes WHERE users.id = $1;`, [loggedUser])
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
// show the messages (should show messages associated with the shoe_id / dont just show all the messages in one place)
