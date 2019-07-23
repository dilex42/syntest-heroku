import React from 'react';
import axios from 'axios';
import { Button, Popconfirm } from 'antd';

class CustomDeleteButton extends React.Component {

    handleDelete = () => {
        axios.delete(`http://localhost:8000/api/${this.props.modelType}/${this.props.ID}/`)
            .then(res => { console.log(res) })
            .catch(error => { console.error(error) })
            .finally(() => this.props.UpdateDataHandler());
    }

    render() {
        return (
            <Popconfirm title="Sure to delete?" onConfirm={this.handleDelete} disabled={this.props.disabled}>

                <Button type="danger" disabled={this.props.disabled}>Delete</Button>
            </Popconfirm>
        );
    }
}

export default CustomDeleteButton