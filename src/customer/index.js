import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from '../main';
import { Button, Layout, Menu, Breadcrumb, Icon, Alert } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SiderDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            add: true,
            fix: false,
            query: false,
            delete: false
        };
        this.onCollapse = this.onCollapse.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    onCollapse(collapsed) {
        this.setState({ collapsed });
    }
    onClick(item) {
        if (item.key == 1) {
            this.setState({
                add: true,
                fix: false,
                query: false,
                delete: false
            });
        } else if (item.key == 2) {
            this.setState({
                add: false,
                fix: true,
                query: false,
                delete: false
            });
        } else if (item.key == 3) {
            this.setState({
                add: false,
                fix: false,
                query: true,
                delete: false
            });
        } else if (item.key == 4) {
            this.setState({
                add: false,
                fix: false,
                query: false,
                delete: true
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
                        <Menu.Item key="1">add customer</Menu.Item>
                        <Menu.Item key="2">fix customer</Menu.Item>
                        <Menu.Item key="3">delete customer</Menu.Item>
                        <Menu.Item key="4">query customer</Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0, height: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <div className="business-content" >
                            {this.state.add ? <div>add is a cat.</div> : false}
                            {this.state.query ? <div>query is a cat.</div> : false}
                            {this.state.fix ? <div>fix is a cat.</div> : false}
                            {this.state.delete ? <div>delete is a cat.</div> : false}
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
class Customer extends Component {
    render() {
        return (
            <div className="customer-container">
                <Main />
                <SiderDemo />
            </div>
        );
    }
}
ReactDOM.render(<Customer />, document.getElementById('customer'));
