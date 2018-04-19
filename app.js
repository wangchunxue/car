var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var query = require('./models/db'); // 使用连接池连接数据库

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customerRouter = require('./routes/customer');
var workerRouter = require('./routes/worker');
var goodsRouter = require('./routes/goods')
var repertoryRouter = require('./routes/repertory')
var businessRouter = require('./routes/business')


var app = express();
// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/customer', customerRouter);
app.use('/worker', workerRouter);
app.use('/goods',goodsRouter);
app.use('/repertory',repertoryRouter);
app.use('/business',businessRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
