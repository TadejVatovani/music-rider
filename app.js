/**
 * app.js
 *
 * Main execution file for this project.
 */

 /** External modules **/
 var express = require('express');
 var bodyParser = require('body-parser');


 /** Internal modules **/
 var config = require('./private/config');
 var statisticsController = require('./controllers/StatisticsController');

 /** Express setup **/
 var app = express();

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));
 
 app.get('/', (req, res) => {
    res.json({
      msg: 'Music Rider statistics server',
      datetime: new Date().toISOString(),
    });
  });
  

 /** Express routing **/
 app.use('/statistics', statisticsController);

 app.use((req, res) => {
    res.status(404);
    res.json({ error: "404 Not found on Backend endpoint" });
 });

 app.use((err, req, res) => {
    console.error(err);
    res.status(err.status || 500);
    res.json({ error: "500 Internal server error" });
 });
  
  
module.exports = app;
  