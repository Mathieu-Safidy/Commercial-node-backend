var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const { engine } = require('express-handlebars');
var indexRouter = require('./routes/index');
var app = express();

app.engine('handlebars', engine({
  defaultLayout: 'main', // layout principal
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


const {catchError, errorhandler} = require('./middleware/ErrorCacthing');

app.use('/', indexRouter);

app.use(catchError);

app.use(errorhandler);




module.exports = app;