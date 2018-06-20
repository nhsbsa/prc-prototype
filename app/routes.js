var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here

router.get (/ehic-handler/, function (req, res){
    console.log("Got request for ehic handler, ehic = " + req.query.ehic);
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

router.get (/registration/, function (req, res){
	if (req.query.registred2 === 'Yes'){
		res.redirect ('registerpersons1');
    } else {
        res.redirect ('registerperson');
}
});

router.get (/indesserResults/, function (req, res){
	if (req.query.indesser1 === 'Fail'){
		res.redirect ('contactdetails');
    } else {
        res.redirect ('registerpersons1');
}
});

router.get (/provideTest/, function (req, res){
	if (req.query.provided2 === 'Yes'){
		res.redirect ('contactdetails');
		console.log("1");
    } else {
        res.redirect ('notukresident');
		console.log("2");
}
});

module.exports = router