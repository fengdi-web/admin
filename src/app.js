import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'


export default class App extends Component {
    render() {
        return (
            // BrowserRouter -- 使用h5提供的history API 来保持UI和URL的同步
            <BrowserRouter>
                {/* Switch只要匹配到了就不在向下匹配了 */}
                {/* <Switch>
                    <Route path="/" exact component={Login}></Route>
                    <Route path="/admin" component={Admin}></Route>
                </Switch> */}

                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/" component={Admin}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}