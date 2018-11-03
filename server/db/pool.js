const mysql = require('mysql');
const util = require('util');

const pool  = mysql.createPool({
  connectionLimit : 50,
  host            : process.env.HOST || 'localhost',
  user            : process.env.USER || 'satyam',
  password        : process.env.PASSWORD || 'satyam123',
  database        : process.env.DB_NAME || 'stock_market',
  port: 3306
});

pool.query = util.promisify(pool.query);

module.exports = pool;