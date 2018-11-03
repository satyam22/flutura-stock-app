const fs = require('fs');
const csv = require('fast-csv');
const pool = require('./pool');
let count = 0;
const QUERY = `insert into companies (symbol, name, marketcap, sector, industry) values (?, ?, ?, ?,?)`;
const populateDb = async () => {
  const stream = fs.createReadStream(__dirname + '/stockmdata.csv');
  const csvStream = csv.parse({
    headers: true,
    ignoreEmpty: true,
    discardUnmappedColumns: true,
    quote: '"',
    escape: '"'
  }).on('data', async (data) => {
    const { Symbol: symbol, Name, Sector, Industry } = data;
    let { MarketCap } = data;
    MarketCap = Number(MarketCap);
    console.log({ Symbol: symbol, Name, MarketCap, Sector, Industry });
    try {
     const result=  await pool.query(QUERY, [symbol, Name, MarketCap, Sector, Industry]);
     console.log("Result:: ", result);
    }
    catch (error) {
      console.log("error:: ", error);
    }
  }).on('end', () => {
    console.log('*************');
  });
  stream.pipe(csvStream);

}
module.exports = { populateDb }