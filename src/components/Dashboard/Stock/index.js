import React, { Component }from 'react';
import { Button } from 'antd';
import {Link} from 'react-router-dom';
import { getInterdayData } from './../../../api';
import {Charts, ChartContainer, ChartRow, YAxis, LineChart } from 'react-timeseries-charts';
import {TimeSeries} from 'pondjs';

export default class Stock extends Component{
  constructor(props){
    super(props);
    this.state = {
      interday:[],
      days: 365
    }
  }
  componentDidMount(){
    const {symbol} = this.props.match.params;
    const { days } = this.state;
    if(symbol){
      getInterdayData(symbol, days, (data) => {
        console.log("Inter day data:: ", data);
        this.setState({interday: data});
      })
    }
  }
 render(){
   const { interday } = this.state;
   const data = {
     name: "stock data",
     columns: ["time", "open"],
     points: interday.map(id => ([id.date, id.open]))
   };
   console.log("points:: ", data.points);
   return (
   <div>
    <Button><Link to ='/dashboard'>Go To Dashboard</Link></Button>
    </div>
    )
 } 
}
