var util = require('util');
var express = require('express');

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

var router = express.Router();

router.post('/:id', async (req, res) => {
  let id = req.params.id;
  let statistics = req.body;
  let password = req.body.password;

  const query = `UPDATE  statistics SET
     points_ratio_easy = ($2), points_ratio_normal = ($3), points_ratio_hard = ($4), points_ratio_nightmare = ($5),
     bombs_easy = ($6), bombs_normal = ($7), bombs_hard = ($8), bombs_nightmare = ($9), 
     obstacles_easy = ($10), obstacles_normal = ($11), obstacles_hard = ($12), obstacles_nightmare = ($13), 
     ranking_easy = ($14), ranking_normal = ($15), ranking_hard = ($16), ranking_nightmare = ($17), 
     finished = ($18), played = ($19)
     WHERE
     id = ($1)
     RETURNING id`

  const values = [
    id,
    statistics.points_ratio_easy, statistics.points_ratio_normal, statistics.points_ratio_hard, statistics.points_ratio_nightmare,
    statistics.bombs_easy, statistics.bombs_normal, statistics.bombs_hard, statistics.bombs_nightmare,
    statistics.obstacles_easy, statistics.obstacles_normal, statistics.obstacles_hard, statistics.obstacles_nightmare,
    statistics.ranking_easy, statistics.ranking_normal, statistics.ranking_hard, statistics.ranking_nightmare,
    statistics.finished, statistics.played
  ]

  try {
    const client = await pool.connect()
    const passwordServer = await pool.query('SELECT password FROM auth');
    if (password != passwordServer) {
      res.json({
        error: "Incorrect password"
      })
    }
    const result = await pool.query(query, values)
    res.json({
      message: "Succesfully updated data"
    });
    client.release();
  } catch (err) {
    res.json({
      error: err.message
    });
  }
});

router.put('/', async (req, res) => {
  let statistics = req.body;
  let password = req.body.password;

  const query = `INSERT INTO statistics(
     points_ratio_easy, points_ratio_normal, points_ratio_hard, points_ratio_nightmare,
     bombs_easy, bombs_normal, bombs_hard, bombs_nightmare, 
     obstacles_easy, obstacles_normal, obstacles_hard, obstacles_nightmare, 
     ranking_easy, ranking_normal, ranking_hard, ranking_nightmare, 
     finished,played) 
     VALUES(
       $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) RETURNING id`

  const values = [
    statistics.points_ratio_easy, statistics.points_ratio_normal, statistics.points_ratio_hard, statistics.points_ratio_nightmare,
    statistics.bombs_easy, statistics.bombs_normal, statistics.bombs_hard, statistics.bombs_nightmare,
    statistics.obstacles_easy, statistics.obstacles_normal, statistics.obstacles_hard, statistics.obstacles_nightmare,
    statistics.ranking_easy, statistics.ranking_normal, statistics.ranking_hard, statistics.ranking_nightmare,
    statistics.finished, statistics.played
  ]

  try {
    const client = await pool.connect()
    const passwordServer = await pool.query('SELECT password FROM auth');
    if (password != passwordServer) {
      res.json({
        error: "Incorrect password"
      })
    }
    const result = await pool.query(query, values)
    res.json({
      message: "Succesfully updated data",
      id: result.rows[0].id
    });
    client.release();
  } catch (err) {
    res.json({
      error: err.message
    });
  }
});

router.get('/ids', async (req, res) => {
  const query = `SELECT id FROM statistics`

  try {
    const client = await pool.connect()
    const result = await pool.query(query)
    res.json({
      result: result.rows
    });
    client.release();
  } catch (err) {
    res.json({
      error: err.message
    });
  }
});

router.get('/', async (req, res) => {
  const query = `SELECT 
  AVG(points_ratio_easy) as points_ratio_easy, AVG(points_ratio_normal) as points_ratio_normal,AVG(points_ratio_hard) as points_ratio_hard,AVG(points_ratio_nightmare) as points_ratio_nightmare,
  AVG(bombs_easy) as bombs_easy,AVG(bombs_normal) as bombs_normal,AVG(bombs_hard) as bombs_hard,AVG(bombs_nightmare) as bombs_nightmare,
  AVG(obstacles_easy) as obstacles_easy,AVG(obstacles_normal) as obstacles_normal,AVG(obstacles_hard) as obstacles_hard,AVG(obstacles_nightmare) as obstacles_nightmare,
  AVG(ranking_easy) as ranking_easy,AVG(ranking_normal) as ranking_normal,AVG(ranking_hard) as ranking_hard,AVG(ranking_nightmare) as ranking_nightmare,
  AVG(finished) as finished,AVG(played) as played FROM statistics`

  try {
    const client = await pool.connect()
    const result = await pool.query(query)
    res.json({
      message: "Average of statistics",
      result: result.rows[0]
    });
    client.release();
  } catch (err) {
    res.json({
      error: err.message
    });
  }
});



module.exports = router;
