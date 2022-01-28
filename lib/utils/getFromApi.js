const fetch = require('cross-fetch');

const getHateCrimes = async (state) => {
  //Shouldn't expose the API key in the URL
  const url = `https://api.usa.gov/crime/fbi/sapi/api/hatecrime/states/${state}/BIAS_INCIDENT?API_KEY=89Trtu9LRRCA6UNDsCqARY0wjtR28SrQGw0QQnfB`;

  const res = await fetch(url);

  // naming this hateCrimeData could communicate what that return value is
  const hateCrimeData = await res.json();

  return hateCrimeData.data;
};


module.exports = { getHateCrimes };
