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
    var sql = `insert into t_business(total, businessNum) values(${req.body.total},${req.body.businessNum})`;
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

router.post('/query', function (req, res) {
    console.log(req.body);
    const data = req.body;
    let sql = '';
    let sqlCustomer = `select * from t_order, t_business, t_customer, t_goods where t_order.orderNum = t_business.businessNum and t_order.customerId = t_customer.customerId and t_order.goodsId = t_goods.goodsId and name = '${data.CustomeName}'`
    let sqlGoods = `select * from t_order, t_business,t_customer, t_goods where t_order.orderNum = t_business.businessNum and t_order.goodsId = t_goods.goodsId and t_order.customerId = t_customer.customerId and t_goods.goodsName= '${data.Goodname}'`;
    let sqlTime = `select * from t_order, t_customer, t_business, t_goods where t_order.orderNum = t_business.businessNum and t_order.goodsId = t_goods.goodsId and t_order.customerId = t_customer.customerId and t_order.time = '${data.time}'`;   
    let sqlCustomerTime = `select * from t_order, t_customer, t_business, t_goods where t_order.orderNum = t_business.businessNum and t_order.goodsId = t_goods.goodsId and t_order.customerId = t_customer.customerId and t_order.time = '${data.time}' and name = '${data.CustomeName}'`;    
    let sqlCustomerGoods = `select * from t_order, t_business, t_customer, t_goods where t_order.orderNum = t_business.businessNum and t_order.customerId = t_customer.customerId and t_order.goodsId = t_goods.goodsId and t_customer.name = '${data.CustomeName}' and t_goods.goodsName = '${data.Goodname}'`;
    let all = `select * from t_order, t_business, t_customer, t_goods where t_order.orderNum = t_business.businessNum and t_order.customerId = t_customer.customerId and t_order.goodsId = t_goods.goodsId and t_customer.name = '${data.CustomeName}' and t_goods.goodsName = '${data.Goodname}' and t_order.time = '${data.time}'`;
    if(data.CustomeName && !data.Goodname &&!data.time){
        sql = sqlCustomer;
    } else if(!data.CustomeName && !data.Goodname && data.time){
        sql = sqlTime;
    } else if(!data.CustomeName && data.Goodname &&!data.time){
        sql = sqlGoods;
    } else if(data.CustomeName && !data.Goodname && data.time){
        sql = sqlCustomerTime;
    } else if(data.CustomeName && data.Goodname &&!data.time) {
        sql = sqlCustomerGoods
     } else {
        sql = all;
     }
    connection.query(sql, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            console.log(result);
            res.json(result);
        }
    }); 
});

module.exports = router;
