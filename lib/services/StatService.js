const Stat = require('../models/Stat');
const { getHateCrimes } = require('../utils/getFromApi');

module.exports = class StatService {
  static async getAndSetStats(body) {
    // console.log('statesArr', body.statesArr);
    const addedStats = [];
    const statList = await Promise.all(body.map(async (state) => {
      const data = await getHateCrimes(state);
      const spread = data.map((obj) => ({ ...obj, state }));
      return spread;
    })
    );
    // flatten the array
    const flattened = statList.flat();
    //console.log('flat', flattened);
    await Promise.all(
      flattened.map(async(stat) => {
        // console.log('stat', stat);
        const insertedStats = await Stat.insert(stat);
        addedStats.push(
          insertedStats
        );
      })
    );
    return addedStats;
  }

  static async getByKey(key) {
    //console.log('key', key);
    const list = await Stat.findByKey(key);
    //console.log('LIST', list);
    return list;
  }
};
