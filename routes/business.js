var express = require('express');
var app = express();
var router = express.Router();
var connection = require('../models/db'); // 使用连接池连接数据库
router.post('/add', function (req, res) {
    var sql = `insert into t_order(customerId, goodsId, price, num, time, workerId, totalPrice, orderNum) values(${req.body.customerId},${req.body.goodsId},${req.body.Price},${req.body.needNum},${req.body.time},${req.body.workerId},${req.body.singeMoney},${req.body.orderNum})`;
    connection.query(sql, function (error, results) {
        if (error) {
          console.log(error);
        } else {
          res.json(results);
        }
      });
});
router.post('/addBusiness', function (req, res) {
    var sql = `insert into t_business(OrderId, total, businessNum) values(${req.body.id},${req.body.total},${req.body.businessNum})`;
    connection.query(sql, function (error, results) {
        if (error) {
          console.log(error);
        } else {
          res.json(results);
        }
      });
});
router.post('/queryOrder', function (req, res) {
    console.log(req.body);
    const sql = `select * from t_order where orderNum = '${req.body.orderNum}'`;
    connection.query(sql, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            res.json(result);
        }
    });
});
module.exports = router;
