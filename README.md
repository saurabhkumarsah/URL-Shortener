# URL Shortener Service

This is a simple URL shortener service implemented using Node.js and MongoDB for the database. It provides two endpoints: one for creating a short URL from a given original URL and another for redirecting to the original URL based on the short URL.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (v12 or higher)
- MongoDB
- Redis

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd url-shortener-service
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up the environment variables:
   - Create a `.env` file in the project root directory.
   - Add the following environment variables to the file:
     - `MONGODB_URI` - MongoDB connection URI
     - `REDIS_HOST` - Redis server host
     - `REDIS_PORT` - Redis server port
     - `BASE_URL` - Base URL of the application (e.g., `http://localhost:3000`)

## Usage

To start the application, run the following command:

```bash
npm start
```

This will start the Node.js server and connect to the MongoDB and Redis servers based on the provided environment variables.

### Create a Short URL

To create a short URL for an original URL, make a `POST` request to the `/url/shorten` endpoint:

```http
POST /url/shorten
Content-Type: application/json

{
  "originalUrl": "http://example.com/path/to/resource"
}
```

The response will be a JSON object containing the shortened URL:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "shortUrl": "http://localhost:3000/xyz"
}
```

If the request is invalid or the original URL is not provided, a `400 Bad Request` response will be returned.

### Redirect to Original URL

To redirect to the original URL corresponding to a short URL, make a `GET` request to the `/:urlCode` endpoint:

```http
GET /xyz
```

If the short URL exists in the database, the server will respond with a `302 Found` status code and redirect the user to the original URL.

If the short URL does not exist in the database, a suitable error message will be returned. If the request is invalid, a `400 Bad Request` response will be returned.

## Caching

The application utilizes Redis for caching to minimize database calls when fetching the shortened URL. Redis is used as an in-memory key-value store to store the mapping between short URLs and their corresponding original URLs.

When a short URL is accessed, the application first checks if the mapping exists in Redis. If it does, the server responds with a redirection to the original URL without querying the database. If the mapping is not found in Redis, the application fetches it from the database, stores it in Redis for future use, and then redirects the user.

## Libraries and Packages

The application utilizes the following libraries and packages:

- Express.js: A web application framework for Node.js.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB.
- Shortid: A package for generating short, unique IDs.
- Redis: A popular in-memory data store.
- dotenv: A module for loading environment variables from a `.env` file.
- Axios: A package for making HTTP requests.
- valid-url: A package for URL validation.

## Conclusion

This URL shortener service provides a simple and efficient way to generate short URLs from long URLs and redirect

 users to the original URLs. By utilizing caching with Redis, the service minimizes database calls and improves performance. Feel free to explore and enhance the codebase based on your requirements.














 # URL Shortener Application

This is a backend application that provides URL shortening functionality. It allows users to create a short URL for a given original URL and then redirects users to the original URL when they access the shortened URL.

## Requirements

To run this application, you need to have the following installed:

- Node.js
- MongoDB
- Redis

## Installation

1. Clone the repository:

```shell
git clone <repository_url>
```

2. Install the dependencies:

```shell
cd url-shortener
npm install
```

3. Set up the environment variables:

Create a `.env` file in the root directory and add the following variables:

```plaintext
MONGODB_URI=<your_mongodb_connection_string>
REDIS_HOST=<your_redis_host>
REDIS_PORT=<your_redis_port>
BASE_URL=<your_application_base_url>
```

4. Start the application:

```shell
npm start
```

By default, the application runs on port 3000. If you want to use a different port, you can modify the `PORT` variable in the `.env` file.

## API Endpoints

### POST /url/shorten

Creates a short URL for an original URL provided in the request body.

**Request Body**

```json
{
  "longUrl": "http://abc.com/user/images/name/2"
}
```

**Response**

- 200 OK

```json
{
  "shortUrl": "http://localhost:3000/xyz"
}
```

- 400 Bad Request (Invalid request body)

### GET /:urlCode

Redirects to the original URL corresponding to the provided `urlCode`.

**Response**

- 302 Found (Redirect)

If the `urlCode` is valid and corresponds to a shortened URL:

The user is redirected to the original URL.

If the `urlCode` is not found or expired:

- 404 Not Found (URL not found)

If the `urlCode` is not valid:

- 400 Bad Request (Invalid request)

## Caching

This application uses Redis for caching the shortened URLs. When a user accesses a shortened URL, the application first checks if the URL is present in the Redis cache. If it is, the user is directly redirected to the original URL without querying the database. This helps minimize database calls and improves performance.

The cache has a TTL (Time-To-Live) of 24 hours. After the TTL expires, the shortened URL will be removed from the cache, and the next user accessing the URL will trigger a database query to retrieve the corresponding original URL.

## Dependencies

This application uses the following npm packages:

- Express.js: A fast and minimalist web framework for Node.js.
- shortid: A library for generating short, unique, and non-sequential IDs.
- Redis: A Node.js client for Redis, an in-memory data structure store.
- dotenv: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
- axios: A promise-based HTTP client for making HTTP requests.
- valid-url: A library for validating URLs.
- mongoose: An Object Data Modeling (ODM) library for MongoDB.

## Database

This application uses MongoDB as the database for storing URL mappings. The `Url` model is defined with the following properties:

- `urlCode` (mandatory, unique, lowercase, trim): The code that represents the shortened URL.
- `longUrl` (mandatory, valid URL): The original URL.
- `shortUrl` (mandatory, unique): The shortened URL.

## Further Improvements

This is a basic implementation of a URL shortener application. Here are some potential improvements that could be made:

- Implement user authentication and authorization to restrict access to certain URLs.
- Implement rate


















# URL Shortener API

This is a backend application built with Node.js and MongoDB that provides URL shortening functionality. It allows users to create short URLs for long original URLs and redirects users to the original URLs when accessing the short URLs.

## Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables to the `.env` file:
     - `BASE_URL`: The base URL of the application.
     - `PORT`: The port number on which the application will run.
     - `MONGODB_URI`: The MongoDB connection string.
     - `REDIS_HOST`: The Redis server host.
     - `REDIS_PORT`: The Redis server port.
     - `REDIS_PASSWORD`: (Optional) The password for Redis authentication.

4. Start the application:

   ```
   npm start
   ```

## API Endpoints

### POST /url/shorten

Create a short URL for a long original URL.

**Request Body:**

```json
{
  "longUrl": "http://example.com/original-url"
}
```

**Response:**

```json
{
  "shortUrl": "http://localhost:3000/xyz"
}
```

### GET /:urlCode

Redirect to the original URL corresponding to the provided `urlCode`.

**Response:**

- If the `urlCode` exists:
  - Redirect to the original URL with an appropriate redirection status code (e.g., 301, 302).
- If the `urlCode` does not exist:
  - Return a suitable error message.

## Error Handling

- If an invalid request is made (e.g., missing required fields, invalid URL), the API will return a 400 Bad Request response with an error message.
- If a requested URL is not found, the API will return a suitable error message.

## Caching

To minimize database calls, caching is implemented using Redis. The shortened URLs are stored in the cache with a TTL (Time-To-Live) of 24 hours. When a short URL is accessed, the application first checks the cache for the corresponding original URL. If found, it redirects the user to the original URL directly without querying the database.

## Dependencies

- [Express.js](https://expressjs.com/): A web application framework for Node.js.
- [Mongoose](https://mongoosejs.com/): An Object Data Modeling (ODM) library for MongoDB.
- [shortid](https://www.npmjs.com/package/shortid): A simple and short non-sequential URL-friendly unique ID generator.
- [redis](https://www.npmjs.com/package/redis): A client library for Redis, an in-memory data structure store.
- [dotenv](https://www.npmjs.com/package/dotenv): A module that loads environment variables from a `.env` file.
- [axios](https://www.npmjs.com/package/axios): A promise-based HTTP client for making HTTP requests.
- [valid-url](https://www.npmjs.com/package/valid-url): A library for URL validation.

## Database

The application uses MongoDB as the database for storing the URL models. The `url` collection contains the following fields:

- `urlCode`: The code used to generate the short URL. It is unique, case-insensitive, and trimmed.
- `longUrl`: The original URL provided by the user.
- `shortUrl`: The shortened URL generated by the application.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an