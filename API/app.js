var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require("body-parser");
var cors = require('cors');

const session = require("express-session");
var app = express();

const consApiRouter = require('./routes/api/ConsApiRoute');
const artsApiRouter = require('./routes/api/ArtApiRoute');
const artConsApiRouter = require('./routes/api/ArtConsApiRoute');
var indexRouter = require('./routes/index');

const fmt=require('./utils/dateFormatting');
const authUtils=require('./utils/authUtils');
const authApiRouter = require('./routes/api/AuthApiRoute');
const usersApiRouter = require('./routes/api/UsersApiRoute');

app.use(cors());
app.use(session({
  secret: 'my_secret_password',
  resave: false,
  saveUninitialized: false
}));
app.use((req,res,next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser=loggedUser;
  if(!res.locals.loginError){
    res.locals.loginError=undefined;
  }
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
const i18n = require('i18n');
i18n.configure({
  locales: ['pl', 'en'], // języki dostępne w aplikacji. Dla każdego z nich należy utworzyć osobny słownik
  directory: path.join(__dirname, 'locales'), // ścieżka do katalogu, w którym znajdują się słowniki
  objectNotation: true, // umożliwia korzstanie z zagnieżdżonych kluczy w notacji obiektowej
  cookie: 'acme-hr-lang', //nazwa cookies, które nasza aplikacja będzie wykorzystywać do przechowania informacji o języku aktualnie wybranym przez użytkownika
});
app.use(i18n.init); //inicjalizacja i połączenie do kontekstu aplikacji
app.use((req, res, next) => {
  if(!res.locals.lang) {
    const currentLang = req.cookies['acme-hr-lang'];
    res.locals.lang = currentLang;
  }
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use((req,res,next) => {
  res.locals.fmt=fmt;
  next();
})
app.use('/', indexRouter);

app.use('/login',indexRouter);
app.use('/logout',indexRouter);

app.use('/api/conservators',consApiRouter);
app.use('/api/conservators/add',authUtils.permitAuthenticatedUser,consApiRouter);
app.use('/api/conservators/details',consApiRouter);
app.use('/api/conservators/edit',consApiRouter);

app.use('/api/artworks',artsApiRouter);
app.use('/api/artworks/add',artsApiRouter);
app.use('/api/artworks/details',artsApiRouter);

app.use('/api/users/add',usersApiRouter)
app.use('/api/users',usersApiRouter)

app.use('/api/artcons',artConsApiRouter);

app.use('/api/auth', authApiRouter);

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

const sequelizeInit = require('./config/sequelize/init');
const {auth} = require("mysql/lib/protocol/Auth");
sequelizeInit().catch(err => console.log(err));

module.exports = app;
