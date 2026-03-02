const express = require('express');
const dotenv = require('dotenv');

const app = express();

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Body parser
app.use(express.json());

// Routes
const albums = require('./routes/albums');
app.use('/albums', albums);

// Port
const PORT = process.env.PORT || 5000;

// Start server
const server = app.listen(
  PORT,
  console.log(
    'Server running in',
    process.env.NODE_ENV,
    'mode on port',
    PORT
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});