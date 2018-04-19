import React, { Component } from 'react';
import ReactDOM from 'react-dom';
var echarts = require('echarts');
require('echarts/lib/chart/pie') //图表类型
require('echarts/lib/component/title') //标题插件
class Chart extends Component {
    componentDidMount(){
        this.demo();
    }
    demo() {
        try{
            var myChart = echarts.init(document.getElementById('business-chart'));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        }catch(e){console.log(e)}

    }
    render() {
        return (
            <div id="business-chart">
            </div>
        )
    }
}
export default Chart;