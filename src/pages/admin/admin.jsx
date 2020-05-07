import React, { Component } from 'react';
import './admin.less'
import momoryUtils from '../../utils/memoryUtils'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd';
import Nav from '../../components/nav-left';
import Header from '../../components/header';
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'


const { Footer, Sider, Content } = Layout;

export default class admin extends Component {
    render() {
        const user = momoryUtils.user;
        //如果内存中没有存储user => 当前用户没有登录
        if (!user || !user._id) {
            return <Redirect to="/login" />
        }
        return (
            <div className="admin">
                {/* hello {user.username} */}
                <Layout style={{ height: '100%' }}>
                    <Sider>
                        <Nav />
                    </Sider>
                    <Layout>
                        <Header>Header</Header>
                        <Content style={{ margin: 20, background: '#fff' }}>
                            <Switch>
                                <Route path="/home" component={Home} />
                                <Route path="/category" component={Category} />
                                <Route path="/product" component={Product} />
                                <Route path="/user" component={User} />
                                <Route path="/role" component={Role} />
                                <Route path="/charts/bar" component={Bar} />
                                <Route path="/charts/line" component={Line} />
                                <Route path="/charts/pie" component={Pie} />
                                <Redirect to="/home" />
                            </Switch>
                        </Content>
                        <Footer style={{ textAlign: 'center', color: '#f40' }}>加油！倒计时9！</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
