import React, { Component } from 'react'
import './login.less';
import { Form, Icon, Input, Button, message } from 'antd';
import { reqlogin } from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import {Redirect} from 'react-router-dom';

class login extends Component {
    render() {
        //如果用户已经登录，自动跳转到管理界面
        const user = memoryUtils.user;
        if(user && user._id){
            return <Redirect to="/" />
        }
        const { getFieldDecorator } = this.props.form; //经 Form.create() 包装过的组件会自带 this.props.form 属性
        return (
            <div className="login">
                <header className="login_header">
                    <img src={require('./images/logo.png')} alt="logo" />
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section className="login_content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true, whitespace: true, message: '用户名不能为空' },
                                    { min: 4, message: '不能少于4个字符' },
                                    { max: 12, message: '不能超过12个字符' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '格式有误，必须为数字字母或下划线' }
                                ],
                                initialValue: 'admin' //验证初始值
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="请输入用户名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{
                                    validator: this.validatepwd
                                }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="请输入密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const { username, password } = values;
                //#region 
                // reqlogin(username, password).then(
                //     response => {
                //         console.log("成功了", response.data)
                //     }

                // ).catch(error => {
                //     console.log('失败了', error)
                // })
                //#endregion
                const result = await reqlogin(username, password)
                if (result.status === 0) {
                    message.success('登录成功！')
                    const user = result.data
                    memoryUtils.user = user   //将用户保存在内存中
                    storageUtils.saveUser(user);  //将用户保存在local中
                    this.props.history.replace('/')
                } else {
                    message.error(result.msg)
                }
            }
        })
    }
    //对密码进行自定义验证
    validatepwd = (rule, value, callback) => {
        if (!value) {
            callback("密码不能为空")
        } else if (value.length < 4) {
            callback("密码不能少于4个字符")
        } else if (value.length > 12) {
            callback("密码不能超过12个字符")
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback("密码必须是字母数字或下划线")
        } else {
            callback() //验证通过
        }
    }
}


const Login = Form.create()(login);

export default Login;