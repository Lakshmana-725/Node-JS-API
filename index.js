const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const port = 3001; // Choose any available port

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware
app.use(bodyParser.json());

// Create MySQL connection
const connection = mysql.createConnection({
  host: "localhost", // Remove 'http://' and just use 'localhost'
  user: "root",
  password: "8252", // Wrap the password in quotes since it's a string
  database: "books_database",
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

// Get all Users
app.get("/users", async (req, res) => {
  const query = "SELECT * FROM registered_users";
  try {
    const results = await new Promise((resolve, reject) => {
      connection.query(query, (err, results) => {
        if (err) {
          console.error("Error fetching data from database:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
    res.json(results);
  } catch (err) {
    console.error("Error fetching data from database:", err);
    res.status(500).send("Error fetching data");
  }
});

// Get single User
app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM registered_users WHERE user_id = ?`;
  try {
    const results = await new Promise((resolve, reject) => {
      connection.query(query, [userId], (err, results) => {
        if (err) {
          console.error("Error fetching data from database:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
    if (results.length === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.json(results[0]);
  } catch (err) {
    console.error("Error fetching data from database:", err);
    res.status(500).send("Error fetching data");
  }
});

// POST endpoint to create a book
app.post("/books_post", async (req, res) => {
  const { book_id, title, author_id, genre_id, price, publish_date } = req.body;

  // Validate required fields
  if (
    !book_id ||
    !title ||
    !author_id ||
    !genre_id ||
    !price ||
    !publish_date
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check for duplicate book_id
  if (book_id) {
    const checkQuery = "SELECT * FROM books WHERE book_id = ?";
    const checkValues = book_id;

    try {
      const rows = await new Promise((resolve, reject) => {
        connection.query(checkQuery, checkValues, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });

      if (rows.length > 0) {
        return res.status(409).json({ error: "Book ID already exists" });
      }
    } catch (err) {
      return res.status(500).json({ error: "Database error during ID check" });
    }
  }
  const query =
    "INSERT INTO books (book_id, title, author_id, genre_id, price, publish_date) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [book_id, title, author_id, genre_id, price, publish_date];

  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(query, values, (err, result) => {
        if (err) {
          console.error("Error inserting book:", err);
          return reject(err);
        }
        resolve(result);
      });
    });

    res
      .status(201)
      .json({ message: `Book created`, book_id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// update book
app.put("/books_update/:book_id", async (req, res) => {
  const { book_id } = req.params;
  const { title, author_id, genre_id, price, publish_date } = req.body;

  // Validate required fields
  if (!title || !author_id || !genre_id || !price || !publish_date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query =
    "UPDATE books SET title = ?, author_id = ?, genre_id = ?, price = ?, publish_date = ? WHERE book_id = ?";
  const values = [title, author_id, genre_id, price, publish_date, book_id];

  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(query, values, (err, result) => {
        if (err) {
          console.error("Error updating book:", err);
          return reject(err);
        }
        resolve(result);
      });
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book updated", book_id });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// Delete book

app.delete("/books_delete/:book_id", async (req, res) => {
  const { book_id } = req.params;

  const query = "DELETE FROM books WHERE book_id = ?";

  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(query, [book_id], (err, result) => {
        if (err) {
          console.error("Error deleting book:", err);
          return reject(err);
        }
        resolve(result);
      });
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted", book_id });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// Get all books

app.get("/books", async (req, res) => {
  try {
    const results = await connection.promise().query("SELECT * FROM books");
    res.json(results[0]);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Error fetching data");
  }
});

// Define API endpoint to get a specific book by ID
app.get("/books/:id", async (req, res) => {
  const bookId = req.params.id;
  const query = `SELECT * FROM books WHERE book_id = ?`;

  try {
    const results = await new Promise((resolve, reject) => {
      connection.query(query, [bookId], (err, results) => {
        if (err) {
          console.error("Error fetching data from database:", err);
          return reject(err);
        }
        resolve(results);
      });
    });

    if (results.length === 0) {
      res.status(404).send("Book not found");
      return;
    }

    res.json(results[0]); // Assuming there's only one book with the given ID
  } catch (err) {
    console.error("Error fetching data from database:", err);
    res.status(500).send("Error fetching data");
  }
});

// Get all books bookTitle

app.get("/booksTitle", (req, res) => {
  connection.query(
    `
    SELECT
    DISTINCT title FROM books
    ORDER BY title ASC`,
    (err, results) => {
      if (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Error fetching data");
      } else {
        res.json(results);
      }
    }
  );
});

// REST API for BOOKS

// Get Specific title books

app.get("/search_book", async (req, res) => {
  const {
    offset = 0,
    limit = 50,
    order = "asc",
    order_by = "book_id",
    search_q = "",
  } = req.query;
  const query = `SELECT * FROM books WHERE title LIKE '%${search_q}%' ORDER BY ${order_by} ${order} LIMIT ${limit} OFFSET ${offset}`;

  try {
    const results = await new Promise((resolve, reject) => {
      connection.query(query, (err, results) => {
        if (err) {
          console.error("Error fetching data:", err);
          return reject(err);
        }
        resolve(results);
      });
    });

    res.json(results);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Error fetching data");
  }
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

// Get all authors authorCountry

app.get("/author/Country", (req, res) => {
  connection.query(`
    SELECT
    DISTINCT country FROM authors
    ORDER BY country ASC`,
    (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    } else {
      res.json(results);
    }
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

// Get all customers phone numbers

app.get("/customer/Phone", (req, res) => {
  connection.query(`
    SELECT
    DISTINCT phone FROM customers
    ORDER BY phone ASC`,
    (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    } else {
      res.json(results);
    }
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

// Get all Orders orderDates

app.get("/ordersDate", (req, res) => {
  connection.query(`SELECT order_date FROM orders`, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    } else {
      res.json(results);
    }
  });
});

// Start the server

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
