var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//libreria partials para hacer paginas repetitivas
var partials = require('express-partials');
var methodOverride = require('method-override');
//para las sesiones
var session = require('express-session');

var routes = require('./routes/index');
//var users = require('./routes/users');
var sessionController = require('./controllers/session_controller.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//para el inicio de sesion
app.use(cookieParser('Quiz 2015'));
app.use(session({
    secret:'Quiz 2015',
    resave:false,
    saveUninitialized:true}));

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//Controlar tiempo de sesion
app.use(function(req, res, next) {
//hay dos casos, que hayamos iniciado sesion o que no
if(req.session.user){
    if(!req.session.tiempo_inicio){//la primera vez debemos establecer el tiempo al momento actual, con la funcion getTime de javascript
    req.session.tiempo_inicio=(new Date()).getTime();
    }
    else{
        if((new Date()).getTime()-req.session.tiempo_inicio > 120000){//si los milisegundos son mayores a 120.000, finalizamos la sesion
            delete req.session.user;     //eliminamos el usuario
            req.session.tiempo_inicio=null;
        }
        else{//si no, actualizamos la variable
            req.session.tiempo_inicio=(new Date()).getTime();
        }
    }
}
next();
});

app.use(function(req,res,next){
    //guardamos path en session.redir para despues de login
    if(!req.path.match(/\/login|\/logout/)){
        req.session.redir = req.path;
    }

    //Hacer visible req.session en las vistas
    res.locals.session = req.session;
    next();
});

app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors:[]
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors:[]
    });
});


module.exports = app;
