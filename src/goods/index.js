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
            info: true,
            managent: false
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
                info: true,
                managent: false
            });
        } else if (item.key == 2) {
            this.setState({
                info: false,
                managent: true
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
                        <Menu.Item key="1"><Icon type="table" /><span>goods info</span></Menu.Item>
                        <Menu.Item key="2"><Icon type="fork" /><span>goods mangent</span></Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0, height: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                    <div className="business-content" >
                            {this.state.info ? <div>fix is a cat.</div> : false}
                            {this.state.managent ? <div>delete is a cat.</div> : false}
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
class Goods extends Component {
    render() {
        return (
            <div className="goods-container">
                <Main />
                <SiderDemo />
            </div>
        );
    }
}
ReactDOM.render(<Goods />, document.getElementById('goods'));

