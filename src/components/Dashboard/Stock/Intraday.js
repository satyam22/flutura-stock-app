import React, { Component } from 'react';
import { DatePicker, Row, Col, Button } from 'antd';
import { getIntradayData} from './../../../api';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, Resizable, BarChart } from 'react-timeseries-charts';
import { Collection, TimeSeries, TimeEvent, IndexedEvent, TimeRange } from 'pondjs';
import moment from 'moment';

const DAY_MILLI_SECS = 8640000000;
export default class Intraday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intraday: [],
      selectedDate: (new Date()).toISOString().slice(0,10),
      timerange: new TimeRange([(new Date()).getTime(), (new Date()).getTime()+DAY_MILLI_SECS])
    }
  }
  handleDateChange = (date, dateString) => {
const selectedDate = date.toISOString().slice(0,10);
this.setState({selectedDate});
  }
  reload = () => {
    const { symbol } = this.props.match.params;
    const { selectedDate } = this.state;
    getIntradayData(symbol, selectedDate, (data) => {
      console.log("data:: ", data);
      this.setState({intraday: data});
    })
  }

  renderChart = () => {
    const name = 'intraday stock price';
    const columns = ['time', 'open', 'close', 'low', 'high'];
    const { intraday } = this.state;
    const events = intraday.map(item => {
      const timestamp = moment(new Date(item.timestamp))
      const { open, close, low, high } = item;
      return new TimeEvent(timestamp.toDate(), {
        open: +open,
        close: +close,
        low: +low,
        high: +high
      });
    });
    const collection = new Collection(events);
    console.log("collection:: ", collection);
    const sortedCollection = collection.sortByTime();
    const series = new TimeSeries({ name, columns, collection: sortedCollection });

    const { timerange } = this.state;
    console.log("series:: ", series);
    const croppedSeries = series.crop(timerange);
    
    const volumeEvents = intraday.map(item => {
      const index = item.timestamp.replace(/\//g, "-");
      const { volume } = item;
      return new IndexedEvent(index, { volume: +volume });
    });

    const volumeCollection = new Collection(volumeEvents);
    const sortedVolumeCollection = volumeCollection.sortByTime();
    const seriesVolume = new TimeSeries({
      name: "AAPL-volume",
      utc: false,
      collection: sortedVolumeCollection
    });
    const croppedVolumeSeries = seriesVolume.crop(timerange);

    return (
      <ChartContainer
        timeRange={timerange}
        hideWeekends={true}
        enablePanZoom={true}
        onTimeRangeChanged={this.handleTimeRangeChange}
      >
        <ChartRow height="200">
          <Charts>
            <LineChart
              axis="y"
              style={{ close: { normal: { stroke: "steelblue" } } }}
              columns={["close"]}
              series={croppedSeries}
              interpolation="curveBasis"
            />
          </Charts>
          <YAxis
            id="y"
            label="Price ($)"
            min={croppedSeries.min("close")}
            max={croppedSeries.max("close")}
            format=",.00f"
            width="60"
            type={this.state.mode}
          />
        </ChartRow>
        <ChartRow height="200">
          <Charts>
            <BarChart
              axis="y"
              style={{ volume: { normal: { stroke: "steelblue" } } }}
              columns={["volume"]}
              series={croppedVolumeSeries}
            />
          </Charts>
          <YAxis
            id="y"
            label="Volume"
            min={croppedVolumeSeries.min("volume")}
            max={croppedVolumeSeries.max("volume")}
            width="60"
          />
        </ChartRow>
      </ChartContainer>
    );
  };
  render() {
    const { intraday } = this.state;
    return (
      <div>
        <Row>
          <Col span={8} offset={8}><DatePicker onChange={this.handleDateChange} style={{width: '100%'}}/></Col>
          <Col><Button type="primary" onClick = {this.reload}>Apply</Button></Col>
        </Row>
        <Row>
        <div className="col-md-12">
          {intraday.length > 0 && <Resizable>{this.renderChart()}</Resizable>}
        </div>
        </Row>
      </div>
    );
  }
}