import store from 'store';
const USER_KEY = 'userkey'
//原生封装 - 兼容性不好 
// export default {
//     //保存user
//     saveUser (user) {
//        localStorage.setItem(USER_KEY,JSON.stringify(user))
//     },
//     //读取user
//     getUser(){
//         return JSON.parse(localStorage.getItem(USER_KEY || '{}'))
//     },
//     //删除user
//     removeUser(){
//         localStorage.removeItem(USER_KEY)
//     }
// }

// 使用store.js库 - 跨浏览器存储所有用例
export default {
    //保存user
    saveUser (user) {
        store.set(USER_KEY,user)
    },
    //读取user
    getUser(){
        return store.get(USER_KEY) || {}
    },
    //删除user
    removeUser(){
        store.remove(USER_KEY)
    }
}