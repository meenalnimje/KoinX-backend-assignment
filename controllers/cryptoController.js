const CryptoData = require("../models/cryptodata");

// standard deviation helper function

const computeDeviation = (prices) => {
  const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const variance =
    prices.reduce((sum, price) => sum + (price - mean) ** 2, 0) / prices.length;
  return Math.sqrt(variance).toFixed(2);
};
const getCryptoData = async (req, res) => {
  const { coin } = req.query;

  try {
    const allData = await CryptoData.find({ coin }).sort({ timestamp: -1 });

    if (allData.length === 0) {
      return res.status(404).json({ message: "No data found for the coin." });
    }

    const result = allData.map((data) => {
      const formattedTimestamp = new Date(data.timestamp).toLocaleString();

      return {
        price: data.price,
        marketCap: data.marketCap,
        "24hChange": data.change24h,
        timestamp: formattedTimestamp,
      };
    });

    res.json(result);
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getStandardDeviation = async (req, res) => {
  const { coin } = req.query;
  try {
    const data = await CryptoData.find({ coin })
      .sort({ timestamp: -1 })
      .limit(100);

    if (data.length < 2) {
      return res
        .status(400)
        .json({ message: "Not enough data to compute deviation." });
    }

    const prices = data.map((entry) => entry.price);
    const deviation = computeDeviation(prices);

    res.json({ deviation });
  } catch (error) {
    console.error("Error calculating deviation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getCryptoData, getStandardDeviation };
