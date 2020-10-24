const express = require('express');
const mongoose = require('mongoose');

const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

require('dotenv').config();

//load config
// dotenv.config({ path: './config/config.env' });
const env = process.env.NODE_ENV || 'development';

require('./config/passport')(passport);

var forceSsl = function (req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};


connectDB();

const app = express();

if (env === 'production') {
  app.use(forceSsl);
}

if (env === 'development') {
  app.use(morgan('dev'));
}

if (env === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

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

//set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: 'https://tempobuilder.herokuapp.com/', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);
// app.use(cors());

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
