import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import './index.css';
class Main extends Component {
    render() {
      return (
        <div className="main">
          <ul className="main-tips">
            <li className="main-logo"></li>
            <li className="main-menu">
              <Button type="primary"><a href="business.html">业务管理</a></Button>
              <Button type="primary"><a href="customer.html">顾客信息</a></Button>
              <Button type="primary"><a href="employee.html">员工信息</a></Button>
              <Button type="primary"><a href="goods.html">货物管理</a></Button>
            </li>
          </ul>
          <hr />
        </div>
      );
    }
  }
  export default Main