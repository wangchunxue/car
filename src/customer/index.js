import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from '../main';
import { Button, Layout, Menu, Breadcrumb, Icon, Tabs, Input, DatePicker, Select } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
const Option = Select.Option;
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
class Add extends Component{
    constructor(props){
        super(props);
        this.customerSave = this.customerSave.bind(this);
    }
    customerSave(){
        
    }
    render(){
        return (
            <div>
                <h3>添加新顾客</h3>
                <hr />
                <form method="post">
                    <table data-toggle="table" className="customer-table">
                        <thead>
                            <tr>
                                <th>顾客姓名</th>
                                <th>联系方式</th>
                                <th>车牌号码</th>
                                <th>顾客等级</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Input></Input></td>
                                <td><Input></Input></td>
                                <td><Input></Input></td>
                                <td> <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="顾客等级"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                    <Option value="1">vip用户</Option>
                                    <Option value="0">普通用户</Option>
                                </Select></td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <span className="customer-user">业务员：贝壳</span>
                    <Button className="customer-save" type="primary" onClick={this.customerSave}>保存</Button>
                    <Button className="customer-exit" type="primary">退出</Button>
                </form>
            </div>
        );
    }

}
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
                        <Menu.Item key="1"><Icon type="user-add" /><span>add customer</span></Menu.Item>
                        <Menu.Item key="2"><Icon type="pushpin" /><span>fix customer</span></Menu.Item>
                        <Menu.Item key="3"><Icon type="delete" /><span>delete customer</span></Menu.Item>
                        <Menu.Item key="4"><Icon type="search" /><span>query customer</span></Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0, height: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <div className="business-content" >
                            {this.state.add ? <Add /> : false}
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
