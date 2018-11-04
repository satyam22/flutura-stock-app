import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Input, Button, Icon, Spin } from 'antd';

export default class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchSymbolText: '',
      searchNameText: '',
    };
  }

  handleSearch = (selectedKeys, confirm, filter) => () => {
    confirm();
    if (filter === 'symbol') this.setState({ searchSymbolText: selectedKeys[0] });
    if (filter === 'name') this.setState({ searchNameText: selectedKeys[0] });
  }

  handleReset = (clearFilters, filter) => () => {
    clearFilters();
    if (filter === 'symbol') this.setState({ searchSymbolText: '' });
    if (filter === 'name') this.setState({ searchNameText: '' });
  }

  render() {
    const { companies, sectors, industries } = this.props;
    const columns = [{
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) =>
        (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => this.searchInput = ele}
              placeholder="Search symbol"
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={this.handleSearch(selectedKeys, confirm, 'symbol')}
            />
            <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm, 'symbol')} >Search</Button>
            <Button onClick={this.handleReset(clearFilters, 'symbol')}>Reset</Button>
          </div>
        ),
      filterIcon: filtered => <Icon type='search' style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
      onFilter: (value, record) => record.symbol.toLowerCase().includes(value.toLowerCase()),
      width: '100px',
      render: text => <Link to={`${this.props.match.url}/${text}`}>{text}</Link>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) =>
        (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => this.searchInput = ele}
              placeholder="Search name"
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={this.handleSearch(selectedKeys, confirm, 'name')}
            />
            <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm, 'name')} >Search</Button>
            <Button onClick={this.handleReset(clearFilters, 'name')}>Reset</Button>
          </div>
        ),
      filterIcon: filtered => <Icon type='search' style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
      width: '250px'
    },
    {
      title: 'Market Cap.',
      dataIndex: 'marketcap',
      key: 'marketcap',
      sorter: (a, b) => (a.marketcap - b.marketcap),
      width: '100px'
    },
    {
      title: 'Sector',
      dataIndex: 'sector',
      key: 'sector',
      width: '150px',
      filters: sectors.map(sector => ({ text: sector, value: sector })),
      onFilter: (value, record) => record.sector.includes(value)
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      key: 'industry',
      width: '150px',
      filters: industries.map(industry => ({ text: industry, value: industry })),
      onFilter: (value, record) => record.industry.includes(value)

    }
    ]
    return (
      <div className="dashboard">
{
  companies.length ===0 ?
  (
    <Spin size="large" className="spinner"/>
  ):
  (
    <Table dataSource={companies}
    columns={columns}
    className="company-table"
   />
  )
}
      </div>
    );
  }
}