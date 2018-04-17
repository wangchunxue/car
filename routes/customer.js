var express = require('express');
var app = express();
var router = express.Router();
var connection = require('../models/db'); // 使用连接池连接数据库

router.post('/add', function (req, res) {
    var  addSql = `INSERT INTO t_customer(customerId,grade,carNum,iphone,name) VALUES(0,'${req.body.grade}','${req.body.carNum}','${req.body.iphone}','${req.body.name}')`;
    connection.query(addSql,function (err, result) {
            if(err){
             console.log('[INSERT ERROR] - ',err.message);
             return;
            } else {
                console.log('INSERT ID:',result);        
                res.json(result);
            }     
    });
});
router.post('/query', function (req, res) {
    console.log(req.body);
    const sql = `select * from t_customer where name='${req.body.name}'`;
    connection.query(sql, function (error, results) {
      if (error) {
        console.log(error);
      } else {
        console.log(results);
        res.json(results);
      }
    });
});
router.post('/delete', function (req, res) {
    console.log(req.body);
    const sql = `delete from t_customer where customerId ='${req.body.id}'`;
    connection.query(sql, function (error, results) {
      if (error) {
        console.log(error);
      } else {
        console.log(results);
        res.json(results);
      }
    });
});
router.post('/update', function (req, res) {
  let id = req.body.id;
  let [grade, carNum, iphone, name] = [req.body.grade, req.body.carNum, req.body.iphone,req.body.name];
  var  addSql = `update t_customer set grade=?,carNum=?,iphone=?,name=? where customerId = ${id}` ;
  connection.query(addSql,[grade, carNum, iphone, name],function (err, result) {
          if(err){
           console.log("update"+err.message);
           return;
          } else {
              console.log('update ID:',result);        
              res.json(result);
          }     
  });
});
module.exports = router;