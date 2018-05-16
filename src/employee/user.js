import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from '../main';
import { Button, Layout, Menu, Breadcrumb, Icon, Tabs, Input, DatePicker, Select } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addPsw: '',
            addName: '',
            queryName: '',
            queryResult: [],
            fixName: '',
            fixPsw: ''
        }
        this.addClick = this.addClick.bind(this);
        this.addNameChange = this.addNameChange.bind(this);
        this.addPswChange = this.addPswChange.bind(this);
        this.queryNameChange = this.queryNameChange.bind(this);
        this.queryClick = this.queryClick.bind(this);
        this.fixClick = this.fixClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
        this.fixNameChange = this.fixNameChange.bind(this);
        this.fixPswChange = this.fixPswChange.bind(this);
    }
    addPswChange(e) {
        this.setState({
            addPsw: e.target.value
        });
    }
    addNameChange(e) {
        this.setState({
            addName: e.target.value
        });
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
    addClick() {
        const { addName, addPsw } = this.state;
        const data = {
            name: addName,
            password: addPsw
        };
        if (!addName && !addPsw) {
            alert("请填写信息后在提交");
            return;
        }
        this.postData('http://localhost:3000/user/add', data).then(res => {
            alert("添加信息成功");
        });
    }
    queryNameChange(e) {
        this.setState({
            queryName: e.target.value
        });
    }
    queryClick() {
        const { queryName } = this.state;
        const data = {
            name: queryName
        };
        if (!queryName) {
            alert("请填写信息后在提交");
            return;
        }
        this.postData('http://localhost:3000/user/query', data).then(res => {
            console.log(res);
            this.setState({
                queryResult: res
            });
        });
    }
    fixClick() {
        const { fixName, fixPsw, queryResult } = this.state;
        const data = {
            name: fixName || queryResult[0].name,
            password: fixPsw || queryResult[0].password,
            id: queryResult[0].userId
        }
        this.postData('http://localhost:3000/user/update', data).then(res => {
            console.log(res);
            alert("信息成功");
        });
    }
    fixNameChange(e) {
        this.setState({
            fixName: e.target.value || this.state.queryResult[0].name
        });
    }
    fixPswChange(e) {
        this.setState({
            fixPsw: e.target.value || this.state.queryResult[0].password
        });
    }
    deleteClick() {
        const { queryResult } = this.state;
        const data = {
            id: queryResult[0].userId
        }
        this.postData('http://localhost:3000/user/delete', data).then(res => {
            alert('信息删除成功');
            this.queryClick();
        });
    }
    renderItem() {
        var queryData = this.state.queryResult;
        var qqq = queryData.map((item, index) => {
            return (
                <div key={index}>
                    <span>账号<Input defaultValue={item.name} onChange={this.fixNameChange}></Input></span>
                    <span>密码<Input defaultValue={item.password} onChange={this.fixPswChange}></Input></span>
                    <Button type="primary" onClick={this.fixClick}>修改</Button>
                    <Button type="primary" onClick={this.deleteClick}>删除</Button>
                </div>
            );
        });
        return qqq;
    }
    render() {
        return (
            <div className="user">
                <div className="add-user">
                    <h3>新增管理员信息</h3>
                    <span>账号:<Input onChange={this.addNameChange}></Input></span>
                    <span className="psw-input"> 密码:<Input onChange={this.addPswChange}></Input></span>
                    <Button type="primary" onClick={this.addClick}>添加</Button>
                    <hr />
                </div>
                <div className="fix-user">
                    <h3>查询管理员信息</h3>
                    <span>账号:<Input onChange={this.queryNameChange}></Input></span>
                    <Button type="primary" onClick={this.queryClick}>查询</Button>
                    {this.state.queryResult.length > 0
                        ? this.renderItem()
                   : false}
                    <hr />
                </div>
            </div>
        );
    }
}
export default User;