const summonerCtrl = {};
const { RIOT_API } = process.env;
const summonerFunctions = require('../helpers/summoner.helper');
const User = require('../models/User');

/*SACAR TODA LA INFORMACION DEL SUMMONER*/
summonerCtrl.getSummonerByName = async (req, res) => {
    const { servidor, name } = req.params; // VARIABLES DE LA URL
    const summonerV4 = await summonerFunctions.summonerV4(servidor, name);
    const leagueV4 = await summonerFunctions.leagueV4(servidor, summonerV4.id);
    const championMasteryV4 = await summonerFunctions.championMasteryV4(servidor, summonerV4.id);
    const matchV4 = await summonerFunctions.matchV4(servidor, summonerV4.accountId);
    res.status(200).json([{ "summonerV4": summonerV4, "championMasteryV4": championMasteryV4, "leagueV4": leagueV4, "matchV4": matchV4 }]);
}

summonerCtrl.getMatchDetails = async (req, res) => {
    const { servidor, id } = req.params;
    const matchDetails = await summonerFunctions.matchById(servidor, id);
    res.status(200).json(matchDetails);
}

summonerCtrl.getSimpleSummoner = async (req, res) => {
    const { servidor, name } = req.params;
    const simpleSummoner = await summonerFunctions.summonerV4(servidor, name);
    res.status(200).json(simpleSummoner);
}

summonerCtrl.getLeagueV4 = async (req, res) => {
    const { servidor, name } = req.params;
    const leagueV4 = await summonerFunctions.leagueV4(servidor, name);
    res.status(200).json(leagueV4);
};

summonerCtrl.getMatchV4 = async (req, res) => {
    const { servidor, accountId } = req.params;
    const MatchV4 = await summonerFunctions.matchV4(servidor, accountId);
    res.status(200).json(MatchV4);
}
summonerCtrl.getProfileHistory = async (req, res) => {
    const user = await User.findOne({ _id: req.userId });
    const summonerName = user.summoners[0].username;
    const servidor = user.summoners[0].servidor;
    const summonerV4 = await summonerFunctions.summonerV4(servidor, summonerName);
    const accountId = summonerV4.accountId;
    const matchV4 = await summonerFunctions.matchV4(servidor, accountId);
    const matches = matchV4.matches;
    const getProfileHistory = await summonerFunctions.profileHistory(servidor, summonerName, matches);
    res.status(200).json(getProfileHistory);
}

summonerCtrl.getAllMatchDetails = async (req, res) => {
    const { servidor, id } = req.params;
    promises = [];
    promises.push(
        await summonerFunctions.matchById(servidor, id),
        await summonerFunctions.getMatchTimeline(servidor, id),
    );
    Promise.all(promises).then(() => {
        console.log('Detalles de partida analizados')
    })

    res.status(200).json(promises)
}

module.exports = summonerCtrl;