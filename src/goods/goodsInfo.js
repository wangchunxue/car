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
class GoodsInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reperData: [],
            addName: '',
            addPrice: '',
            addSale: '',
            addNum: '',
            addrepert: '',
            fixName: '',
            fixPrice: '',
            fixSale: '',
            fixNum: '',
            fixrepert: '',
            queryName: '',
            queryData: null,
            isfix: false
        }
        this.addNameChange = this.addNameChange.bind(this);
        this.addPriceChange = this.addPriceChange.bind(this);
        this.addSaleChange = this.addSaleChange.bind(this);
        this.addNumChange = this.addNumChange.bind(this);
        this.addrepertChange = this.addrepertChange.bind(this);
        this.addClick = this.addClick.bind(this);
        this.fixNameChange = this.fixNameChange.bind(this);
        this.fixPriceChange = this.fixPriceChange.bind(this);
        this.fixSaleChange = this.fixSaleChange.bind(this);
        this.fixNumChange = this.fixNumChange.bind(this);
        this.fixrepertChange = this.fixrepertChange.bind(this);
        this.fixClick = this.fixClick.bind(this);
        this.exitClick = this.exitClick.bind(this);
        this.queryNameChange = this.queryNameChange.bind(this);
        this.queryClick = this.queryClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);  
    }
    componentDidMount() {
        this.getData();
    }
    deleteClick(){
        const data = {
            id: this.state.queryData[0].goodsId
        }
        this.postData('http://localhost:3000/goods/delete', data).then(res => {
            this.setState({
                isfix: false
            });
            alert('删除信息成功');
        });
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
        this.postData('http://localhost:3000/goods/query', data).then((res) => {
            if (res.length < 1) {
                this.setState({
                    isfix: false
                });
                alert('没有此商品');
            } else {
                this.setState({
                    queryData: res,
                    isfix: true
                });
            }
        });
    }
    exitClick() {
        this.setState({
            isfix: false
        })
    }
    addClick() {
        const { addName, addPrice, addSale, addNum, addrepert } = this.state;
        const data = {
            name: addName,
            price: addPrice,
            sale: addSale,
            num: addNum,
            repert: addrepert
        };
        if (!addName && !addPrice && !addSale && !addNum && !addrepert) {
            alert('请输入有效的信息');
            return;
        }
        this.postData('http://localhost:3000/goods/add', data).then(res => {
            alert('增加信息成功');
        });
    }
    addNameChange(e) {
        this.setState({
            addName: e.target.value
        })
    }
    addPriceChange(e) {
        this.setState({
            addPrice: e.target.value
        })
    }
    addSaleChange(e) {
        this.setState({
            addSale: e.target.value
        })
    }
    addNumChange(e) {
        this.setState({
            addNum: e.target.value
        })
    }
    addrepertChange(value) {
        this.setState({
            addrepert: `${value}`
        })
    }
    fixClick() {
        const { fixName, fixPrice, fixSale, fixNum, fixrepert, addName, addPrice, addSale, addNum, addrepert, queryData } = this.state;
        const data = {
            name: fixName || queryData[0].goodsName,
            price: fixPrice || queryData[0].goodsPrice,
            sale: fixSale || queryData[0].goodsMarkPrice,
            num: fixNum || queryData[0].goodsNum,
            repert: fixrepert || queryData[0].repertoryId,
            id: queryData[0].goodsId
        };
        this.postData('http://localhost:3000/goods/update', data).then(res => {
            alert('更新信息成功');
        });

    }
    fixNameChange(e) {
        this.setState({
            fixName: e.target.value
        })
    }
    fixPriceChange(e) {
        this.setState({
            fixPrice: e.target.value
        })
    }
    fixSaleChange(e) {
        this.setState({
            fixSale: e.target.value
        })
    }
    fixNumChange(e) {
        this.setState({
            fixNum: e.target.value
        })
    }
    fixrepertChange(value) {
        this.setState({
            fixrepert: `${value}`
        })
    }
    renderFixOption() {
        let reperData = this.state.reperData || [];

        if (reperData.length > 0) {
            var aaa = reperData.map((item, index) => {
                return (<Option key={index} value={item.repertoryId}>{item.repertoryName}</Option>);
            });
            return (
                <Select
                    showSearch
                    onChange={this.addrepertChange}
                    style={{ width: 200 }}
                    defaultValue={this.state.queryData[0].repertoryName}
                    placeholder="存储仓库"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    {aaa}
                </Select>
            );
        }
    }
    renderOption() {
        let reperData = this.state.reperData || [];

        if (reperData.length > 0) {
            var aaa = reperData.map((item, index) => {
                return (<Option key={index} value={item.repertoryName}>{item.repertoryName}</Option>);
            });
            return (
                <Select
                    showSearch
                    onChange={this.addrepertChange}
                    style={{ width: 200 }}
                    placeholder="存储仓库"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    {aaa}
                </Select>
            );
        }
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
        fetch("repertory/all", { method: "get" }).then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    if (data) {
                        me.setState({
                            reperData: data
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
    render() {
        return (
            <div className="goodsInfo">
                <div className="add-goods">
                    <h3>新增货物</h3>
                    <span>货物名称: <Input onChange={this.addNameChange}></Input></span>
                    <span>货物进场价格: <Input onChange={this.addPriceChange}></Input></span>
                    <span>货物市场价格: <Input onChange={this.addSaleChange}></Input></span>
                    <span>货物数量: <Input onChange={this.addNumChange}></Input></span>
                    <span>仓库: {this.renderOption()} </span>
                    <Button type="primary" onClick={this.addClick}>增加</Button>
                    <hr />
                </div>
                <div className="query-name">
                    <h3>查询货物</h3>
                    <span>货物名称: <Input onChange={this.queryNameChange}></Input></span>
                    <Button type="primary" onClick={this.queryClick}>查询</Button>
                    <hr />
                </div>
                {this.state.isfix ? <div className="fix-name">
                    <h3>修改货物信息</h3>
                    <span>货物名称: <Input onChange={this.fixNameChange} defaultValue={this.state.queryData[0].goodsName}></Input></span>
                    <span>货物进场价格: <Input onChange={this.fixPriceChange} defaultValue={this.state.queryData[0].goodsPrice}></Input></span>
                    <span>货物市场价格: <Input onChange={this.fixSaleChange} defaultValue={this.state.queryData[0].goodsMarkPrice}></Input></span>
                    <span>货物数量: <Input onChange={this.fixNumChange} defaultValue={this.state.queryData[0].goodsNum}></Input></span>
                    <span>仓库: {this.renderFixOption()} </span>
                    <Button type="primary" onClick={this.fixClick}>修改提交</Button>
                    <Button type="primary" onClick={this.exitClick}>退出修改</Button>
                    <Button type="primary" onClick={this.deleteClick}>删除</Button>                    
                    <hr />
                </div>
                    : false}
            </div>
        );
    }
}
export default GoodsInfo;