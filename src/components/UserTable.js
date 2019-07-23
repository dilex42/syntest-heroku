import React from 'react';
import axios from 'axios';
import { Table, Divider } from 'antd';
import UserFormButton from './UserFormButton';
import CustomDeleteButton from './DeleteButton';
class UserTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            groups: []
        }
        this.UpdateDataHandler = this.UpdateDataHandler.bind(this);
    }
    UpdateDataHandler() {
        axios.get('https://syntest-heroku.herokuapp.com/api/users/')
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
    }
    componentDidMount() {
        axios.get('https://syntest-heroku.herokuapp.com/api/users/')
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
        axios.get('https://syntest-heroku.herokuapp.com/api/groups/')
            .then(res => {
                let gr = [];
                res.data.forEach((element) => {
                    gr.push({
                        name: element.name,
                        id: element.ID
                    })
                })
                this.setState({
                    groups: gr
                })
            })
    }

    render() {
        const { Column } = Table;
        return (
            <div>
                <div>
                <UserFormButton
                    btnName="Add User"
                    requestMethod="post"
                    UserID={null}
                    UpdateDataHandler={this.UpdateDataHandler}
                    name_initial={null}
                    group_initial={null}
                    form_title="Add new user"
                    form_ok_text="Add"
                    groups={this.state.groups} />
                    </div>
                    <br />
                <Table dataSource={this.state.users} rowKey={(record) => { return record.id }}>
                    <Column title="Username" dataIndex="username" />
                    <Column title="Created" dataIndex="created" />
                    <Column title="Group" dataIndex="group_name" />
                    <Column
                        title="Action"
                        key="action"
                        align="center"
                        render={(text, record) => (
                            <span>
                                <UserFormButton
                                    btnName="Edit"
                                    requestMethod="put"
                                    UserID={record.id}
                                    UpdateDataHandler={this.UpdateDataHandler}
                                    name_initial={record.username}
                                    group_initial={record.group}
                                    form_title="Edit user information"
                                    form_ok_text="Edit"
                                    groups={this.state.groups} />
                                <Divider type="vertical" />
                                <CustomDeleteButton
                                    modelType="users"
                                    ID={record.id}
                                    disabled={false}
                                    UpdateDataHandler={this.UpdateDataHandler}
                                />
                            </span>)}
                    />
                </Table>
            </div>
        )
    }
}

export default UserTable;