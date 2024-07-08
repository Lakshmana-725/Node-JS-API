const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3001; // Choose any available port

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create MySQL connection
const connection = mysql.createConnection({
  host: "localhost", // Remove 'http://' and just use 'localhost'
  user: "root",
  password: "8252", // Wrap the password in quotes since it's a string
  database: "sampledatainfo",
});

// Test the connection
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database!");
});

// Create API endpoints to interact with the database

// Get all books

app.get("/books", (req, res) => {
  connection.query("SELECT * FROM books", (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    } else {
      res.json(results);
    }
  });
});

// Define API endpoint to get a specific book by ID
app.get('/books/:id', (req, res) => {
  // console.log("🚀 ~ file: index.js:45 ~ req:-- ", req)
  const bookId = req.params.id;
  const query = `SELECT * FROM books WHERE book_id = ?`;

  connection.query(query, [bookId], (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      res.status(500).send('Error fetching data');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Book not found');
      return;
    }

    res.json(results[0]); // Assuming there's only one book with the given ID
  });
});

// Get all authors

app.get("/authors", (req, res) => {
  connection.query("SELECT * FROM authors", (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    } else {
      res.json(results);
    }
  });
});

// Define API endpoint to get a specific authors by ID
app.get("/authors/:id", (req, res) => {
  // console.log("🚀 ~ file: index.js:80 ~ req:-- ", req)
  const authorId = req.params.id;
  const query = `SELECT * FROM authors WHERE author_id = ?`;

  connection.query(query, [authorId], (err, results) => {
    if (err) {
      console.error("Error fetching data from database:", err);
      res.status(500).send("Error fetching data");
      return;
    }

    if (results.length === 0) {
      res.status(404).send("author not found");
      return;
    }

    res.json(results[0]); // Assuming there's only one author with the given ID
  });
});

// Get all customers

app.get("/customers", (req, res) => {
  connection.query("SELECT * FROM customers", (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    } else {
      res.json(results);
    }
  });
});

// Define API endpoint to get a specific customers by ID
app.get("/customers/:id", (req, res) => {
// console.log("🚀 ~ file: index.js:115 ~ req:-- ", req)
  const customersId = req.params.id;
  const query = `SELECT * FROM customers WHERE customer_id = ?`;

  connection.query(query, [customersId], (err, results) => {
    if (err) {
      console.error("Error fetching data from database:", err);
      res.status(500).send("Error fetching data");
      return;
    }

    if (results.length === 0) {
      res.status(404).send("Book not found");
      return;
    }

    res.json(results[0]); // Assuming there's only one customers with the given ID
  });
});

// Get all orders

app.get("/orders", (req, res) => {
  connection.query("SELECT * FROM orders", (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    } else {
      res.json(results);
    }
  });
});

// Define API endpoint to get a specific orders by ID
app.get("/orders/:id", (req, res) => {
  // console.log("🚀 ~ file: index.js:150 ~ req:-- ", req)
  const ordersId = req.params.id;
  const query = `SELECT * FROM orders WHERE order_id = ?`;

  connection.query(query, [ordersId], (err, results) => {
    if (err) {
      console.error("Error fetching data from database:", err);
      res.status(500).send("Error fetching data");
      return;
    }

    if (results.length === 0) {
      res.status(404).send("Book not found");
      return;
    }

    res.json(results[0]); // Assuming there's only one orders with the given ID
  });
});

// Start the server

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
