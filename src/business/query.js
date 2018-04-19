import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from '../main';
import { Button, Layout, Tabs, Input, Select } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
class Query extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className='query-business'>
                查询订单流水
            </div>
        )
    }
}
export default Query;