/**
 * app.js
 *
 * Main execution file for this project.
 */

 /** External modules **/
 var express = require('express');
 var mongoose = require('mongoose');
 var bodyParser = require('body-parser');
 var cookieParser = require('cookie-parser');


 /** Internal modules **/
 var config = require('./private/config');
 var userController = require('./controllers/UserController');

 /** Database setup **/
 mongoose.connect(config.DB_PATH);

 /** Express setup **/
 var app = express();

 app.set('trust proxy',1) // trust first proxy
 app.set('json spaces',4);
 app.use(cookieParser());
 app.use(bodyParser.urlencoded({ extended: false}));

 /** Express routing **/
 app.use('/', userController);

 /** Server deployment **/
 var port = config.PORT || 3000;
 app.listen(port)