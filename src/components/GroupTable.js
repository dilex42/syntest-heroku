import React from 'react';
import axios from 'axios';
import { Table, Divider } from 'antd';
import GroupFormButton from './GroupFormButton';
import CustomDeleteButton from './DeleteButton';
class GroupTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: []
        }
        this.UpdateDataHandler = this.UpdateDataHandler.bind(this);
    }
    UpdateDataHandler() {
        axios.get('http://localhost:8000/api/groups/')
            .then(res => {
                this.setState({
                    groups: res.data
                })
            })
    }
    componentDidMount() {
        axios.get('http://localhost:8000/api/groups/')
            .then(res => {
                this.setState({
                    groups: res.data
                })
            })
    }

    render() {
        const { Column } = Table;
        return (
            <div>
                <GroupFormButton
                    btnName="Add group"
                    requestMethod="post"
                    groupID={null}
                    UpdateDataHandler={this.UpdateDataHandler}
                    name_initial={null}
                    description_initial={null}
                    form_title="Create new group"
                    form_ok_text="Create" />
                <Table dataSource={this.state.groups} rowKey={(record) => { return record.ID }}>
                    <Column title="ID" dataIndex="ID" />
                    <Column title="Name" dataIndex="name" />
                    <Column title="Description" dataIndex="description" width="42%" />
                    <Column
                        title="Action"
                        key="action"
                        align="center"
                        render={(text, record) => (
                            <span>
                                <GroupFormButton
                                    btnName="Edit"
                                    requestMethod="put"
                                    groupID={record.ID}
                                    UpdateDataHandler={this.UpdateDataHandler}
                                    name_initial={record.name}
                                    description_initial={record.description}
                                    form_title="Edit group information"
                                    form_ok_text="Edit" />
                                <Divider type="vertical" />
                                <CustomDeleteButton
                                    modelType="groups"
                                    ID={record.ID}
                                    disabled={record.delete_disabled}
                                    UpdateDataHandler={this.UpdateDataHandler}
                                />
                            </span>)}
                    />
                </Table>
            </div>
        )
    }
}

export default GroupTable;