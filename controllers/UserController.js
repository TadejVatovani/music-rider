 var util = require('util');
 var express = require('express');

 
 var router = express.Router();
/*
 * GET /create
 *
 */

router.get('/', function(req, res, next) {
    res.json({message:"Music Rider statistics server"});
});

 module.exports = router;
