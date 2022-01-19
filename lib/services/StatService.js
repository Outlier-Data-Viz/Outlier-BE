const Stat = require('../models/Stat');
const { getHateCrimes } = require('../utils/getFromApi');

module.exports = class StatService {
  static async getAndSetStats({ state }) {
    const statList = await getHateCrimes(state);
    const resp = await Promise.all(
      statList.data.map(async ({ value, data_year, key }) => {
        console.log('value', value, data_year, key);
        await Stat.insert(value, data_year, key);
      })
    );
    console.log('resp', resp);
  }
  static async getByKeyAndYear(year, key) {

    const list = await Stat.findByKeyandYear(year, key);
    console.log('LIST', list);
    return list;
  }
};
