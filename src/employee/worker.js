import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from '../main';
import { Button, Layout, Menu, Breadcrumb, Icon, Tabs, Input, DatePicker, Select } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


class Worker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: null,
            isFix: false,
            currData: null,
            fixName: '',
            fixSex: '',
            fixIphone: '',
            fixSort: '',
            fixSalary: '',
            queryName: '',
            addSort: '',
            addSalary: null,
            addIphone: null,
            addName: ''
        }
        this.deleteInfo = this.deleteInfo.bind(this);
        this.fixInfo = this.fixInfo.bind(this);
        this.salaryChange = this.salaryChange.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.iphoneChange = this.iphoneChange.bind(this);
        this.sexChange = this.sexChange.bind(this);
        this.exitClick = this.exitClick.bind(this);
        this.saveClick = this.saveClick.bind(this);
        this.queryClick = this.queryClick.bind(this);
        this.queryChange = this.queryChange.bind(this);
        this.addSortChange = this.addSortChange.bind(this);
        this.addSalaryChange = this.addSalaryChange.bind(this);
        this.addSexChange = this.addSexChange.bind(this);
        this.addIphoneChange = this.addIphoneChange.bind(this);
        this.addNameChange = this.addNameChange.bind(this);
        this.addClick = this.addClick.bind(this);
    }
    componentDidMount() {
        this.getData();
    }
    addSortChange(e) {
        this.setState({
            addSort: e.target.value
        })
    }
    addSalaryChange(e) {
        this.setState({
            addSalary: e.target.value
        })
    }
    addSexChange(value) {
        this.setState({
            addSex: `${value}`
        })
    }
    addIphoneChange(e) {
        this.setState({
            addIphone: e.target.value
        })
    }
    addNameChange(e) {
        this.setState({
            addName: e.target.value
        })
    }
    addClick() {
        const { addName, addIphone, addSalary, addSort, addSex } = this.state;
        const data = {
            name: addName,
            iphone: addIphone,
            salary: addSalary,
            sort: addSort,
            sex: addSex
        }
        this.postData('http://localhost:3000/worker/add', data).then(res => {
            alert('增加信息成功');
            this.getData();
        });
    }
    deleteInfo(index) {
        let allData = this.state.allData;
        const data = {
            id: allData[index].workerId
        }
        this.postData('http://localhost:3000/worker/delete', data).then(res => {
            this.getData();
            alert('信息删除成功');
        });
    }
    fixInfo(index) {
        let allData = this.state.allData;
        this.setState({
            currData: allData[index],
            isFix: true
        });

    }
    nameChange(e) {
        this.setState({
            fixName: e.target.value
        })
    }
    sortChange(value) {
        this.setState({
            fixSort: `${value}`
        })
    }
    iphoneChange(e) {
        this.setState({
            fixIphone: e.target.value
        })
    }
    sexChange(value) {
        this.setState({
            fixSex: `${value}`
        });
    }
    salaryChange(e) {
        this.setState({
            fixSalary: e.target.value
        });
    }
    exitClick() {
        this.setState({
            isFix: false
        });
    }
    saveClick() {
        const { fixName, fixSort, fixIphone, fixSalary, fixSex, currData } = this.state;
        const data = {
            sort: fixSort || currData.sort,
            sex: fixSex || currData.sex,
            iphone: fixIphone || currData.iphone,
            name: fixName || currData.workerName,
            salary: fixSalary || currData.salary,
            id: currData.workerId
        }
        this.postData('http://localhost:3000/worker/update', data).then(res => {
            alert('修改信息成功');
            this.setState({
                isFix: fals
            })
            this.getData();
        });
    }
    queryChange(e) {
        this.setState({
            queryName: e.target.value
        });
    }
    queryClick() {
        const data = {
            name: this.state.queryName,
        }
        this.postData('http://localhost:3000/worker/query', data).then(res => {
            alert('查询信息成功');
            this.setState({
                allData: res
            })
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
    getData() {
        var me = this;
        fetch("worker/all", { method: "get" }).then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    if (data) {
                        me.setState({
                            allData: data
                        })
                    }
                });
            } else {
                console.log("Looks like the response wasn't perfect, got status", res.status);
            }
        }, function (e) {
            console.log("Fetch failed!", e);
        });
    }
    renderAllList() {
        let allData = this.state.allData;

        if (allData) {
            var aaa = allData.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.workerName}</td>
                        <td>{item.iphone}</td>
                        <td>{item.sex}</td>
                        <td>{item.sort}</td>
                        <td>{item.salary}</td>
                        <td>
                            <Button type="primary" onClick={() => { this.deleteInfo(index) }}>删除</Button>
                            <Button type="primary" onClick={() => { this.fixInfo(index) }}>修改</Button>
                        </td>
                    </tr>
                );
            });
            return aaa;
        }
    }
    render() {
        return (
            <div className="worker">
                <div className="query-worker">
                    <h3>查询工人信息</h3>
                    <hr />
                    <span>姓名: <Input onChange={this.queryChange}></Input></span>
                    <Button type="primary" onClick={this.queryClick}>查询</Button>
                </div>
                <div className="add-worker">
                    <h3>新增工人信息</h3>
                    <hr />
                    <span>姓名: <Input onChange={this.addNameChange}></Input></span>
                    <span>电话: <Input onChange={this.addIphoneChange}></Input></span>
                    <span>性别:  <Select
                        showSearch
                        style={{ width: 200 }}
                        onChange={this.addSexChange}
                        placeholder="性别"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        <Option value="女">女</Option>
                        <Option value="男">男</Option>
                    </Select></span>
                    <span>薪水: <Input onChange={this.addSalaryChange}></Input></span>
                    <span>工种: <Select
                        showSearch
                        style={{ width: 200 }}
                        onChange={this.addSortChange}
                        placeholder="工种"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        <Option value="学徒">学徒</Option>
                        <Option value="经理">经理</Option>
                        <Option value="货物搬运工">货物搬运工</Option>
                        <Option value="业务">业务员</Option>
                        <Option value="仓维修员">维修员</Option>
                    </Select></span>
                    <Button type="primary" onClick={this.addClick}>增加</Button>
                </div>
                {this.state.isFix
                    ? <div className="fix-worker">
                        <h3>修改工人信息列表</h3>
                        <hr />
                        <table border="1" data-toggle="table" className="worker-table">
                            <thead>
                                <tr>
                                    <th>姓名</th>
                                    <th>电话号码</th>
                                    <th>性别</th>
                                    <th>类别</th>
                                    <th>工资</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><Input defaultValue={this.state.currData.workerName} onChange={this.nameChange}></Input></td>
                                    <td><Input defaultValue={this.state.currData.iphone} onChange={this.iphoneChange}></Input></td>
                                    <td>
                                        <Select
                                            showSearch
                                            style={{ width: 200 }}
                                            defaultValue={this.state.currData.sex}
                                            onChange={this.sexChange}
                                            placeholder="性别"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                            <Option value="女">女</Option>
                                            <Option value="男">男</Option>
                                        </Select></td>
                                    <td>
                                        <Select
                                            showSearch
                                            style={{ width: 200 }}
                                            defaultValue={this.state.currData.sort}
                                            onChange={this.sortChange}
                                            placeholder="工种"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                            <Option value="学徒">学徒</Option>
                                            <Option value="经理">经理</Option>
                                            <Option value="货物搬运工">货物搬运工</Option>
                                            <Option value="业务">业务员</Option>
                                            <Option value="仓维修员">维修员</Option>
                                        </Select></td>
                                    <td><Input defaultValue={this.state.currData.salary} onChange={this.salaryChange}></Input></td>
                                    <td>
                                        <Button type="primary" onClick={this.saveClick}>保存信息</Button>
                                        <Button type="primary" onClick={this.exitClick}>退出编辑</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    : false}
                <div className="workers">
                    <h3>工人信息列表</h3>
                    <hr />
                    <table  data-toggle="table" className="worker-table">
                        <thead>
                            <tr>
                                <th>姓名</th>
                                <th>电话号码</th>
                                <th>性别</th>
                                <th>类别</th>
                                <th>工资</th>
                            </tr>
                        </thead>
                        <tbody>{this.renderAllList()}</tbody>
                    </table>
                    <hr />
                </div>
            </div>
        );
    }
}
export default Worker;