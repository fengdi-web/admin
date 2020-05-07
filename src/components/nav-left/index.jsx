import React, { Component } from 'react'
import './index.less'
import { NavLink, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd';
import menuConfig from '../../config/menuConfig.js'

const { SubMenu } = Menu;

class Nav extends Component {
    // static getDerivedStateFromProps(props, state) {     //static 中不允许用this
    //     return this.menulist = this.change(menuConfig)
    // }
    UNSAFE_componentWillMount() {
        this.menulist = this.change(menuConfig)
    }
    render() {
        const path = this.props.location.pathname;
        const openkey = this.openkey
        return (
            <div className="nav-left">
                <NavLink to="/" className="nav-left-header">
                    <img src={require('../../pages/login/images/logo.png')} alt="admin_logo" />
                    <h1>硅谷后台</h1>
                </NavLink>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}   //动态匹配当前选中的菜单项 key 数组
                    defaultOpenKeys={[openkey]}
                >
                    {/* <Menu.Item key="/admin/home">
                        <NavLink to="/admin/home"></NavLink>
                        <Icon type="bank" />
                        <span>首页</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="shop" />
                                <span>商品</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/admin/category">
                            <NavLink to="/admin/category">
                                <Icon type="gift" />
                                <span>品类管理</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/admin/product">
                            <NavLink to="/admin/product">
                                <Icon type="tool" />
                                <span>商品管理</span>
                            </NavLink>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/admin/user">
                        <NavLink to="/admin/user">
                            <Icon type="user" />
                            <span>用户管理</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/admin/role">
                        <NavLink to="/admin/role">
                            <Icon type="safety" />
                            <span>角色管理</span>
                        </NavLink>
                    </Menu.Item>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <Icon type="schedule" />
                                <span>图形图表</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/admin/charts/bar">
                            <NavLink to="/admin/charts/bar">
                                <Icon type="bar-chart" />
                                <span>柱形图</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/admin/charts/line">
                            <NavLink to="/admin/charts/line">
                                <Icon type="line-chart" />
                                <span>折线图</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/admin/charts/pie">
                            <NavLink to="/admin/charts/pie">
                                <Icon type="pie-chart" />
                                <span>饼图</span>
                            </NavLink>
                        </Menu.Item>
                    </SubMenu> */}

                    {this.menulist}
                </Menu>
            </div>
        )
    }
    // 方法一
    //根据menu的数据数组生成对应的标签数组
    //使用map+递归调用
    changes = (menuConfig) => {
        return menuConfig.map((item) => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <NavLink to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </NavLink>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.change(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    //方法二
    //根据menu的数据数组生成对应的标签数组
    //使用reduce+递归调用
    change = (menuConfig) => {
        const path = this.props.location.pathname;
        return menuConfig.reduce((pre, item) => {
            if (!item.children) {
                pre.push((
                    <Menu.Item key={item.key}>
                        <NavLink to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </NavLink>
                    </Menu.Item>
                ))
            } else {
                const citem = item.children.find(item => item.key === path)
                if (citem) {
                    this.openkey = item.key
                }
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.change(item.children)}
                    </SubMenu>
                ))
            }
            return pre
        }, [])
    }
}

export default withRouter(Nav)
