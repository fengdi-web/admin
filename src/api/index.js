/**
 * 包含应用中所有接口请求函数的模块
 * 每个函数的返回值都是promise
 */
import jsonp from 'jsonp';
import {message} from 'antd';
import ajax from './ajax';

//登录
export const reqlogin = (username, password) => ajax('/api/login', { username, password }, 'POST')

//获取分类列表
export const reqcategory = (parentId) => ajax('/api/manage/category/list',{parentId})

//添加商品
export const reqaddcategory = (parentId,categoryName) => ajax('/api/manage/category/add',{parentId,categoryName},'POST')

//更新分类名称
export const requpdatecategory = ({categoryId,categoryName}) => ajax('/api/manage/category/update',{categoryId,categoryName},'POST')

export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        // 发送jsonp请求
        jsonp(url, {}, (err, data) => {
            if (!err && data.status === 'success') {
                const { dayPictureUrl, weather } = data.results[0].weather_data[0]
                resolve({ dayPictureUrl, weather })
            } else {
                message.error('获取天气信息失败')
            }
        })

    })
}
// reqWeather('北京')
