import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { indexOf } from 'zrender/lib/core/util';
var echarts = require('echarts');
require('echarts/lib/chart/pie') //图表类型
require('echarts/lib/component/title') //标题插件
class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goodsData: [],
            goodsName: [],
            goodsNum: [],
            goodsPie:[]
        }
    }
    componentDidMount() {
        this.getData();
    }
    getData() {
        var me = this;
        fetch("goods/queryGoods", { method: "get" }).then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    if (data) {
                        me.dealGoods(data);
                    }
                });
            } else {
                console.log("Looks like the response wasn't perfect, got status", res.status);
            }
        }, function (e) {
            console.log("Fetch failed!", e);
        });
    }
    dealGoods(data) {
        let { goodsData, goodsName, goodsNum,goodsPie } = this.state;
        if (data.length > 0) {
            data.forEach((item, index) => {
                var goodsItem = {
                    name: item.goodsName,
                    value:item.goodsNum
                }
                goodsPie.push(goodsItem);
                goodsName.push(item.goodsName + `(${item.repertoryName})`);
                goodsNum.push(item.goodsNum);
            });
            this.setState({
                goodsData: data,
                goodsName: goodsName,
                goodsNum: goodsNum
            });
            this.demoOne();
            //this.demoTwo();
        }
    }
    demoOne() {
        var myChart = echarts.init(document.getElementById('business-one'));
        // 绘制图表
        let { goodsData, goodsName, goodsNum } = this.state;
        myChart.setOption({
            title: {
                text: '货物配件库存'
            },
            tooltip: {},
            xAxis: {
                data: goodsName
            },
            yAxis: {},
            series: [{
                name: '库存',
                type: 'bar',
                data: goodsNum
            }]
        });
    } 
    demoTwo() {
        var myChart = echarts.init(document.getElementById('business-two'));
        // 绘制图表
        let { goodsPie } = this.state;
        myChart.setOption({
            title: {
                text: '货物配件库存'
            },
            series: [{
                name: '库存',
                type: 'pie',
                data:  goodsPie
            }]
        });
    } 
    render() {
        return (
            <div id="business-chart">
                <div id="business-one"></div>
                <div id="business-two"></div>                    
            </div>
        )
    }
}
export default Chart;