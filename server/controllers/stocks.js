const pool = require('./../db/pool');
const subDays = require('date-fns/add_days');
const axios = require('axios')
const { API_BASE_URL, API_KEY } = require('./../../config');

const getTimeSeriesDaily = async (req, res) => {
  let { symbol, days = 7 } = req.query;
  if (!symbol) return res.status(400).json({ ok: false, message: "symbol is required" });

  let from = subDays(new Date(), days * -1);
  from = from.toISOString().slice(0, 10);
  console.log({ from });
  const GET_DAILY_PRICE = `select * from time_series_daily where symbol = ${symbol} 
  and date >= "${from}"`;
  const INSERT_DAILY_PRICE = `insert into time_series_daily
  (date, open, high, low, close, volume, symbol) values(?,?,?,?,?,?,?)`;
  const CHECK_SYMBOL = `select count(*) as count from companies where symbol = ${symbol}`;
  console.log(GET_DAILY_PRICE);
  try {
    const dbResult = await pool.query(GET_DAILY_PRICE);
    const symbolCount = await pool.query(CHECK_SYMBOL);
    console.log({symbolCount});
    if (dbResult.length === 0) {
      if(!symbolCount || !Array.isArray(symbolCount) || symbolCount.length !== 1 
      || symbolCount[0].count < 1)
      return res.status(404).json({message: 'Symbol does not exist in database'});
      symbol = symbol.replace(/['"]+/g,'');
      const GET_TIME_SERIES_DAILY_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${API_KEY}`;
      console.log(GET_TIME_SERIES_DAILY_URL);
      const apiResult = await axios.get(GET_TIME_SERIES_DAILY_URL);
      const results=[];
      console.log({apiResult});
      if (apiResult.status === 200) {
        const data = apiResult.data;
        if (data && data["Time Series (Daily)"]) {
          const timeseries = data["Time Series (Daily)"];
          const timeseriesEntries = Object.entries(timeseries)
          for (let i = 0; i < timeseriesEntries.length; i++) {
            const date = timeseriesEntries[i][0];
            console.log("index 1 ", timeseriesEntries[i][1]);
            const ts = Object.entries(timeseriesEntries[i][1]);
            const open = Number(ts[0][1]), high = Number(ts[1][1]),
              low = Number(ts[2][1]), close = Number(ts[3][1]), volume = Number(ts[4][1]);
            console.log({ date, open, high, low, close, volume, symbol });
            try {
              const insertResult =
                await pool.query(INSERT_DAILY_PRICE, [date, open, high, low, close, volume, symbol]);
              console.log("insert result:: ", insertResult);
              results.push({date, open, high, low, close, volume, symbol});
            }
            catch (error) {
              if ((error.message).includes('ER_DUP_ENTRY'))
                {
                  console.log("dublicate entry");
                }
              else throw new Error("Internal server");
            }
          }
        }
        console.log(results);
        return res.status(200).json({ ok: true, results });
      }
      else {
        throw new Error("Internal server error");
      }
    }
     return res.status(200).json({ ok: true, results: dbResult });
  }
  catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

module.exports = { getTimeSeriesDaily };