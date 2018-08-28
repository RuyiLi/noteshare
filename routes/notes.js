const router = require('express').Router();
const { Note } = require('../models');

const isAuthorized = (req, res, next) => {
    if(req.user) next();
    else res.redirect('/auth/login');
}

router.get('/', (req, res) => {
    Note.find({}).populate('author').sort({ date: +!!req.query.sort || -1 }).limit(10).exec((err, notes) => {
        console.log(notes[0]);
        res.render('notes', { notes });
    });
})

router.get('/view/:id', (req, res) => {
    Note.findById(req.params.id).populate('author').then(note => {
        console.log(note);
        res.render('viewnote', { note });
    })
})

router.get('/new', isAuthorized, (req, res) => {
    res.render('newnote');
})

router.post('/new', isAuthorized, (req, res) => {
    new Note({ 
        ...req.body,
        author: req.user 
    }).save().then(note => {
        res.status(200).send(note._id);
    });
})

module.exports = router;