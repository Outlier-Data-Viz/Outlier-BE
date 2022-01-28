const Stat = require('../models/Stat');
const { getHateCrimes } = require('../utils/getFromApi');

module.exports = class StatService {
  static async getAndSetStats(body) {
    const addedStats = [];
    const statList = await Promise.all(body.map(async (state) => {
      const data = await getHateCrimes(state);
      const spread = data.map((obj) => ({ ...obj, state }));
      return spread;
    })
    );
    const flattened = statList.flat();
    await Promise.all(
      flattened.map(async(stat) => {
        const insertedStats = await Stat.insert(stat);
        addedStats.push(
          insertedStats
        );
      })
    );
    
    return addedStats;
  }

  static async getByKey(key) {
    const list = await Stat.findByKey(key);
    return list;
  }
};
