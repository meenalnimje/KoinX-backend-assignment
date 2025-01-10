const CryptoData = require("../models/cryptodata");
const fetchCryptoData = require("./datafetch");

const coins = ["bitcoin", "matic-network", "ethereum"];

const fetchData= () => {
  const fetchAndStoreData = async () => {
    console.log("Running background job to fetch cryptocurrency data...");

    for (const coin of coins) {
      try {
        const { price, marketCap, change24h } = await fetchCryptoData(coin);

        const newData = new CryptoData({
          coin,
          price,
          marketCap,
          change24h,
          timestamp: new Date(),
        });

        await newData.save();
        console.log(`Data saved for ${coin}`);
      } catch (error) {
        console.error(`Failed to save data for ${coin}:`, error);
      }
    }
  };

  setInterval(fetchAndStoreData, 2*60*60 *1000);
  fetchAndStoreData()
};

module.exports = fetchData;
