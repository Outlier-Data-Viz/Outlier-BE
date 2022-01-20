const fetch = require('cross-fetch');

const getHateCrimes = async (state) => {
  // const statesObj = {};
  // let arr = [];
  // await Promise.all (
  // statesArr.map(async(state) => {
  const url = `https://api.usa.gov/crime/fbi/sapi/api/hatecrime/states/${state}/BIAS_INCIDENT?API_KEY=89Trtu9LRRCA6UNDsCqARY0wjtR28SrQGw0QQnfB`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log('data', data.data);
      
  // statesObj[state] = data.data;
  // arr = [...arr, data.data];
  // })
  // );
  return data.data;

};

// const getDepStats = async () => {
//   const url =
//     'https://datausa.io/api/data?drilldowns=State&measures=Adults%20With%20Major%20Depressive%20Episode,Adults%20With%20Serious%20Mental%20Illness';
//   const res = await fetch(url);
//   const data = await res.json();
//   // console.log(data);
//   return data;
// };

module.exports = { getHateCrimes };
