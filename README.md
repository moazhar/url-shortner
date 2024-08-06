# URL Shortener

A URL shortener is a tool that converts a long URL into a shorter, more manageable link. This shorter link redirects to the original, long URL when clicked. This project implements a basic URL shortening service using Node.js and Express.

## Features

- Shorten long URLs
- Redirect shortened URLs to the original URLs
- Basic validation for URL input

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (version 6 or higher)
- [MongoDB](https://www.mongodb.com/) (for URL storage)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/url-shortener.git
   cd url-shortener
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env.${ENV_NAME} file in the
   `environment` folder of the project and add your env variables:

   ```bash
   # Example
   NODE_ENV=development
   PORT=8000
   DB_URI=mongodb://localhost:27017/url-shortner
   ```

### Running the Application

1. Start the MongoDB server either locally or by
   executing the Docker Compose script defined in the `package.json` file:

   ```bash
   npm run docker:up
   ```

2. Start the server:

   ```bash
    npm run start:dev
   ```

### ESLint Document

- [Eslint](https://shaifarfan.com/blog/airbnb-eslint-prettier-setup-react-typescript/) (Integation of ESLint using prettier)
