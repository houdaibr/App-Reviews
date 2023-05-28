const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');

const app = express();


// MySQL Connection Configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mysql2023',
  database: 'app_reviews'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  //Read reviews from JSON file and insert into MySQL database
    fs.readFile('reviews.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading reviews.json:', err);
        return;
    }

  const reviews = JSON.parse(data);
    
  if (reviews && Array.isArray(reviews.reviews) && Object.keys(reviews.reviews).length> 0) {
    const query = 'INSERT INTO reviews (id, appID, appStoreName, reviewDate, rating, version, countryName, reviewHeading, reviewText, reviewUserName) VALUES ?';
    const values = reviews.reviews.map((review) => [
      review.id,
      review.appID,
      review.appStoreName,
      review.reviewDate,
      review.rating,
      review.version,
      review.countryName,
      review.reviewHeading,
      review.reviewText,
      review.reviewUserName
    ]);

    db.query(query, [values], (err, result) => {
      if (err) {
        console.error('Error inserting reviews into MySQL:', err);
      } else {
        console.log('Reviews inserted into MySQL database');
      }
    });
  }
});

});




app.get('/reviews', (req, res) => {
  const query = 'SELECT * FROM reviews';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Failed to fetch reviews' });
      return;
    }

    const modifiedResults = results.map((review) => {
      return {
        id: review.id,
        appID: review.appID,
        appStoreName: review.appStoreName,
        reviewDate: review.reviewDate.toISOString(),
        rating: review.rating,
        version: review.version,
        countryName: review.countryName,
        reviewHeading: review.reviewHeading,
        reviewText: review.reviewText,
        reviewUserName: review.reviewUserName
      };
    });

    res.json({ reviews: modifiedResults });
  });
});

app.get('/reviews/filter', (req, res) => {
  const { appID, appStoreName, rating, countryName } = req.query;

  let query = 'SELECT * FROM reviews WHERE 1=1';

  if (appID) {
    query += ` AND appID = '${appID}'`;
  }

  if (appStoreName) {
    query += ` AND appStoreName = '${appStoreName}'`;
  }

  if (rating) {
    query += ` AND rating = ${rating}`;
  }

  if (countryName) {
    query += ` AND countryName = '${countryName}'`;
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Failed to filter reviews' });
      return;
    }

    const modifiedResults = results.map((review) => {
      return {
        id: review.id,
        appID: review.appID,
        appStoreName: review.appStoreName,
        reviewDate: review.reviewDate.toISOString(),
        rating: review.rating,
        version: review.version,
        countryName: review.countryName,
        reviewHeading: review.reviewHeading,
        reviewText: review.reviewText,
        reviewUserName: review.reviewUserName
      };
    });

    res.json({ reviews: modifiedResults });
  });
});

app.get('/reviews/search', (req, res) => {
  const { query } = req.query;

  const searchQuery = `SELECT * FROM reviews WHERE reviewHeading LIKE '%${query}%' OR reviewText LIKE '%${query}%'`;

  db.query(searchQuery, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Failed to search reviews' });
      return;
    }

    const modifiedResults = results.map((review) => {
      return {
        id: review.id,
        appID: review.appID,
        appStoreName: review.appStoreName,
        reviewDate: review.reviewDate.toISOString(),
        rating: review.rating,
        version: review.version,
        countryName: review.countryName,
        reviewHeading: review.reviewHeading,
        reviewText: review.reviewText,
        reviewUserName: review.reviewUserName
      };
    });

    res.json({ reviews: modifiedResults });
  });
});
