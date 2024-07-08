const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3001; // Choose any available port

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

// Start the server

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
