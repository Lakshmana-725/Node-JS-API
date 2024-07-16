# Node-JS-API

## Overview

This Node.js API provides a robust solution for managing a bookstore's data, including books, authors, customers, and orders. It offers a comprehensive set of endpoints for creating, reading, updating, and deleting entries in a database, making it suitable for building applications that require book management functionalities.

## Installation Steps

1. **Clone the Repository:**
   Clone your Node.js API project repository from your hosting platform.

   ```bash
   git clone <repository-url>
   cd <project-directory>

2. **Install Dependencies:**
   Navigate to your project directory and install the required dependencies using npm.

   ```bash
   npm install
   ```
3. **Set Up Environment Variables (if applicable):**
   Create a `.env` file in the root of your project for configuration variables.

   Example `.env` file:

   ```
   PORT=3001
   DATABASE_URL=mongodb://localhost:27017/bookstore
   ```
4. **Start the Server:**
   Start your Node.js server.

   ```bash
   npm start
   ```
5. **Verify the Installation:**
   Use a web browser or tools like Postman to test the API endpoints.

### Additional Notes

- **Database Setup:** Ensure your database server is running and configured correctly.
- **Testing:** Use frameworks like Mocha or Jest to test your API endpoints.
- **Deployment:** Consider services like Heroku or AWS for production deployment.

---

## API Endpoints Documentation

### 1. Create a Book

**POST** `/books_post`

- **Description**: Creates a new book entry in the database.
- **Request Body**:

  - `book_id`: Unique identifier for the book (required).
  - `title`: Title of the book (required).
  - `author_id`: Unique identifier for the author (required).
  - `genre_id`: Unique identifier for the genre (required).
  - `price`: Price of the book (required).
  - `publish_date`: Publication date of the book (required).
- **Responses**:

  - `201 Created`: Book successfully created.
  - `400 Bad Request`: Missing required fields.
  - `409 Conflict`: Book ID, Author ID, and Genre ID combination already exists.
  - `500 Internal Server Error`: Database error.

---

### 2. Update a Book

**PUT** `/books_update/:book_id`

- **Description**: Updates an existing book entry in the database.
- **Parameters**:

  - `book_id`: Unique identifier for the book (required in the URL).
- **Request Body**:

  - `title`: Title of the book (required).
  - `author_id`: Unique identifier for the author (required).
  - `genre_id`: Unique identifier for the genre (required).
  - `price`: Price of the book (required).
  - `publish_date`: Publication date of the book (required).
- **Responses**:

  - `200 OK`: Book successfully updated.
  - `400 Bad Request`: Missing required fields.
  - `404 Not Found`: Book not found.
  - `500 Internal Server Error`: Database error.

---

### 3. Delete a Book

**DELETE** `/books_delete/:book_id`

- **Description**: Deletes a book entry from the database.
- **Parameters**:

  - `book_id`: Unique identifier for the book (required in the URL).
- **Responses**:

  - `200 OK`: Book successfully deleted.
  - `404 Not Found`: Book not found.
  - `500 Internal Server Error`: Database error.

---

### Additional Endpoints

#### Fetch all books

- **GET** `/books`
- **Description**: Retrieves all books available in the API.

---

#### Fetch a specific book by ID

- **GET** `/books/{id}`
- **Description**: Retrieves a book from the API based on its ID.

---

#### Fetch books by title

- **GET** `/booksTitle/{title}`
- **Description**: Retrieves books from the API based on their title.

---

#### Fetch all authors

- **GET** `/authors`
- **Description**: Retrieves all authors from the API.

---

#### Fetch a specific author by ID

- **GET** `/authors/{id}`
- **Description**: Retrieves an author from the API based on their ID.

---

#### Fetch author's country by author ID

- **GET** `/author/Country/{id}`
- **Description**: Retrieves the country of an author from the API based on their ID.

---

#### Fetch all customers

- **GET** `/customers`
- **Description**: Retrieves all customers from the API.

---

#### Fetch a specific customer by ID

- **GET** `/customers/{id}`
- **Description**: Retrieves a customer from the API based on their ID.

---

#### Fetch customer by phone number

- **GET** `/customer/Phone/{phoneNumber}`
- **Description**: Retrieves a customer from the API based on their phone number in E.164 format.

---

#### Fetch all orders

- **GET** `/orders`
- **Description**: Retrieves all orders from the API.

---

#### Fetch a specific order by ID

- **GET** `/orders/{id}`
- **Description**: Retrieves an order from the API based on its ID.

---

#### Fetch orders by date

- **GET** `/ordersDate/{date}`
- **Description**: Retrieves orders from the API based on a specific date.

---
© __P.LAKSHMANA RAO (Software Developer)__
```