import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class NormalLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: '',
      pswValue: '',
      data: '',
      logSucess: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.pswChange = this.pswChange.bind(this);
    this.logIn = this.logIn.bind(this);
  }
  componentDidMount() {
    this.getData();
  }
  logIn() { 
      var {data, pswValue, nameValue }= this.state || []; 
      data.forEach((item,index)=>{
        if(item.name == nameValue &&  item.password == pswValue){
          window.location = 'business.html';
          this.setState({logSucess: true});
        }else{
          this.setState({
            logSucess: false,
            nameValue: '',
            pswValue: ''
          });
        }
      });
  }
  nameChange(e){
    this.setState({
      nameValue: e.target.value
    });
  }
  pswChange(e){
    this.setState({
      pswValue: e.target.value
    });
  }
  getData() {
    var me = this;
    fetch("http://localhost:3000/www", { method: "get" }).then(function (res) {
      if (res.ok) {
        res.json().then(function (data) {
          if(data){
            me.setState({
              data: data
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
  handleSubmit(e) {
    (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="logIn">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              initialValue:this.state.nameValue,
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input 
              prefix={<Icon type="user" 
              style={{ color: 'rgba(0,0,0,.25)' }} />} 
              placeholder="Username"
              onChange={this.nameChange} />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              initialValue:this.state.pswValue,
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock"
                  style={{ color: 'rgba(0,0,0,.25)' }} />}
                onChange={this.pswChange}
                type="password"
                placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <Button type="primary"  className="login-form-button" onClick={this.logIn}>
            log in
            </Button>  
            {this.state.logSucess 
            ? false
            : <div className="login-fail">请重新输入密码</div>}
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

ReactDOM.render(<WrappedNormalLoginForm />, root);