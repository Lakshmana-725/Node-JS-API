# Node-JS-API
Start with a concise overview of your Node.js API. Explain what the API does, its main features, and its purpose. This helps visitors quickly understand the project's scope and relevance.

---
## API Endpoints Documentation

Each section below describes a different endpoint available in the API.

### Fetch all books
- **Description:** Retrieves all books available in the API.
- **Request:**
  GET http://localhost:3001/books


### Fetch a specific book by ID
- **Description:** Retrieves a book from the API based on its ID.
- **Request:**
  ```http
  GET http://localhost:3001/books/{id}
  ```
  Replace `{id}` with the ID of the book.

### Fetch books by title
- **Description:** Retrieves books from the API based on their title.
- **Request:**
  ```http
  GET http://localhost:3001/booksTitle/{title}
  ```
  Replace `{title}` with the title of the book.

### Fetch all authors
- **Description:** Retrieves all authors from the API.
- **Request:**
  ```http
  GET http://localhost:3001/authors
  ```

### Fetch a specific author by ID
- **Description:** Retrieves an author from the API based on their ID.
- **Request:**
  ```http
  GET http://localhost:3001/authors/{id}
  ```
  Replace `{id}` with the ID of the author.

### Fetch author's country by author ID
- **Description:** Retrieves the country of an author from the API based on their ID.
- **Request:**
  ```http
  GET http://localhost:3001/author/Country/{id}
  ```
  Replace `{id}` with the ID of the author.

### Fetch all customers
- **Description:** Retrieves all customers from the API.
- **Request:**
  ```http
  GET http://localhost:3001/customers
  ```

### Fetch a specific customer by ID
- **Description:** Retrieves a customer from the API based on their ID.
- **Request:**
  ```http
  GET http://localhost:3001/customers/{id}
  ```
  Replace `{id}` with the ID of the customer.

### Fetch customer by phone number
- **Description:** Retrieves a customer from the API based on their phone number in E.164 format.
- **Request:**
  ```http
  GET http://localhost:3001/customer/Phone/{phoneNumber}
  ```
  Replace `{phoneNumber}` with the customer's phone number in E.164 format.

### Fetch all orders
- **Description:** Retrieves all orders from the API.
- **Request:**
  ```http
  GET http://localhost:3001/orders
  ```

### Fetch a specific order by ID
- **Description:** Retrieves an order from the API based on its ID.
- **Request:**
  ```http
  GET http://localhost:3001/orders/{id}
  ```
  Replace `{id}` with the ID of the order.

### Fetch orders by date
- **Description:** Retrieves orders from the API based on a specific date.
- **Request:**
  ```http
  GET http://localhost:3001/ordersDate/{date}
  ```
  Replace `{date}` with the date in 'YYYY-MM-DD' format.
---
© __P.LAKSHMANA RAO (Software Developer)__