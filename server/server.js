const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// -------------------------------------------
// CORS
// -------------------------------------------
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:3000',
  'http://localhost:3001'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
        return callback(new Error('CORS policy: Origin not allowed'));
      }
    },
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true
  })
);

// -------------------------------------------
// Middlewares
// -------------------------------------------
app.use(morgan('dev'));

const helmet = require('helmet');
app.use(helmet());

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({ windowMs: 1 * 60 * 1000, max: 100 });
app.use(limiter);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// -------------------------------------------
// VIEWS
// -------------------------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// -------------------------------------------
// DATABASE
// -------------------------------------------
const connectDB = require('./config/db');

if (!process.env.MONGO_URI) {
  console.error("Error: MONGO_URI not found in .env");
  process.exit(1);
}

connectDB();

// -------------------------------------------
// API ROUTES (IMPORTANT: MUST COME FIRST)
// -------------------------------------------
const authRoutes = require('./routes/auth');
const donorRoutes = require('./routes/donors');            
const bloodRequestRoutes = require('./routes/bloodRequests');

app.use('/api/auth', authRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/requests', bloodRequestRoutes);

// -------------------------------------------
// HOME ROUTE (Optional)
// -------------------------------------------
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Blood Bank Backend',
    year: new Date().getFullYear()
  });
});

// -------------------------------------------
// SERVE REACT BUILD (AFTER API ROUTES)
// -------------------------------------------
const clientBuildPath = path.join(__dirname, '..', 'client', 'build');

if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// -------------------------------------------
// START SERVER
// -------------------------------------------
const PORT = process.env.PORT || 8000;

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}

module.exports = app;
