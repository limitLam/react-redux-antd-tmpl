/*
  layout主页面
*/

import React, {
  Component,
  PropTypes
} from 'react';
import {
  connect
} from 'react-redux';

import {
  Layout,
  Menu,
  Breadcrumb,
  Icon
} from 'antd';
const SubMenu = Menu.SubMenu;
const {
  Header,
  Footer,
  Sider,
  Content
} = Layout;

import './style.less'

import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';

export class LayoutComponent extends Component {
  render() {
    return (
      <Layout styleName='container'>
        <Sider
          collapsible
          collapsed={this.props.collapsed}
          onCollapse={this.props.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" mode={this.props.mode} openKeys={['sub1']} defaultSelectedKeys={['2']}>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span className="nav-text">User</span></span>}
            >
              <Menu.Item key="1">Tom</Menu.Item>
              <Menu.Item key="2">Bill</Menu.Item>
              <Menu.Item key="3">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span className="nav-text">Team</span></span>}
            >
              <Menu.Item key="4">Team 1</Menu.Item>
              <Menu.Item key="5">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="6">
              <span>
                <Icon type="file" />
                <span className="nav-text">File</span>
              </span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {/* 主内容区 */}
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Demo ©2017 Created by Limit
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutComponent);