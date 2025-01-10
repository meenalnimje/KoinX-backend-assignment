const axios = require('axios');

const fetchCryptoData = async (coin) => {
  try {
    const options = {
      method: 'GET',
      url: `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`,
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': `	${process.env.API_KEY}`
      }
    };
    

    const res = await axios.request(options);  

    const coinData = res.data[coin];

    if (!coinData) {
      throw new Error(`No data found for coin: ${coin}`);
    }

    return {
      price: coinData.usd,
      marketCap: coinData.usd_market_cap,
      change24h: coinData.usd_24h_change,
    };
  } catch (error) {
    console.log(`Error fetching data for ${coin}:`, error.message);
  }
};

module.exports = fetchCryptoData;
