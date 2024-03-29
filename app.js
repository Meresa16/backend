var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const config = require('./config/dev.config')
const swaggerUI = require('swagger-ui-express');
//const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors');
var app = express();

/* const swaggerOptions = { */
/*     definition: { */
/*         openapi: '3.0.0', */
/*         info: { */
/*             tittle: 'biller api documention', */
/*             version: '1.0.0', */
/*             description: 'biller api for derash report', */
/*             license: { */
/*                 name: 'Licensed Under MIT', */
/*                 url: 'https://derash.org', */
/*             }, */
/*             contact: { */
/*                 name: 'Meresa', */
/*                 url: 'https://meresa.com', */
/*             }, */
/*         }, */
/*         servers: [{ */
/*             url: 'http://localhost:3000', */
/*             description: 'Development server', */
/*         },], */
/*     }, */
/*     apis: ['./routes/*',] */
/* } */
const swaggerDocs = require('./swagger.json');
const { hostname } = require('os');
app.use('/document', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/dist/frontend'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: '*'}));
 

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});
require('./routes/index')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const error = new Error('please check the path, it is not the right path.')
    error.status = 404
    next(error);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
mongoose.connect(process.env.MONGODB_URI || config.database, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
},
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log(`successfully connected to ${config.database} and to hostname ${hostname}`);
        }
        console.log(`server started`)
    });
module.exports = app;