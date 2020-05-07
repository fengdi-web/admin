import React, { Component } from 'react'
import './index.less';
import { Modal } from 'antd';
import { formateDate } from '../../utils/dateUtils';
import { reqWeather } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import { withRouter } from 'react-router-dom';
import menuList from '../../config/menuConfig.js'
import storageUtils from '../../utils/storageUtils.js'
import LinkButton from '../../components/link-button'
class Header extends Component {
    state = {
        currentTime: formateDate(Date.now()),
        dayPictureUrl: '',
        weather: ''
    }

    render() {
        const { currentTime, dayPictureUrl, weather } = this.state;
        const username = memoryUtils.user.username

        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getTime()
        this.getWeather()
    }
    getTime = () => {
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({ currentTime })
        }, 1000)
    }
    getWeather = async () => {
        const { dayPictureUrl, weather } = await reqWeather('北京')
        this.setState({ dayPictureUrl, weather })
    }
    getTitle = () => {
        let title
        const path = this.props.location.pathname;
        menuList.forEach(Item => {
            if (Item.key === path) {
                title = Item.title
            } else if (Item.children) {
                const cItem = Item.children.find(cItem => cItem.key === path)
                if (cItem) {
                    title = cItem.title
                }
            }
        })
        return title;
    }
    logout = () => {
        Modal.confirm({
            content: '确定退出吗？',
            onOk:() =>{
                storageUtils.removeUser()
                memoryUtils.user = {}
                this.props.history.replace("/")
            }
        })
    }
    componentWillUnmount(){
       clearInterval(this.intervalId)
    }
}

export default withRouter(Header)






// find() 方法为数组中的每个元素都调用一次函数执行：
// 当数组中的元素在测试条件时返回 true 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。
// 如果没有符合条件的元素返回 undefined
