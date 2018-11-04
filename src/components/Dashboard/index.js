import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Companies from './Companies';
import Stock from './Stock';

import { Link, Switch, Route } from 'react-router-dom';
import { getAllCompanies, getAllSectors, getAllIndustries } from '../../api';
import './../../App.css';
const { Header, Content, Footer, Sider } = Layout;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      sectors: [],
      industries: [],
      collapsed: false
    };
  }
  componentDidMount() {
    getAllCompanies((data) => {
      this.setState({ companies: data });
    })
    getAllSectors((data) => {
      console.log("sectors:: ", data);
      this.setState({ sectors: data });
    })
    getAllIndustries((data) => {
      console.log("industries:: ", data)
      this.setState({ industries: data });
    })
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  render() {
    const { companies, sectors, industries } = this.state;
    const { match } = this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="sidebar-logo" >STOCKS APP</div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
            <Icon type="pie-chart"></Icon>
              <Link to ={`${match.path}`} >All Companies</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Intraday</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="desktop" />
              <span>Interday</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content>
            <Switch>
              <Route exact path={`${match.path}`} render={
                () => <Companies companies={companies}
                  sectors={sectors}
                  industries={industries}
                  match={this.props.match} />
                  } />
                <Route path={`${match.path}/:symbol`} component={Stock} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Created By: Satyam Bansal
            </Footer>
        </Layout>
      </Layout>
    );
  }
}
