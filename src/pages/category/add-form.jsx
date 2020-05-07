/**
 * 添加分类的form组件
 */
import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types'

class AddForm extends Component {
    static = {
        getForm: PropTypes.func.isRequired,
        categorys: PropTypes.func.isRequired,
        parentId: PropTypes.string.isRequired
    }
    UNSAFE_componentWillMount() {
        this.props.getForm(this.props.form)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const Option = Select.Option
        const { categorys, parentId } = this.props
        return (
            <Form>
                <Form.Item>
                    {getFieldDecorator('parentId', { initialValue: parentId })(
                        <Select>
                            <Option value="0">一级分类</Option>
                            {
                                categorys.map(c => <Option value={c._id}>{c.name}</Option>)
                            }
                        </Select>)
                    }
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('categoryName', {
                        initialValue: "",
                        rules: [
                            { required: true, message: '分类名称必须输入' }
                        ]
                    })(
                        <Input placeholder="请输入分类名称" />)
                    }
                </Form.Item>
            </Form>
        )
    }
}

export default AddForm = Form.create()(AddForm);
