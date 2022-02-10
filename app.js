const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const cors = require('cors');
const app = express();

//import routes
const whitelistRoute = require('./routes/whitelist');
const usersRoute = require('./routes/users');
const bodyParser = require('body-parser')
const newsRoute = require('./routes/news')

//use routes

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Accept, X-Custom-Header, Authorization'
  );
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/whitelist', whitelistRoute);
app.use('/api/users', usersRoute);
app.use('/api/news', newsRoute);
// app.use(cors({
//     origin: "*",
//     methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
//     allowedHeaders: 'Content-type,Authorization,Origin, X-Requested-With, Accept'
// }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
//
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
