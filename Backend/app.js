const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const tourismRoutes = require('./routes/tourism.routes');
const investmentRoutes = require('./routes/investment.routes');
const formResponseRoutes = require('./routes/formResponse.routes');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tourism', tourismRoutes);
app.use('/api/investment', investmentRoutes);
app.use('/api/form-responses', formResponseRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 