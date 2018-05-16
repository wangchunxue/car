import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from '../main';
import Chart from './chart';
import { Button, Layout, Menu, Breadcrumb, Icon, Tabs, Input, DatePicker, Select } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import { Router, Route, Link, hashHistory } from 'react-router';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addDate: '',
            queryName: '',
            queryData: [],
            isQuery: false,
            isChoose: false,
            queryGoodsName: '',
            queryGoodsData: [],
            needNum: '',
            singeMoney: 0,
            isShow: false,
            currBusinessData: [],
            isTest: false,
            addSever: '',
            SeverData: null,
            orderNum: Math.ceil(Math.random() * 100000000000),
            businessData: null,
            isShowTotal: false,
            total: 0
        }
        this.addDateChange = this.addDateChange.bind(this);
        this.queryCustomerChange = this.queryCustomerChange.bind(this);
        this.queryCustomerClick = this.queryCustomerClick.bind(this);
        this.chooseClick = this.chooseClick.bind(this);
        this.queryGoodsInfo = this.queryGoodsInfo.bind(this);
        this.queryGoodsNameChange = this.queryGoodsNameChange.bind(this);
        this.needNumCnange = this.needNumCnange.bind(this);
        this.ChooseGoodsClick = this.ChooseGoodsClick.bind(this);
        this.addSeverChange = this.addSeverChange.bind(this);
        this.addBusinessClick = this.addBusinessClick.bind(this);
    }
    componentDidMount() {
        this.getData();
    }
    renderFixOption() {
        let SeverData = this.state.SeverData || [];

        if (SeverData.length > 0) {
            var aaa = SeverData.map((item, index) => {
                return (<Option key={index} value={item.workerId}>{item.workerName}</Option>);
            });
            return (
                <Select
                    showSearch
                    onChange={this.addSeverChange}
                    style={{ width: 200 }}
                    placeholder="服务人员"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    {aaa}
                </Select>
            );
        }
    }
    addBusinessClick() {
        let { queryData, currBusinessData, addSever, orderNum, total} = this.state;
        var d = new Date();
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        var time = year +''+ month +''+ day;
        currBusinessData.map(item => {
            item.time = time;
            item.customerId = queryData[0].customerId;
            item.workerId = addSever;
        });
        const data = {
            orderNum: orderNum
        }
        currBusinessData.map(item => {
            this.postData('http://localhost:3000/business/add', item).then((res) => {
                this.setState({
                    orderNum: Math.ceil(Math.random() * 100000000000)
                })
            });
        });
        let grade = queryData[0].grade;
        let count = 1;
        if(grade == 2){
            count = 0.9;
        } 
        if (currBusinessData.length === 1) {
            total = Math.floor(currBusinessData[0].singeMoney *count);
        } else if (currBusinessData.length > 1) {
            total = currBusinessData.reduce((a, b) => {
                let totalMoney =  Math.floor((a.singeMoney + b.singeMoney)*count);
                return totalMoney ;
            });
        }
        this.postData('http://localhost:3000/business/queryOrder', data).then((res) => {
            const params = {
                total: total,
                businessNum: orderNum
            }
            this.postData('http://localhost:3000/business/addBusiness', params).then((res) => {
                console.log(res);
            });
        });
        this.setState({
            total: total,
            isShowTotal: true
        });
    }
    addSeverChange(value) {
        this.setState({
            addSever: `${value}`
        })
    }
    queryGoodsNameChange(e) {
        if (this.state.isTest) {
            this.setState({
                queryGoodsName: ''
            })
        } else {
            this.setState({
                queryGoodsName: e.target.value
            })
        }

    }
    queryGoodsInfo() {
        let queryGoodsName = this.state.queryGoodsName;
        const data = {
            name: queryGoodsName
        }
        if (!queryGoodsName) {
            alert('请输入查询商品的名字');
            return;
        }
        this.postData('http://localhost:3000/goods/query', data).then((res) => {
            if (res.length < 1) {
                alert('没有此商品');
            } else {
                this.setState({
                    queryGoodsData: res
                });
            }
        });
    }
    addDateChange(date, dateString) {
        this.setState({
            addDate: dateString
        })
    }
    queryGoodsNameChange(e) {
        this.setState({
            queryGoodsName: e.target.value
        })
    }
    queryCustomerChange(e) {
        this.setState({
            queryName: e.target.value
        })
    }
    queryCustomerClick() {
        const data = {
            name: this.state.queryName
        }
        this.postData('http://localhost:3000/customer/query', data).then(res => {
            if (res.length < 1) {
                alert('查无此人,前去注册新用户信息');
            } else {
                this.setState({ queryData: res });
            }
        });
    }
    chooseClick(index) {
        let queryData = this.state.queryData;
        if (queryData.length < 1) {
            return
        }
        let currData = queryData[index];
        this.setState({
            queryData: [currData]
        })
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
                            SeverData: data
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
    renderItem() {
        let queryData = this.state.queryData || [];
        var isChoose = true;
        if (queryData.length == 1) {
            isChoose = false;
        }
        let gradevalue = '普通用户';
        var qqq = queryData.map((item, index) => {
            if (item.grade == 1) {
                gradevalue = '普通用户';
            } else {
                gradevalue = 'VIP用户';
            }

            return (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.iphone}</td>
                    <td>{item.carNum}</td>
                    <td>{gradevalue}</td>
                    {isChoose ?
                        <td>
                            <Button type="primary" onClick={() => { this.chooseClick(index) }}>选择</Button>
                        </td>
                        : false}
                </tr>
            );
        });
        return (
            <tbody>
                {qqq}
            </tbody>
        )
    }
    needNumCnange(e) {
        var val = e.target.value;
        if (isNaN(val)) {
            setTimeout(function () {
               alert('请输入有效的数字');
               this.setState({ needNum: null});
            }.bind(this), 500);
        } else {
            if( e.target.value.length > 11){
                alert('您输入的号码超过11位数字');
                this.setState({ needNum: null});
            } else {
                this.setState({ needNum: e.target.value });
            }
        }
    }
    ChooseGoodsClick() {
        let { queryGoodsName, queryGoodsData, needNum, singeMoney, currBusinessData, addSever, orderNum } = this.state;
        let price = 0;
        if (queryGoodsData.length < 1) {
            needNum = 0;
            return ;
        } else {
            price = queryGoodsData[0].goodsMarkPrice;
        } 
        let num = queryGoodsData[0].goodsNum - needNum;
        if (num < 0) {
            alert('货品数量剩余不足，请重新输入');
            this.setState({
                needNum: ''
            });
            return;
        }
        this.setState({
            singeMoney: price * needNum
        });

        const updateData = {
            num: num,
            id: queryGoodsData[0].goodsId
        }
        this.postData('goods/updateNum',updateData).then((res) => {
            //this.queryGoodsInfo();
        });
        let reper = queryGoodsData[0].repertoryName;
        let Price = queryGoodsData[0].goodsMarkPrice || 0;
        needNum = needNum || 0;
        singeMoney = Price * needNum;
        const data = {
            name: queryGoodsName,
            reper: reper,
            Price: Price,
            needNum: needNum,
            singeMoney: singeMoney,
            goodsId: queryGoodsData[0].goodsId,
            orderNum: orderNum
        }
        currBusinessData.push(data);
        this.setState({
            currBusinessData: currBusinessData,
            queryGoodsData: [],
            isShow: true,
            queryGoodsName: null,
            needNum: '',
            singeMoney: ''
        });
        
    }
    renderBusinessItem() {
        const { currBusinessData } = this.state;
        var qqq = currBusinessData.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.reper}</td>
                    <td>{item.Price}</td>
                    <td>{item.needNum}</td>
                    <td>{item.singeMoney}</td>
                </tr>
            )
        });
        return qqq;
    }
    render() {
        let { queryGoodsData, total } = this.state;
        let defaultPrice = '';
        let defaultNum = 0;
        let defaultReper = ''
        if (queryGoodsData.length > 0) {
            defaultPrice = queryGoodsData[0].goodsMarkPrice;
            defaultReper = queryGoodsData[0].repertoryName;
            defaultNum = queryGoodsData[0].goodsNum;
        }
        return (
            <div className="add-business">
                <h3>查询顾客信息</h3>
                <Input onChange={this.queryCustomerChange} />
                <Button type="primary" onClick={this.queryCustomerClick}>查询</Button>
                {this.renderFixOption()}
                <hr />
                <div>
                    <table data-toggle="table" className="business-table">
                        <thead>
                            <tr>
                                <th>货品名</th>
                                <th>仓库名</th>
                                <th>价格</th>
                                <th>数量</th>
                                <th>金额</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Input value={this.state.queryGoodsName} onChange={this.queryGoodsNameChange} onBlur={this.queryGoodsInfo}></Input></td>
                                <td className="default-reper">{defaultReper}</td>
                                <td className="default-reper">{defaultPrice}</td>
                                <td><span className="remain"><Input className="remain-input" value={this.state.needNum} onChange={this.needNumCnange} ></Input>剩余{defaultNum}件</span></td>
                                <td className="default-reper">{this.state.singeMoney}</td>
                                <td><Button type="primary" onClick={this.ChooseGoodsClick}>确定</Button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {this.state.queryData.length > 0
                    ? <div>
                        <h3>顾客信息</h3>
                        <table data-toggle="table" className="business-table">
                            <thead>
                                <tr>
                                    <th>顾客姓名</th>
                                    <th>联系方式</th>
                                    <th>车牌号码</th>
                                    <th>顾客等级</th>
                                </tr>
                            </thead>
                            {this.renderItem()}
                        </table>
                        <hr />
                    </div>
                    : false}
                {this.state.isShow ?
                    <div>
                        <h3>订单详情</h3>
                        <table data-toggle="table" className="business-table">
                            <thead>
                                <tr>
                                    <th>货品名</th>
                                    <th>仓库名</th>
                                    <th>价格</th>
                                    <th>数量</th>
                                    <th>金额</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderBusinessItem()}
                            </tbody>
                        </table>
                        <Button type="primary" onClick={this.addBusinessClick}>生成订单</Button>
                        <hr />
                        { this.state.isShowTotal 
                        ? <div className="business-total">总计：{total}元</div>
                        :false}
                    </div>
                    : false}

            </div>
        );
    }

}
export default Add;