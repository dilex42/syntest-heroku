/* eslint-disable default-case */
import React from 'react';
import axios from 'axios';

import { Button, Modal, Form, Input } from 'antd';

const GroupForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form, name_initial, description_initial, form_title, form_ok_text } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title={form_title}
                    okText={form_ok_text}
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Name">
                            {getFieldDecorator('name', {
                                rules: [
                                    { required: true, message: 'Please input the name of the group!' },
                                    { max: 42, message: "Name cannot be longer than 42 characters" }
                                ],
                                initialValue: name_initial
                            })(<Input name="name" placeholder="Enter group name..." />)}
                        </Form.Item>
                        <Form.Item label="Description">
                            {getFieldDecorator('description', {
                                rules: [
                                    { required: true, message: 'Please input the description of the group!' },
                                    { max: 120, message: "Description cannot be longer than 120 characters" }
                                ],
                                initialValue: description_initial
                            })(<Input.TextArea name="description" placeholder="Enter group description..." />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

class GroupFormButton extends React.Component {
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

            const name = values.name;
            const description = values.description;

            switch (this.props.requestMethod) {
                case 'post':
                    axios.post('http://localhost:8000/api/groups/', {
                        name: name,
                        description: description
                    })
                        .then(res => {
                            console.log(res);
                            this.props.UpdateDataHandler();
                        })
                        .catch(error => console.error(error));
                    break;
                case 'put':
                    axios.put(`http://localhost:8000/api/groups/${this.props.groupID}/`, {
                        name: name,
                        description: description
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
                <GroupForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    name_initial={this.props.name_initial}
                    description_initial={this.props.description_initial}
                    form_title={this.props.form_title}
                    form_ok_text={this.props.form_ok_text}
                />
            </span>
        );
    }
}

export default GroupFormButton;