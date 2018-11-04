import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import Interday from './Interday';
import Intraday from './Intraday';

export default class Stock extends Component {

  render() {
    const { match } = this.props;

    return (
      <div>
        <Row style={{ marginTop: '20px' }}>
          <Col span={8} offset={4}>
            <Button type="primary" block><Link to={`${match.url}/interday`}>Watch Interday Data </Link></Button>
          </Col>
          <Col span={8} offset={1}>
            <Button type="primary" block><Link to={`${match.url}/intraday`}>Watch Intraday Data </Link></Button>
          </Col>
        </Row>
        <div class="stock-content" style={{ margin: '5px', padding: '5px 10px' }}>
          <Switch>
            <Route path={`${match.path}/interday`} component={Interday} />
            <Route path={`${match.path}/intraday`} component={Intraday} />
            <Route path={`${match.path}`} render={() => <h3>Please select one of above categories </h3>} />
          </Switch>
        </div>
      </div>
    )
  }
}

