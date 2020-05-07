/**
 * 商品分类路由
 */
import React, { Component } from 'react'
import { Card, Table, Button, Icon, message, Modal } from 'antd'
import LinkButton from '../../components/link-button'
import { reqcategory, requpdatecategory, reqaddcategory } from '../../api/index'
import AddForm from '../../pages/category/add-form'
import UpdataForm from '../../pages/category/updata-form'


export default class Category extends Component {
    state = {
        categorys: [],
        ercategorys: [],
        loading: false,
        parentId: '0',
        parentname: '',
        showvalue: "0"
    }
    UNSAFE_componentWillMount() {
        this.getColumns()
    }
    render() {
        const { categorys, loading, parentId, ercategorys, parentname, showvalue } = this.state
        const category = this.category || {}
        const title = parentId === '0' ? '一级分类列表' : (
            <span>
                <LinkButton onClick={this.showCategory}>一级分类列表</LinkButton>
                <Icon type="arrow-right" style={{ marginRight: 5 }} />
                <span>{parentname}</span>
            </span>
        )
        const extra = (
            <Button type="primary" onClick={this.adddata}>
                <Icon type="plus" />
                添加
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table 
                bordered 
                rowKey="_id" 
                loading={loading} 
                pagination={{ defaultPageSize: 5, showQuickJumper: true }} 
                dataSource={parentId === '0' ? categorys : ercategorys} 
                columns={this.columns} 
                />
                <Modal
                    title="添加商品"
                    visible={showvalue === '1'}
                    onOk={this.addcate}
                    onCancel={this.handleCancel}
                >
                    <AddForm
                        categorys={categorys}
                        parentId={parentId}
                        getForm={(form) => { this.form = form }}
                    />
                </Modal>
                <Modal
                    title="修改商品"
                    visible={showvalue === '2'}
                    onOk={this.updatacate}
                    onCancel={this.handleCancel}
                >
                    <UpdataForm
                        categoryName={category.name}
                        getForm={(form) => { this.form = form }}
                    />
                </Modal>
            </Card>
        )
    }
    //请求一级导航
    componentDidMount() {
        this.getfirstData()
    }
    getColumns = () => {
        this.columns = [

            {
                title: '分类的名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: (category) => (   //将当前选中的分类对象保存到组件对象上(再通过this去取值)
                    <span>
                        <LinkButton onClick={() => this.updatadata(category)}>修改分类</LinkButton>
                        {this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubcategory(category)} >查看子分类</LinkButton> : null}
                    </span>
                )
            }
        ];
    }
    //parentId如果没有指定就根据状态的进行请求，如果指定了就根据指定的请求
    getfirstData = async (parentId) => {
        this.setState({ loading: true })
        parentId = parentId || this.state.parentId
        const result = await reqcategory(parentId)
        console.log(result)
        this.setState({ loading: false })
        if (result.status === 0) {
            const categorys = result.data
            if (parentId === '0') {
                this.setState({
                    categorys
                })
            } else {
                this.setState({
                    ercategorys: categorys
                })
            }
        } else {
            message.error('请求分类列表失败！')
        }
    }
    //触发显示二级导航
    showSubcategory = (category) => {
        this.setState({
            parentId: category._id,
            parentname: category.name
        }, () => {
            this.getfirstData()
        }
        )
    }
    //点击‘一级分类列表时触发’
    showCategory = () => {
        this.setState({
            ercategorys: [],
            parentId: '0',
            parentname: ''
        })
    }
    //点击确认添加时执行
    addcate = () => {
        this.form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({
                    showvalue: '0'
                })
                const { parentId, categoryName } = values
                console.log(parentId, categoryName)
                const result = await reqaddcategory(parentId, categoryName)
                if (result.status === 0) {
                    if (parentId === this.state.parentIdparentId) {
                        this.getfirstData()
                    } else if (parentId === '0') {
                        this.getfirstData('0')
                    }
                }
            }
        })
    }
    //点击确认修改分类时执行
    updatacate = () => {
        this.form.validateFields(async (err, values) => {
            if (!err) {
                //更改状态，隐藏模态框
                this.setState({
                    showvalue: '0'
                })
                //发送请求重新渲染列表
                const { categoryId } = values
                const categoryName = this.form.getFieldValue('categoryName')
                this.form.resetFields()
                const result = await requpdatecategory({ categoryId, categoryName })
                if (result.status === 0) {
                    this.getfirstData()
                }
            }
        })

    }
    //点击取消时执行
    handleCancel = () => {
        this.form.resetFields()
        this.setState({
            showvalue: '0'
        })
    }
    //控制添加模态框显示隐藏
    adddata = () => {
        this.setState({
            showvalue: '1'
        })
    }
    //控制修改模态框显示隐藏
    updatadata = (category) => {
        //将当前点击项数据保存起来
        this.category = category
        //更新状态
        this.setState({
            showvalue: '2'
        })
    }
}
