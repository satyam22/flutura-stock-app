const API_BASE_URL = 'http://localhost:3001';

export const getAllCompanies = async (callback) => {
  try{
    let results = await fetch(`${API_BASE_URL}/company/all`);
    results = await results.json();
    if(results && results.results && Array.isArray(results.results))
    console.log(results.results);
    callback(results.results);
  }
  catch(error){
    console.log(error);
    callback([]);
  }
}

export const getAllSectors = async (callback) => {
  try{
    let results = await fetch(`${API_BASE_URL}/company/sectors`);
    results = await results.json();
    if(results && results.results && Array.isArray(results.results))
    console.log(results.results);
    callback(results.results);
  }
  catch(error){
    console.log(error);
    callback([]);
  }
}
export const getAllIndustries = async (callback) => {
  try{
    let results = await fetch(`${API_BASE_URL}/company/industries`);
    results = await results.json();
    if(results && results.results && Array.isArray(results.results))
    console.log(results.results);
    callback(results.results);
  }
  catch(error){
    console.log(error);
    callback([]);
  }
}
export const getInterdayData = async (symbol, days,callback) => {
  try{
    if(!symbol && !days) throw new Error("missing symbol or day");
    console.log("symbol:: ", symbol);
    let results = await fetch(`${API_BASE_URL}/stock/daily?symbol='${symbol}'&days=${days}`);
    results = await results.json();
    if(results && results.results && Array.isArray(results.results))
    console.log(results.results);
    callback(results.results);
  }
  catch(error){
    console.log(error);
    callback([]);
  }
}