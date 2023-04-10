// Client facing scripts here

//////////  FUNCTIONS  //////////

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


// add a listing
const addListing = (shoe) => {
  const values = [shoe.gender, shoe.price, shoe.brand, shoe.size, shoe.image_url, shoe.is_sold, shoe.description];
  return pool
    .query(`INSTER INTO shoes (gender, price, brand, size, image_url, is_sold, description) VALUES ($1, $2, $3, 4$, 5$, 6$, 7$) RETURNING *;`, values)
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
  const values = [user.name, user.listing_id, user.email, user.password];
  return pool
    .query(`INSTER INTO users (name, listing_id, email, password) VALUES ($1, $2, $3, 4$) RETURNING *;`, values)
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
    .query(`UPDATE shoes.$1 SET is_sold = true`, shoeId)
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
const addToFavorites = (shoe_id) => {

  const newFav = [shoe_id];
  return pool
    .query(`INSERT //////// favorites WHERE user_id = users.id SET list = newFav`, newFav)
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
    .query(`DELETE FROM shoes WHERE shoes.id = $1`, shoeToRemove)
    .then((result) => {
      console.log('result:', result);
      return result.rows;
    })
    .catch((err) => {
      console.log('add user error;', err.message);
      return null;
    });
};



