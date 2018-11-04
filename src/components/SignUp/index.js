import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { userSignup } from './../../api';
import { Link, Redirect } from 'react-router-dom';

const FormItem = Form.Item;

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName:'',
      lastName:'',
      email: '',
      password: '',
      aboutMe:'',
      success: false
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        userSignup(values, ({success}) => {
          if(success === true) this.setState({ success:true })
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { success } = this.state;
    return success === true ? (<Redirect to='/signin' />) : (
      <div style={{ width: '400px', margin: 'auto', marginTop: '100px' }}>
        <Form onSubmit={this.handleSubmit} className="signup-form">
        <FormItem>
            {getFieldDecorator('firstName', {
              rules: [{ required: true, message: 'Please input your first name!' }],
            })(
              <Input placeholder="First Name" type="text"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('lastName')(
              <Input placeholder="Last Name" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('aboutMe')(
              <Input placeholder="About Me" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="signup-form-button">
              Sign Up
          </Button>
            Or <Link to='/signin'>Signin Now !</Link>
          </FormItem>
        </Form>
      </div >
    )
  }
}

export default Form.create()(SignUp);
