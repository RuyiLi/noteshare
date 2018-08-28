const router = require('express').Router();

const isAuthorized = (req, res, next) => {
    if(req.user) next();
    else res.redirect('/auth/login');
}

router.get('/', isAuthorized, (req, res) => {
    console.log(req.user);
    res.render('profile', {
        user: req.user
    })
});

module.exports = router;