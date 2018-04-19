var express = require('express');
var app = express();
var router = express.Router();
var connection = require('../models/db'); // 使用连接池连接数据库
router.post('/query', function (req, res) {
    console.log(req.body);
    const sql = `select * from t_goods, t_repertory where goodsName = '${req.body.name}' and t_repertory.repertoryId = t_goods.repertoryId`;
    connection.query(sql, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            res.json(result);
        }
    });
});
router.post('/add', function (req, res) {
    var addSql = `INSERT INTO t_goods(goodsId,goodsName,goodsPrice,goodsMarkPrice,goodsNum,repertoryId) VALUES(0,'${req.body.name}','${req.body.price}','${req.body.sale}','${req.body.num}','${req.body.repert}')`;
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
router.post('/update', function (req, res) {
    let id = req.body.id;
    let [goodsId, goodsName, goodsPrice, goodsMarkPrice, goodsNum, repertoryId] = [req.body.name, req.body.price, req.body.sale, req.body.num, req.body.repert];
    var addSql = `update t_goods set goodsName=?,goodsPrice=?,goodsMarkPrice=?,goodsNum=?,repertoryId=? where goodsId = ${id}`;
    connection.query(addSql, [goodsId, goodsName, goodsPrice, goodsMarkPrice, goodsNum, repertoryId], function (err, result) {
        if (err) {
            console.log("update" + err.message);
            return;
        } else {
            console.log('update ID:', result);
            res.json(result);
        }
    });
});
router.post('/updateNum', function (req, res) {
    let id = req.body.id;
    let  goodsNum = [req.body.num];
    var addSql = `update t_goods set goodsNum=? where goodsId = ${id}`;
    connection.query(addSql, goodsNum, function (err, result) {
        if (err) {
            console.log("update" + err.message);
            return;
        } else {
            console.log('update ID:', result);
            res.json(result);
        }
    });
});
router.post('/delete', function (req, res) {
    const sql = `delete from t_goods where goodsId ='${req.body.id}'`;
    connection.query(sql, function (error, results) {
      if (error) {
        console.log(error);
      } else {
        res.json(results);
      }
    });
});
module.exports = router;
