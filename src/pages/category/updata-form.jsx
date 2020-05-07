/**
 * 更新分类的form组件
 */
import React, { Component } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'  //对props中数据类型进行检测及限制

class UpdataForm extends Component {
    static propTypes = {
        //属性后面加上 `isRequired` 后缀，这样如果这个属性父组件没有提供时，会打印警告信息
        //并指定了传过来的数据是一个字符串类型的
        categoryName: PropTypes.string.isRequired,
        getForm: PropTypes.func.isRequired
    }
    UNSAFE_componentWillMount() {
        this.props.getForm(this.props.form)
    }
    render() {
        const { categoryName } = this.props
        const { getFieldDecorator } = this.props.form;
        return (
            <Form>
                <Form.Item>
                    {getFieldDecorator('categoryName', { initialValue: categoryName ,
                    rules:[
                        {required:true,message:'分类名称必须输入'}
                    ]
                    })(
                        <Input placeholder="请输入分类名称" />)
                    }
                </Form.Item>
            </Form>
        )
    }
}

export default UpdataForm = Form.create()(UpdataForm);