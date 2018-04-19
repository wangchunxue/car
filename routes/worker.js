var express = require('express');
var app = express();
var router = express.Router();
var connection = require('../models/db'); // 使用连接池连接数据库

router.post('/add', function (req, res) {
    var  addSql = `INSERT INTO t_worker(workerId,workerName,sex,iphone,sort,salary) VALUES(0,'${req.body.name}','${req.body.sex}','${req.body.iphone}','${req.body.sort}','${req.body.salary}')`;
    connection.query(addSql,function (err, result) {
            if(err){
             console.log('[INSERT ERROR] - ',err.message);
             return;
            } else {     
                res.json(result);
            }     
    });
});
router.post('/query', function (req, res) {
    console.log(req.body);
    const sql = `select * from t_worker where workerName='${req.body.name}'`;
    connection.query(sql, function (error, results) {
      if (error) {
        console.log(error);
      } else {
        res.json(results);
      }
    });
});
router.get('/all', function (req, res) {
    console.log(req.body);
    const sql = `select * from t_worker `;
    connection.query(sql, function (error, results) {
      if (error) {
        console.log(error);
      } else {
        res.json(results);
      }
    });
});
router.post('/delete', function (req, res) {
    console.log(req.body);
    const sql = `delete from t_worker where workerId ='${req.body.id}'`;
    connection.query(sql, function (error, results) {
      if (error) {
        console.log(error);
      } else {
        res.json(results);
      }
    });
});
router.post('/update', function (req, res) {
  let id = req.body.id;
  let [sort, sex, iphone, workerName,salary] = [req.body.sort, req.body.sex, req.body.iphone,req.body.name,req.body.salary];
  var  addSql = `update t_worker set sort=?,sex=?,iphone=?,workerName=?,salary=? where workerId = ${id}` ;
  connection.query(addSql,[sort, sex, iphone, workerName,salary],function (err, result) {
          if(err){
           console.log("update"+err.message);
           return;
          } else {    
              res.json(result);
          }     
  });
});
module.exports = router;