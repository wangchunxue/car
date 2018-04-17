import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class Info extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
  
    return (
      <div className="info-fix">
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create()(Info);
ReactDOM.render(<WrappedNormalLoginForm />, fixed);