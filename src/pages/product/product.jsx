/**
 * 商品路由
 */
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ProductHome from './index'
import ProductAdd from './add-update'
import Detail from './detail'

export default class Product extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/product" exact component={ProductHome} />
                    <Route path="/product/addupdate" component={ProductAdd} />
                    <Route path="/product/detail" component={Detail} />
                </Switch>
            </div>
        )
    }
}
