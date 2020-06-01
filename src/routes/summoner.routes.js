const { Router } = require('express');
const router = Router();
const { getSummonerByName, getMatchDetails, getSimpleSummoner, getLeagueV4, getMatchV4, getProfileHistory, getAllMatchDetails } = require('../controllers/summoner.controller');
const { verifyToken } = require('../helpers/verifyToken');
router.get('/getAllData/:servidor/:name', getSummonerByName);       // Devuelve todos los datos de un Summoner por nombre
router.get('/matchdetails/:servidor/:id', getMatchDetails);         // Devuelve los datos de una partida por id
router.get('/getSummoner/:servidor/:name', getSimpleSummoner);      // Devuelve los datos basicos de un Summoner
router.get('/getLeagueV4/:servidor/:name', getLeagueV4);
router.get('/getMatchs/:servidor/:accountId', getMatchV4);

router.get('/getProfileHistory/', verifyToken, getProfileHistory);
router.get('/getMatchDetails/:servidor/:id', getAllMatchDetails);

module.exports = router;