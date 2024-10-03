//   const express = require('express');
//   const mongoose = require('mongoose');
//   const cors = require('cors');
//   const path = require('path');
//   const app = express();
//   require('dotenv').config();
//   const cookieParser = require('cookie-parser');
//   const authRoute = require('./Routes/AuthRoute');
//   const adminRoute = require('./Routes/AdminRoute');
//   const nhsRoutes = require('./Routes/nhsRoutes');
//   const postRoute = require('./Routes/PostRoute'); // Import the post route
//   const socketIo = require('socket.io');
//   const server = http.createServer(app);
// const io = socketIo(server);

//   const { MONGO_URL, PORT } = process.env;

//   mongoose
//     .connect(MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => console.log('MongoDB connected successfully'))
//     .catch((err) => console.error(err));

//   app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//   app.use('/posts', express.static(path.join(__dirname, 'post')));
//   app.use(
//     cors({
//       origin: ['http://localhost:3000'],
//       methods: ['GET', 'POST', 'PUT', 'DELETE'],
//       credentials: true,
//     })
//   );
//   app.use(cookieParser());
//   app.use(express.json());

//   app.use('/', authRoute);
//   app.use('/admin', adminRoute);
//   app.use('/api', postRoute); // Use the post route under /api
//   app.use('/api/conditions', nhsRoutes);
// // Socket.io connection handling
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });
//   app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
//   });

// server.js or index.js
// index.js (or server.js)

// server.js or index.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:3000'], // Your client origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

// Add this middleware to inject io into req
app.use((req, res, next) => {
  req.io = io;
  next();
});

const { MONGO_URL, PORT } = process.env;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error(err));

// Middleware
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/posts', express.static(path.join(__dirname, 'post')));

// Import routes
const authRoute = require('./Routes/AuthRoute');
const adminRoute = require('./Routes/AdminRoute');
const nhsRoutes = require('./Routes/nhsRoutes');
const postRoute = require('./Routes/PostRoute');

// Use routes
app.use('/', authRoute);
app.use('/admin', adminRoute);
app.use('/api', postRoute);
app.use('/api/conditions', nhsRoutes);

// Socket.io connection event
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
