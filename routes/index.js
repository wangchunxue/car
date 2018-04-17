var express = require('express');
var router = express.Router();
var connection = require('../models/db'); // 使用连接池连接数据库


/* GET home page. */
//huo
router.get('/www', function (req, res) {
  connection.query('select * from t_user', [], function (error, results, fields) {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
    }
  });
});
module.exports = router;
