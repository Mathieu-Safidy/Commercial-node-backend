var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const { engine } = require('express-handlebars');
var indexRouter = require('./routes/index');
var app = express();
const dotenv = require('dotenv');
dotenv.config();
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
app.use(cors({
  origin: ['http://localhost:4200','http://localhost:8080' , 'https://m1p13mean-safidy-mirindra.dev'], // Remplacez par l'URL de votre frontend
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
const connectDB = require('./base/db');
connectDB();
app.use('/uploads', express.static('uploads'));

const {catchError, errorhandler} = require('./middleware/ErrorCacthing');

app.use('/api', indexRouter);

app.use(catchError);

app.use(errorhandler);




module.exports = app;