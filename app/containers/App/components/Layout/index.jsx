/* eslint-disable */
import React, { PropTypes } from 'react';
import { Layout as AntLayout, Menu, Breadcrumb } from 'antd';

// The content.
import Routes from '../../../../routes';

// Local css.
if (__CLIENT__) require('./index.scss');

const Layout = () => {
  const { Header, Content } = AntLayout;

  return (
    <AntLayout className="boilerplato">
      <Header className="boilerplato-header">
        <div className="logo">Boilerplato</div>
        <Menu className="boilerplato-menu" theme="dark" mode="horizontal">
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content className="boilerplato-container">
        <Breadcrumb className="boilerplato-breadcrumb">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="boilerplato-content">
          <Routes />
        </div>
      </Content>
    </AntLayout>
  );
};

export default Layout;
