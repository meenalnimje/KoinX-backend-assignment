const router = require("express").Router();
const cryptocontroller=require("../controllers/cryptoController")
router.get('/stats',cryptocontroller.getCryptoData);
router.get('/deviation',cryptocontroller.getStandardDeviation);

module.exports =  router;