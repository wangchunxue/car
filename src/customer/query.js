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
class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            queryData: null,
            isFix: false,
            currData: null,
            fixIphone: null,
            fixCar: '',
            fixname: '',
            fixGrade: null,
        }
        this.queryTell = this.queryTell.bind(this);
        this.queryName = this.queryName.bind(this);
        this.queryClick = this.queryClick.bind(this);
        this.curdelClick = this.curdelClick.bind(this);
        this.curFixClick = this.curFixClick.bind(this);
        this.saveFixInfo = this.saveFixInfo.bind(this);
        this.exitFixInfo = this.exitFixInfo.bind(this);
        this.gradeChange = this.gradeChange.bind(this);
        this.carChange = this.carChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.iphoneChange = this.iphoneChange.bind(this);

    }
    gradeChange(value) {
        this.setState({
            fixGrade: `${value}`
        })
    }
    carChange(e) {
        this.setState({
            fixCar: e.target.value
        })
    }
    nameChange(e) {
        this.setState({
            fixName: e.target.value || this.state.currData.name
        })
    }
    iphoneChange(e) {
        this.setState({
            fixIphone: e.target.value
        });
    }
    exitFixInfo() {
        this.setState({
            isFix: false
        });
    }
    saveFixInfo() {
        const { fixGrade, fixName, fixCar, fixIphone, currData } = this.state;
        const data = {
            id: currData.customerId,
            grade: fixGrade || currData.grade,
            name: fixName || currData.name,
            carNum: fixCar || currData.carNum,
            iphone: fixIphone || currData.iphone
        };
        this.postData('http://localhost:3000/customer/update', data).then(res => {
            alert("修改信息成功");
            this.queryClick();
        });
    }
    curFixClick(index) {
        let queryData = this.state.queryData;
        this.setState({
            isFix: true,
            currData: queryData[index]
        })
    }
    curdelClick(index) {
        let queryData = this.state.queryData || [];
        const data = {
            id: queryData[index].customerId
        };
        this.postData('http://localhost:3000/customer/delete', data).then(res => {
            let { name, tell } = this.state;
            const data = {
                name: name,
                iphone: tell
            };
            this.postData('http://localhost:3000/customer/query', data).then(res => {
                this.setState({ queryData: res });
            });
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
    queryTell(e) {
        this.setState({
            tell: e.target.value
        });
    }
    queryName(e) {
        this.setState({
            name: e.target.value
        });
    }
    queryClick() {
        let { name } = this.state;
        const data = {
            name: name
        };
        if (!name) {
            alert("请输入查询条件");
            return;
        }
        this.postData('http://localhost:3000/customer/query', data).then(res => {
            this.setState({ queryData: res });
        });
    }
    renderItem() {
        let queryData = this.state.queryData || [];
        if (queryData.length < 1) {
            return (
                <tbody align="center"><tr><th>很抱歉，查无此人</th></tr></tbody>
            )
        }
        var qqq = queryData.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.iphone}</td>
                    <td>{item.carNum}</td>
                    <td>{item.grade}</td>
                    <td>
                        <Button type="primary" onClick={() => { this.curdelClick(index) }}>删除</Button>
                        <Button type="primary" onClick={() => { this.curFixClick(index) }}>修改</Button>
                    </td>
                </tr>
            );

        });
        return (
            <tbody>
                {qqq}
            </tbody>
        )
    }
    render() {
        return (
            <div>
                <h3>查询顾客</h3>
                <hr />
                <div>
                    顾客姓名:<Input onChange={this.queryName}></Input>
                    <Button type="primary" onClick={this.queryClick}>查询</Button>
                </div>
                {
                    this.state.isFix
                        ? <div className="fix-customer">
                            <h3>修改顾客信息</h3>
                            <hr />
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
                                        <td><Input defaultValue={this.state.currData.name} onChange={this.nameChange} /></td>
                                        <td><Input defaultValue={this.state.currData.iphone} onChange={this.iphoneChange} /></td>
                                        <td><Input defaultValue={this.state.currData.carNum} onChange={this.carChange} /></td>
                                        <td>
                                            <Select
                                                showSearch
                                                style={{ width: 200 }}
                                                onChange={this.gradeChange}
                                                defaultValue={this.state.currData.grade}
                                                placeholder="顾客等级"
                                                optionFilterProp="children"
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                                <Option value="2">vip用户</Option>
                                                <Option value="1">普通用户</Option>
                                            </Select>
                                        </td>
                                        <td>
                                            <Button type="primary" onClick={this.saveFixInfo}>保存修改信息</Button>
                                            <Button type="primary" onClick={this.exitFixInfo}>退出修改信息</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        : false
                }
                <div className="query-result-customer">
                    <h3>查询结果</h3>
                    <hr />
                    <table data-toggle="table" className="customer-table">
                        <thead>
                            <tr>
                                <th>顾客姓名</th>
                                <th>联系方式</th>
                                <th>车牌号码</th>
                                <th>顾客等级</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        {this.state.queryData
                            ? this.renderItem()
                            : <tbody align="center"><tr><th>暂无查询数据</th></tr></tbody>}
                    </table>
                    <hr />
                </div>
            </div>
        );
    }
}
export default Show;