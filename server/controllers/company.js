const pool = require('./../db/pool');

const getAllCompanies = async (req, res) => {
  const QUERY = `select * from companies`;
  try {
    const results = await pool.query(QUERY);
    return res.status(200).json({ ok: true, results });
  }
  catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

const getAllSectors = async (req, res) => {
  const QUERY = `select distinct sector from companies`;
  try {
    let results = await pool.query(QUERY);
    results = results.map(result => result.sector);
    results = results.filter(result => result !== "n/a");
    return res.status(200).json({ ok: true, results });
  }
  catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

const getAllIndustries = async (req, res) => {
  const QUERY = `select distinct industry from companies`;
  try {
    let results = await pool.query(QUERY);
    results = results.map(result => result.industry);
    results = results.filter(result => result !== "n/a");
    return res.status(200).json({ ok: true, results });
  }
  catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

const getCompany = async (req, res) => {
  const { symbol, name } = req.query;
  if (!symbol && !name) return res.status(400).json({
    ok: true,
    message: 'symbol or company name is required to get company information'
  });
  let query = null;
  if (!symbol)
    query = `select * from companies where name = ${name}`;
  else if (!name)
    query = `select * from companies where symbol = ${symbol}`;
  else
    query = `select * from companies where symbol = ${symbol} and name = ${name}`;

  try {
    const result = await pool.query(query);
    return res.status(200).json({ ok: true, result });
  }
  catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

const getCompaniesBySector = async (req, res) => {
  const { sector } = req.query;
  if (!sector) return res.status(400).json({ ok: false, message: 'sector name is required' });
  const QUERY = `select * from companies where sector = ${sector}`;

  try {
    const result = await pool.query(QUERY);
    return res.status(200).json({ ok: true, result });
  }
  catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

const getCompaniesByIndustry = async (req, res) => {
  const { industry } = req.query;
  if (!industry) return res.status(400).json({ ok: false, message: 'industry name is required' });
  const QUERY = `select * from companies where industry = ${industry}`;

  try {
    const result = await pool.query(QUERY);
    return res.status(200).json({ ok: true, result });
  }
  catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

const getCompaniesByMarketcap = async (req, res) => {
  const { min = 0, max = Math.pow(10, 20) } = req.query;
  const QUERY = `select * from companies where marketcap >= ${min} and marketcap <= ${max}`;
  try {
    const result = await pool.query(QUERY);
    return res.status(200).json({ ok: true, result });
  }
  catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

module.exports = {
  getAllCompanies,
  getAllIndustries,
  getAllSectors,
  getCompaniesByIndustry,
  getCompaniesBySector,
  getCompany,
  getCompaniesByMarketcap
}