import React, { Component } from 'react';
import { getInterdayData } from './../../../api';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, Resizable, BarChart } from 'react-timeseries-charts';
import { Collection, TimeSeries, TimeEvent, IndexedEvent, TimeRange } from 'pondjs';
import moment from 'moment';


export default class Interday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interday: [],
      days: 365,
      mode: "log",
      timerange: new TimeRange([1509714815000, 1541250815000])
    }
  }
  componentDidMount() {
    const { symbol } = this.props.match.params;
    const { days } = this.state;
    if (symbol) {
      getInterdayData(symbol, days, (data) => {
        console.log("Inter day data:: ", data);
        this.setState({ interday: data });
      })
    }
  }
  handleTimeRangeChange = timerange => {
    this.setState({ timerange });
  };

  setModeLinear = () => {
    this.setState({ mode: "linear" });
  };

  setModeLog = () => {
    this.setState({ mode: "log" });
  };
  renderChart = () => {
    const name = 'stock price';
    const columns = ['time', 'open', 'close', 'low', 'high'];
    const { interday } = this.state;
    const events = interday.map(item => {
      const timestamp = moment(new Date(item.date))
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
    
    const volumeEvents = interday.map(item => {
      const index = item.date.replace(/\//g, "-");
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
    const { symbol } = this.props.match.params;
    const { interday } = this.state;

    return (<div className="interday-chart">
      <div className="row">
        <div className="col-md-12">
          <h3> {symbol} </h3>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-12" style={{ fontSize: 14, color: "#777" }}>
          <span
            style={this.state.mode === "log" ? linkStyleActive : linkStyle}
            onClick={this.setModeLinear}
          >
            Linear
      </span>
          <span> | </span>
          <span
            style={this.state.mode === "linear" ? linkStyleActive : linkStyle}
            onClick={this.setModeLog}
          >
            Log
      </span>
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col-md-12">
          {interday.length > 0 && <Resizable>{this.renderChart()}</Resizable>}
        </div>
      </div>
    </div>)
  }
}

const linkStyle = {
  fontWeight: 600,
  color: "grey",
  cursor: "default"
};

const linkStyleActive = {
  color: "steelblue",
  cursor: "pointer"
};
