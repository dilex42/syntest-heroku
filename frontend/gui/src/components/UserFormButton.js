/* eslint-disable default-case */
import React from 'react';
import axios from 'axios';

import { Button, Modal, Form, Input, Select } from 'antd';

function onChange(value) {
    console.log(`selected ${value}`);
}

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}

const UserForm = Form.create({ name: 'form_in_modal' })(

    // eslint-disable-next-line
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                groups: []
            }
            // this.UpdateDataHandler = this.UpdateDataHandler.bind(this);
        }


        render() {
            const { visible, onCancel, onCreate, form, name_initial, group_initial, form_title, form_ok_text, groups } = this.props;
            const { getFieldDecorator } = form;
            const { Option } = Select;

            return (
                <Modal
                    visible={visible}
                    title={form_title}
                    okText={form_ok_text}
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Username">
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true, message: 'Please input the name of the User!' },
                                    { max: 42, message: "Name cannot be longer than 42 characters" }
                                ],
                                initialValue: name_initial
                            })(<Input name="username" placeholder="Enter Username..." />)}
                        </Form.Item>
                        <Form.Item label="Group">
                            {getFieldDecorator('group', {
                                rules: [
                                    { required: true, message: 'Please input the group of the User!' },
                                    // { max: 120, message: "group cannot be longer than 120 characters" }
                                ],
                                initialValue: group_initial
                            })(<Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a group"
                                optionFilterProp="children"
                                onChange={onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSearch={onSearch}
                            // filterOption={(input, option) =>
                            //     option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            // }
                            >
                                {groups.map((group, i) => <Option value={group.id} key={group.id}>{group.name}</Option>)}
                            </Select>)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

class UserFormButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleCreate = this.handleCreate.bind(this);
        this.state = {
            visible: false,
        };
    }

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };


    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            const name = values.username;
            const user_group = values.group;
            console.log(user_group, name);

            switch (this.props.requestMethod) {
                case 'post':
                    axios.post('http://localhost:8000/api/users/', {
                        username: name,
                        group: user_group
                    })
                        .then(res => {
                            console.log(res);
                            this.props.UpdateDataHandler();
                        })
                        .catch(error => console.error(error));
                    break;
                case 'put':
                    axios.put(`http://localhost:8000/api/users/${this.props.UserID}/`, {
                        username: name,
                        group: user_group
                    })
                        .then(res => {
                            console.log(res);
                            this.props.UpdateDataHandler();
                        })
                        .catch(error => console.error(error));
                    break;
            }
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        return (
            <span>
                <Button type="primary" onClick={this.showModal}>
                    {this.props.btnName}
                </Button>
                <UserForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    name_initial={this.props.name_initial}
                    group_initial={this.props.group_initial}
                    form_title={this.props.form_title}
                    form_ok_text={this.props.form_ok_text}
                    groups={this.props.groups}
                />
            </span>
        );
    }
}

export default UserFormButton;