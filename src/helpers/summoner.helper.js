const summonerFunctions = {};
const { RIOT_API } = process.env;
const fetch = require('node-fetch');

summonerFunctions.serverURL = (server) => {
    for (let option in serverOptns) {
        if (server.toLowerCase() == option.toLowerCase()) {
            return serverURL = serverOptns[option];
        }
    }
}

const serverOptns = {
    BR1: 'br1.api.riotgames.com',
    EUN1: 'eun1.api.riotgames.com',
    EUW1: 'euw1.api.riotgames.com',
    JP1: 'jp1.api.riotgames.com',
    KR: 'kr.api.riotgames.com',
    LA1: 'la1.api.riotgames.com',
    LA2: 'la2.api.riotgames.com',
    NA1: 'na1.api.riotgames.com',
    OC1: 'oc1.api.riotgames.com',
    TR1: 'tr1.api.riotgames.com',
    RU: 'ru.api.riotgames.com'
}

summonerFunctions.summonerV4 = async (server, name) => {

    const summonerV4URL = `/lol/summoner/v4/summoners/by-name/` + name;
    let serverURL = summonerFunctions.serverURL(server);
    const URL = 'https://' + serverURL + summonerV4URL + `?api_key=${RIOT_API}`;

    var response = await fetch(URL);
    const summoner = await response.json();

    return summoner;

}

summonerFunctions.leagueV4 = async (server, id) => {
    const leagueV4 = '/lol/league/v4/entries/by-summoner/' + id;
    let serverURL = summonerFunctions.serverURL(server);
    const URL = 'https://' + serverURL + leagueV4 + `?api_key=${RIOT_API}`;

    var response = await fetch(URL);
    const league = await response.json();

    return league;

}

summonerFunctions.matchV4 = async (server, accountid) => {
    const matchV4 = '/lol/match/v4/matchlists/by-account/' + accountid;
    let serverURL = summonerFunctions.serverURL(server);
    const URL = 'https://' + serverURL + matchV4 + `?api_key=${RIOT_API}`;

    var response = await fetch(URL);
    const match = await response.json();

    return match;
}

summonerFunctions.matchById = async (server, gameid) => {
    const matchById = '/lol/match/v4/matches/' + gameid;
    let serverURL = summonerFunctions.serverURL(server);
    const URL = 'https://' + serverURL + matchById + `?api_key=${RIOT_API}`;

    var response = await fetch(URL);
    const matchDetails = await response.json();

    return matchDetails;
}

summonerFunctions.championMasteryV4 = async (server, id) => {
    const championMasteryV4 = '/lol/champion-mastery/v4/champion-masteries/by-summoner/' + id;
    let serverURL = summonerFunctions.serverURL(server);
    const URL = 'https://' + serverURL + championMasteryV4 + `?api_key=${RIOT_API}`;

    var response = await fetch(URL);
    const championMastery = await response.json();

    return championMastery.slice(0, 3);
}

summonerFunctions.profileHistory = async (servidor, summonerName, matches) => {
    let serverURL = summonerFunctions.serverURL(servidor);
    let responses = [];
    for (let i = 0; i < matches.length; i++) {
        let m = matches[i].gameId;
        let matchById = '/lol/match/v4/matches/' + m;
        let URL = 'https://' + serverURL + matchById + `?api_key=${RIOT_API}`;
        responses.push(
            await fetch(URL)
                .then(res => { return res.json(); })
        );
        Promise.all(responses).then(() => {
            console.log('Partida analizada')
        })
    }
    return await responses;

}

summonerFunctions.getMatchTimeline = async (servidor, id) => {
    let serverURL = summonerFunctions.serverURL(servidor);
    let responses = [];
    const URL = `https://${serverURL}/lol/match/v4/timelines/by-match/${id}?api_key=${RIOT_API}`;
    var response = await fetch(URL);
    const matchTimeline = response.json();
    return matchTimeline;
}

module.exports = summonerFunctions;