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
    let results = await fetch(`${API_BASE_URL}/stock/daily?symbol='${symbol}'&days=${days}&all=true`);
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
export const getIntradayData = async (symbol, selectedDate,callback) => {
  selectedDate = selectedDate;
  console.log({symbol, selectedDate});
  try{
    if(!symbol && !selectedDate) throw new Error("missing symbol or selectedDate");
    console.log("symbol:: ", symbol);
    let results = await fetch(`${API_BASE_URL}/stock/intraday?symbol='${symbol}'&date=${selectedDate}`);
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

export const userLogin = async(data, callback) => {
  const { email, password } = data;
  try{
    let results = await fetch(`${API_BASE_URL}/user/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email,password})
    });
    results = await results.json();
    callback(results);
  }
  catch(error){
    callback({authorized: false, message: error.message});
  }
}

export const userSignup = async(data, callback) => {
  const { email, password, firstName, lastName = '', aboutMe = ''} = data;
  try{
    let results = await fetch(`${API_BASE_URL}/user/signup`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email,password, firstName, lastName,aboutMe})
    });
    results = await results.json();
    callback(results);
  }
  catch(error){
    callback({authorized: false, message: error.message});
  }
}