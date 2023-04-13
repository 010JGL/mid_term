const { pool } = require('./pool.js')

// Get all the listings functions
const getAllTheListings = () => {
  return pool
    .query(`SELECT * FROM shoes;`)
    .then((result) => {
      //console.log('result:', result);
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
      //console.log('result:', result);
      return result.rows;
    })
    .catch((err) => {
      console.log('add user error;', err.message);
      return null;
    });
};

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

// add a listing     /// have to input seller_id in here ///
const addListing = (shoe, sellerId) => {
  const currentUser = sellerId;
  const defaultValue = 'false'
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

// Mark the item as sold
const markSold = (id) => {
  const shoeId = id;
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

const searchBySize = (shoeSize) => {
  const wantedSize = shoeSize;
  return pool
    .query(`SELECT * FROM shoes WHERE seller_id = $1;`, [wantedSize])
    .then((result) => {
      console.log('result:', result);
      return result.rows;
    })
    .catch((err) => {
      console.log('add user error;', err.message);
      return null;
    });
};

module.exports = { getAllTheListings, getFeatured, getOurListings, filterByAsc, filterByDesc, addListing, markSold, removeListing, searchBySize }
