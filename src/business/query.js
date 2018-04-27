import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from '../main';
import { Button, Layout, Tabs, Input, Select } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
class Query extends Component {
    constructor(props) {
        super(props)
        this.state = {
            queryCustomeName: '',
            queryGoodname: '',
            queryData: null,
            queryTime: '',
            isShow: false
        }
        this.qCNChange = this.qCNChange.bind(this);
        this.qGNChange = this.qGNChange.bind(this);
        this.queryClick = this.queryClick.bind(this);
        this.timeChange = this.timeChange.bind(this);
    }
    postData(url, data) {
        return fetch(url, {
            body: JSON.stringify(data),
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer',
        })
            .then(response => response.json())
    }
    qCNChange(e) {
        this.setState({
            queryCustomeName: e.target.value
        });
    }
    qGNChange(e) {
        this.setState({
            queryGoodname: e.target.value
        });
    }
    queryClick() {
        const { queryCustomeName, queryGoodname, querySever, queryTime } = this.state;
        const data = {
            CustomeName: queryCustomeName,
            Goodname: queryGoodname,
            time: queryTime
        }
        this.postData('http://localhost:3000/business/query', data).then((res) => {
            console.log(res);
            this.setState({
                queryData: res,
                isShow: true
            });
        })
    }
    timeChange(e){
        this.setState({
            queryTime: e.target.value            
        })
    }
    renderItem() {
        let queryData = this.state.queryData || [];
        
        var qqq = queryData.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.orderNum}</td>
                    <td>{item.name}</td>
                    <td>{item.time}</td>
                    <td>{item.goodsName}</td>
                    <td>{item.goodsPrice}</td>
                    <td>{item.num}</td>
                    <td>{item.totalPrice}</td>                    
                </tr>
            );
        });
        return (
            <tbody>
                {qqq}
            </tbody>
        )
    }
    render() {
        return (
            <div className='query-business'>
                <h3>查询订单流水</h3>
                <hr />
                <span>顾客姓名<Input onChange={this.qCNChange}></Input></span>
                <span>货品名称<Input onChange={this.qGNChange}></Input></span>
                <span>日期<Input onChange={this.timeChange}></Input></span>                
                <Button type="primary" onClick={this.queryClick}>查询</Button>
                {this.state.queryData
                    ? <div>
                        <h3>查询结果</h3>
                        <hr />
                        <table data-toggle="table" className="business-table">
                            <thead>
                                <tr>
                                    <th>流水单号</th>
                                    <th>顾客名</th>
                                    <th>日期</th>
                                    <th>货物</th>
                                    <th>单价</th>
                                    <th>数量</th>
                                    <th>金额</th>
                                </tr>
                            </thead>
                            {this.renderItem()}
                        </table>
                    </div>
                    : false
                }
            </div>
        )
    }
}
export default Query;