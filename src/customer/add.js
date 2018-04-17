import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Mask from 'mask';
import './index.css';
import Main from '../main';
import { Button, Layout, Menu, Breadcrumb, Icon, Tabs, Input, DatePicker, Select } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
const Option = Select.Option;
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerName: '',
            customerTell: '',
            carNo: '',
            customerLevel: ''
        };
        this.customerSave = this.customerSave.bind(this);
        this.customeChange = this.customeChange.bind(this);
        this.tellChange = this.tellChange.bind(this);
        this.carChange = this.carChange.bind(this);
        this.levelChange = this.levelChange.bind(this);
    }
    customeChange(e) {
        this.setState({ customerName: e.target.value });
    }
    tellChange(e) {
        this.setState({ customerTell: e.target.value });
    }
    carChange(e) {
        this.setState({ carNo: e.target.value });
    }
    levelChange(value) {
        this.setState({ customerLevel: `${value}` });
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
    customerSave() {
        let { customerName, customerLevel, carNo, customerTell } = this.state;
        const data = {
            name: customerName,
            grade: customerLevel,
            carNum: carNo,
            iphone: customerTell
        };
        if (!customerName && !customerLevel && !carNo && !customerTell) {
            alert('请输入新增顾客信息');
            return;
        } else {
            this.postData('http://localhost:3000/customer/add', data).then(res => {
                if(res){
                    alert('增加顾客信息成功');
                }
            });
        }
    }
    render() {
        return (
            <div>
                <h3>添加新顾客</h3>
                <hr />
                <form>
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
                                <td><Input onChange={this.customeChange}></Input></td>
                                <td><Input onChange={this.tellChange}></Input></td>
                                <td><Input onChange={this.carChange}></Input></td>
                                <td> <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    onChange={this.levelChange}
                                    placeholder="顾客等级"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                    <Option value="2">vip用户</Option>
                                    <Option value="1">普通用户</Option>
                                </Select></td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <span className="customer-user">业务员：贝壳</span>
                    <Button className="customer-save" type="submit" onClick={this.customerSave}>保存</Button>
                    <Button className="customer-exit" type="primary">退出</Button>
                </form>
            </div>
        );
    }

}
export default Add;