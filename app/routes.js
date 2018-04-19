var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here

router.get (/ehic-handler/, function (req, res){
    console.log("Gor request for ehic handler, ehic = " + req.query.ehic);
    if (req.query.ehic === 'no'){
        res.redirect ('personsearch');
    } else {
        res.redirect ('ehicrejection');
}
});

router.get (/country-handler/, function (req, res){
    if (req.query.s1 === 'no'){
        res.redirect ('prctime');
    } else {
        res.redirect ('s1reject');
}
});

module.exports = router