const express = require('express');
const db = require('./config/database')
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const httpStatus = require('http-status');
const compression = require('compression');
const passport = require('passport');
const { jwtStrategy } = require('./config/passport');
const routes = require('./routes');




try {
    db.sync();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }))
// sanitize request data
app.use(xss());

// enable cors
app.use(cors())
app.options('*', cors());

// gzip compression
app.use(compression());

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.get('/', (req, res) => res.send('INDEX'));

// v1 api routes
app.use('/v1', routes);
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

