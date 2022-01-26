const fetch = require('cross-fetch');

const getHateCrimes = async (state) => {
  const url = `https://api.usa.gov/crime/fbi/sapi/api/hatecrime/states/${state}/BIAS_INCIDENT?API_KEY=89Trtu9LRRCA6UNDsCqARY0wjtR28SrQGw0QQnfB`;

  const res = await fetch(url);
  const data = await res.json();

  return data.data;
};


module.exports = { getHateCrimes };
