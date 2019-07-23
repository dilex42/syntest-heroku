import React from 'react';
import { Layout, Menu } from 'antd';
import { withRouter } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {

    state = {
        current: this.props.location.pathname.replace(/\//g, '') || 'users'
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
        this.props.history.push(`/${e.key}/`)
    };
    render() {
        console.log(this.props.location.pathname);
        console.log(this.state.current);

        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu
                        onClick={this.handleClick}
                        selectedKeys={[this.state.current]}
                        theme="dark"
                        mode="horizontal"
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="users">
                            Users
                        </Menu.Item>
                        <Menu.Item key="groups">
                            Groups
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        );
    }
}

export default withRouter(CustomLayout);