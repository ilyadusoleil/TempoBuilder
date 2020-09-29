const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

//load config
dotenv.config({ path: './config/config.env' });

require('./config/passport')(passport);

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(path.join(__dirname, 'build')));

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// set up cors to allow us to accept requests from our client
// app.use(
//   cors({
//     origin: 'http://localhost:1234', // allow to server to accept request from different origin
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // allow session cookie from browser to pass through
//   })
// );

app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/images'));
app.use('/piece', require('./routes/pieces'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
