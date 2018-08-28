const credentials = require('./config/credentials.json');
const bodyParser = require('body-parser');
const passport = require('passport');
const express = require('express');
const util = require('./util');
const path = require('path');

const PORT = process.env.PORT || 8000;
const app = express();

const route=r=>require('../routes/'+r);

// Setup views
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('./config/passport-setup');
app.use(require('cookie-session')({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: credentials.cookies.keys
}))
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    const _render = res.render;
    res.render = function (view, options = {}, cb) {
        options['user'] = req.user;
        _render.call(this, view, options, cb);
    }
    next();
})
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/notes', require('./routes/notes'));
app.use(express.static('views'));

// Connect to database
require('mongoose').connect(credentials.mongo.uri, () => {
    util.info('Established connection with MongoDB');
});


// Home route
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home'
    });
});

// Start up app
app.listen(PORT, () => {
    util.info(`Listening on http://localhost:${PORT}`);
});

process.on('unhandledRejection', (err) =>{
    util.error(err);
})