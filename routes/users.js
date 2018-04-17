var express = require('express');
var app = express();
var router = express.Router();
var connection = require('../models/db'); // 使用连接池连接数据库

router.post('/add', function (req, res) {
  var addSql = `INSERT INTO t_user(userId,name,password) VALUES(0,'${req.body.name}','${req.body.password}')`;
  connection.query(addSql, function (err, result) {
    if (err) {
      console.log('[INSERT ERROR] - ', err.message);
      return;
    } else {
      console.log('INSERT ID:', result);
      res.json(result);
    }
  });
});
router.post('/query', function (req, res) {
  console.log(req.body);
  const sql = `select * from t_user where name='${req.body.name}'`;
  connection.query(sql, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

router.post('/delete', function (req, res) {
  console.log(req.body);
  const sql = `delete from t_user where userId ='${req.body.id}'`;
  connection.query(sql, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      res.json(result);
    }
  });
});
router.post('/update', function (req, res) {
  let id = req.body.id;
  let [name, password] = [req.body.name, req.body.password];
  var addSql = `update t_user set name=?,password=? where userId = ${id}`;
  connection.query(addSql, [name, password], function (err, result) {
    if (err) {
      console.log("update" + err.message);
      return;
    } else {
      console.log('update ID:', result);
      res.json(result);
    }
  });
});
module.exports = router;
