import React, { Component } from 'react'
import { Card, Select, Input, Icon, Button, Table } from 'antd'
import LinkButton from '../../components/link-button'

const Option = Select.Option
export default class ProductHome extends Component {
    state = {
        products: [
            {
                "status": 1,
                "imgs": [],
                "_id": "5e8a1a54dd598e0f9002b2e5",
                "categoryId": "5e8846f410e0da1afc4d0752",
                "pCategoryId": "5e883f3510e0da1afc4d074e",
                "name": "神仙水",
                "price": 2000,
                "desc": "SKII神仙水",
                "__v": 0
            },
            {
                "status": 1,
                "imgs": [],
                "_id": "5e8a1b80dd598e0f9002b2e6",
                "categoryId": "5e88657310e0da1afc4d076a",
                "pCategoryId": "5e88454110e0da1afc4d0751",
                "name": "橙味饮料",
                "price": 5,
                "desc": "清新~",
                "__v": 0
            }
        ]
    }
    UNSAFE_componentWillMount() {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '￥' + price  //显示对应的属性，传入的是对应的属性值
            },
            {
                width:100,
                title: '状态',
                dataIndex: 'status',
                render: (status) => {     //显示对应的属性，传入的是对应的属性值
                    return (
                        <span>
                            <Button type="primary">下架</Button>
                            <span>在售</span>
                        </span>
                    )
                }
            },
            {
                width:100,
                title: '操作',
                render: (product) => {     //显示对应的属性，传入的是对应的属性值
                    return (
                        <span>
                            <LinkButton>详情</LinkButton>
                            <LinkButton>修改</LinkButton>
                        </span>
                    )
                }
            }
        ]
    }
    render() {
        const { products } = this.state
        const title = (
            <span>
                <Select value="1" style={{ width: 150 }}>
                    <Option value="1">按名称搜索</Option>
                    <Option value="2">按描述搜索</Option>
                </Select>
                <Input placeholder="关键字" style={{ width: 150, margin: '0 15px' }} />
                <Button type="primary">搜索</Button>
            </span>
        )

        const extra = (
            <Button type="primary">
                <Icon type="plus"></Icon>
                添加商品
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table rowKey="_id" bordered dataSource={products} columns={this.columns} />
            </Card>
        )
    }
}
