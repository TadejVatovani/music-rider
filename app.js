/**
 * app.js
 *
 * Main execution file for this project.
 */

 /** External modules **/
 var express = require('express');


 /** Internal modules **/
 var config = require('./private/config');
 var userController = require('./controllers/UserController');

 /** Express setup **/
 var app = express();

 /** Express routing **/
 app.use('/', userController);

 /** Server deployment **/
 var port = config.PORT || 3000;
 app.listen(port)