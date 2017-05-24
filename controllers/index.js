var express = require('express');
var router = express.Router();
var path = require('path');

router.use('/api/countries', require('./countries'));

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

router.get('/about', function(req, res){
  res.json({data: "All about countries!"});
})

module.exports = router;