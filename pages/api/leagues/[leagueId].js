
export default async function handler(req, res) {
    console.log(req.query);
    let url = "https://fantasy.premierleague.com/api/leagues-classic/" + req.query.leagueId + "/standings";
    let resp = await fetch(url);
    let standings = await resp.json();
    standings['summary'] = addSummaryStats(standings);


    resp = await fetch("https://fantasy.premierleague.com/api/event-status/");
    let json = await resp.json();
    let event = json.status[0].event;

    // await addTeamsPointHistory(standings.standings.results, event);
    standings.standings.results = await addTeamsPointHistory(standings.standings.results, event);

    console.log('standings.standings.results[0]' + standings.standings.results[0]);
    console.log('standings.standings.results[0].pointsHistory' + standings.standings.results[0].pointsHistory);
    console.log('standings.standings.results[0].pointsHistory[0].points' + standings.standings.results[0].pointsHistory[0].points);
    res.status(200).json(standings);
}

async function addTeamsPointHistory(teams, currentEvent) {    
    let events = Array.from({length: currentEvent + 1}, (v, i) => i);
    console.log('events: ' + events);
    let teamsPromiseArray = await teams.map(async (team) => {
        let pointsHistory = [];


        let previousPoints = 0;
        for await (const i of events) {
            console.log('team.entry:' + team.entry);
            console.log('i: '+ i);
            if(i==0) pointsHistory.push({gameweek: i, points: 0})
            else {
                let resp = await fetch("https://fantasy.premierleague.com/api/entry/" + team.entry + "/event/" + i + "/picks/");
                let json = await resp.json();
                let eventPoints = previousPoints + json.entry_history.points;
                previousPoints = eventPoints;
                pointsHistory.push({gameweek: i, points: eventPoints});
            }
            
        }
        
        team['pointsHistory'] = pointsHistory;
        return team;
    })

    return await Promise.all(teamsPromiseArray);

}

function addSummaryStats(standings) {
    let teams = standings.standings.results;
    let highestRiser = {};
    let lowestFaller = {};
    let biggestPoints = {};
    let lowestPoints = {};
    let first = true;
    teams.forEach((team) => {
        if(first) {
            team.risen = team.last_rank - team.rank_sort;
            team.fallen = team.rank_sort - team.last_rank;
            team.mostPoints = team.event_total;
            team.leastPoints = team.event_total;
            highestRiser = team;
            lowestFaller = team;
            biggestPoints = team;
            lowestPoints = team;
            first = false;
        } else {
            if(team.last_rank - team.rank_sort > highestRiser.risen) {
                team.risen = team.last_rank - team.rank_sort;
                highestRiser = team;
            }
            if(team.rank_sort - team.last_rank > lowestFaller.fallen) {
                team.fallen = team.rank_sort - team.last_rank;
                lowestFaller = team;
            }
            if(team.event_total > biggestPoints.mostPoints) {
                team.mostPoints = team.event_total;
                biggestPoints = team;
            }
            if(team.event_total < lowestPoints.leastPoints) {
                team.leastPoints = team.event_total;
                lowestPoints = team;
            }
        }
    });
    return {
        "highestRiser": highestRiser,
        "lowestFaller": lowestFaller,
        "biggestPoints": biggestPoints,
        "lowestPoints": lowestPoints
    };


};