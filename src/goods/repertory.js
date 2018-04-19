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
class Repertoty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addName: '',
            allData: null,
            queryData: null,
            fixName: '',
            isfix: false
        }
        this.addNameChange = this.addNameChange.bind(this);
        this.addClick = this.addClick.bind(this);
        this.queryNameChange = this.queryNameChange.bind(this);
        this.queryClick = this.queryClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
        this.fixClick = this.fixClick.bind(this);
        this.fixNameChange = this.fixNameChange.bind(this);
    }
    componentDidMount() {
        this.getData();
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
        fetch("repertory/queryAll", { method: "get" }).then(function (res) {
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
    addNameChange(e) {
        this.setState({ addName: e.target.value })
    }
    addClick() {
        const { addName } = this.state;
        const data = {
            name: addName
        };
        if (!addName) {
            alert('请输入有效的信息');
            return;
        }
        this.postData('http://localhost:3000/repertory/add', data).then(res => {
            this.getData();
            alert('增加信息成功');
        });

    }
    fixNameChange(e){
        this.setState({
            fixName: e.target.value
        })
    }
    fixClick() {
        const { fixName, queryData } = this.state;
        const data = {
            name: fixName,
            id: queryData[0].repertoryId
        };
        if (!data.name) {
            alert('请输入修改信息后在提交');
            return;
        }
        this.postData('http://localhost:3000/repertory/update', data).then(res => {
            alert('更新信息成功');
            this.getData();
        });

    }
    deleteClick() {
        const data = {
            id: this.state.queryData[0].repertoryId
        }
        this.postData('http://localhost:3000/repertory/delete', data).then(res => {
            this.getData();            
            this.setState({
                isfix: false
            });
            alert('删除信息成功');
        });
    }
    renderItem() {
        let allData = this.state.allData || [];
        var qqq = allData.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.repertoryName}</td>
                    <td>{item.goodsName}</td>
                    <td>{item.goodsNum}</td>
                    <td>{item.goodsPrice}</td>
                </tr>
            );
        });
        return (
            <tbody>
                {qqq}
            </tbody>
        )
    }
    queryNameChange(e) {
        this.setState({
            queryName: e.target.value
        })
    }
    queryClick() {
        let queryName = this.state.queryName;
        const data = {
            name: queryName
        }
        this.postData('http://localhost:3000/repertory/query', data).then((res) => {
            if (res.length < 1) {
                alert('没有此仓库');
            } else {
                this.setState({
                    queryData: res,
                    isfix: true
                });
            }
        });
    }
    render() {
        return (
            <div className="repertory">
                <div className="add-repertory">
                    <h3>新增仓库</h3>
                    <span>仓库名称: <Input onChange={this.addNameChange}></Input></span>
                    <Button type="primary" onClick={this.addClick}>增加</Button>
                    <hr />
                </div>
                <div className="fix-repertory">
                    <h3>修改仓库信息</h3>
                    <span>仓库名称: <Input onChange={this.queryNameChange}></Input></span>
                    <Button type="primary" onClick={this.queryClick}>查询</Button>
                    <hr />
                    {this.state.isfix ? <div>
                        <span>仓库名称: <Input onChange={this.fixNameChange} defaultValue={this.state.queryData[0].repertoryName}></Input></span>
                        <Button type="primary" onClick={this.fixClick}>修改提交</Button>
                        <Button type="primary" onClick={this.deleteClick}>删除</Button>
                    </div> : false}

                    <hr />
                </div>
                <div className="query-repertory">
                    <h3>货物列表</h3>
                    <table data-toggle="table" className="repertory-table">
                        <thead>
                            <tr>
                                <th>仓库名称</th>
                                <th>配件名称</th>
                                <th>配件数量</th>
                                <th>进厂价</th>
                            </tr>
                        </thead>
                        {this.state.allData
                            ? this.renderItem()
                            : false}
                    </table>
                    <hr />
                </div>
            </div>
        );
    }
}
export default Repertoty;