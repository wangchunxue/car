import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from '../main';
import Chart from './chart';
import Add from './add';
import Query from './query';
import { Button, Layout, Menu, Breadcrumb, Icon, Tabs, Input, DatePicker } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import { Router, Route, Link, hashHistory } from 'react-router';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;

class SiderDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      add: true,
      query: false,
      total: false,
    };
    this.onCollapse = this.onCollapse.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onCollapse(collapsed) {
    console.log(1);
    this.setState({ collapsed });
  }
  onClick(item) {
    if (item.key == 10) {
      this.setState({
        add: true,
        query: false,
        total: false,
      });
    } else if (item.key == 11) {
      this.setState({
        add: false,
        query: true,
        total: false,
      });
    } else if (item.key == 13) {
      this.setState({
        add: false,
        query: false,
        total: true,
      });
    }

  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.onClick}>
            <Menu.Item key="10"> <Icon type="user" /><span>add business</span></Menu.Item>
            <Menu.Item key="11"> <Icon type="user" /><span>query business</span></Menu.Item>
            <Menu.Item key="13"> <Icon type="user" /><span>total business</span></Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, height: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div className="business-content" >
              {this.state.add ? <Add /> : false}
              {this.state.query ? <Query />  : false}
              {this.state.total ? <Chart/> : false}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            car stystem ©2018 Created by 王春雪
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
class Business extends Component {
  render() {
    return (
      <div className="business-container">
        <Main />
        <SiderDemo />
      </div>
    );
  }
}
ReactDOM.render(<Business />, document.getElementById('business'));
