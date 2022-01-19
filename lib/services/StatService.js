const Stat = require('../models/Stat');
const { getHateCrimes } = require('../utils/getFromApi');

module.exports = class StatService {
  static async getAndSetStats({ state }) {
    const statList = await getHateCrimes(state);
    const response = await Promise.all(
      statList.data.map(async (data_year, key, value) => {
        console.log('value', { value, data_year, key });
        await Stat.insert(data_year, key, value);
      })
    );
    console.log('response', response);
  }
  static async getByKeyAndYear(year, key) {

    const list = await Stat.findByKeyandYear(year, key);
    console.log('LIST', list);
    return list;
  }
};
