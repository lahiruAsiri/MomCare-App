const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');
const helmet = require('helmet');
const PregnancyRoutes = require('./routes/pregnancy');
const healthRoutes = require('./routes/health'); // New health routes


// Connect to database
connection();

// Middleware setup
app.use(express.json());
app.use(cors({
  origin: '*', // Allow all origins (for development; be specific in production)
}));
app.use(helmet());

// Test route
app.get('/', (req, res) => {
  res.send('Hi From Pregnancy API v1');
});

// Pregnancy Routes
app.use('/api/v1/pregnancy', PregnancyRoutes);
app.use('/api/v1/health', healthRoutes); // Add health routes


// Define the port and host for the server to listen on
const port = process.env.PORT || 3543;
const host = '0.0.0.0'; // Binds to all network interfaces

// Start the server
app.listen(port, host, () => console.log(`Server listening on http://${host}:${port}...`));


// Export the Express app
module.exports = app;