import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from '../main';
import { Button, Layout, Menu, Breadcrumb, Icon, Alert } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
import User from "./user";
import Worker from "./worker";
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SiderDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            worker: true,
            user: false
        };
        this.onCollapse = this.onCollapse.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    onCollapse(collapsed) {
        this.setState({ collapsed });
    }
    onClick(item) {
        if (item.key == 7) {
            this.setState({
                worker: false,
                user: true
            });
        } else if (item.key == 8) {
            this.setState({
                worker: true,
                user: false
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
                        <Menu.Item key="8">
                            <Icon type="user" />
                            <span>worker</span>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Icon type="user" />
                            <span>user</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0, height: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <div className="business-content" >
                            {this.state.user ? <User/> : false}
                            {this.state.worker ? <Worker/> : false}                            
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
class Employee extends Component {
    render() {
        return (
            <div className="employee-main">
                <Main />
                <SiderDemo />
            </div>
        );
    }
}
ReactDOM.render(<Employee />, document.getElementById('employee'));
