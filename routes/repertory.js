var express = require('express');
var app = express();
var router = express.Router();
var connection = require('../models/db'); // 使用连接池连接数据库
router.get('/all', function (req, res) {
  console.log(req.body);
  const sql = `select * from t_repertory `;
  connection.query(sql, function (error, results) {
    if (error) {
      console.log(error);
    } else {
      console.log(results);
      res.json(results);
    }
  });
});
router.post('/add', function (req, res) {
    var  addSql = `INSERT INTO t_repertory(repertoryId,repertoryName) VALUES(0,'${req.body.name}')`;
    connection.query(addSql,function (err, result) {
            if(err){
             console.log('[INSERT ERROR] - ',err.message);
             return;
            } else {    
                res.json(result);
            }     
    });
});
router.get('/queryAll', function (req, res) {
  const sql = `select * from t_goods, t_repertory where t_repertory.repertoryId = t_goods.repertoryId`;
  connection.query(sql, function (error, result) {
      if (error) {
          console.log(error);
      } else {
          res.json(result);
      }
  });
});
router.get('/queryId', function (req, res) {
  const sql = `select * from t_goods, t_repertory where t_repertory.repertoryId = ='${req.body.id}'`;
  connection.query(sql, function (error, result) {
      if (error) {
          console.log(error);
      } else {
          res.json(result);
      }
  });
});
router.post('/query', function (req, res) {
  const sql = `select * from t_repertory where repertoryName = '${req.body.name}'`;
  connection.query(sql, function (error, result) {
      if (error) {
          console.log(error);
      } else {
          res.json(result);
      }
  });
});
router.post('/delete', function (req, res) {
    console.log(req.body);
    const sql = `delete from t_repertory where repertoryId ='${req.body.id}'`;
    connection.query(sql, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        res.json(result);
      }
    });
});
router.post('/update', function (req, res) {
  let id = req.body.id;
  let [repertoryId,repertoryName] = [req.body.id, req.body.name];
  var  addSql = `update t_repertory set repertoryName=? where repertoryId = ${id}` ;
  connection.query(addSql,[repertoryName],function (err, result) {
          if(err){
           console.log("update"+err.message);
           return;
          } else {    
              res.json(result);
          }     
  });
});
module.exports = router;