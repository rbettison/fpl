export default async function handler(req, res) {


    let resp = await fetch("https://fantasy.premierleague.com/api/event-status/");
    let json = await resp.json();
    let event = json.status[0].event;

    console.log(req.query);
    let url = "https://fantasy.premierleague.com/api/entry/" + req.query.teamId + "/event/" + event + "/picks/";
    resp = await fetch(url);
    json = await resp.json();

    let picks = json.picks;
    console.log('manager picks: ' + picks)
    await fillPicksDetail(picks, event);

    console.log('Picks with added data: ' + picks);

    console.log('squad' + picks[0]);
    console.log('fn' + picks[0].first_name)
    console.log('fn' + picks[0].last_name)
    console.log('fn' + picks[0].total_points)

    res.status(200).json(picks);
}

async function fillPicksDetail(picks, event) {
    let resp = await fetch("https://fantasy.premierleague.com/api/event/" + event + "/live/");
    let json = await resp.json();
    let allPicks = json.elements;
    console.log('allPicks: ' + allPicks);

    resp = await fetch("https://fantasy.premierleague.com/api/bootstrap-static/");
    json = await resp.json();
    let playerSummaryData = json.elements;



    picks.forEach(element => {
        let matchingPickData = allPicks.filter((el) => el.id === element.element);
        console.log(matchingPickData[0]);
        element['total_points'] = matchingPickData[0].stats.total_points;

        let matchingPlayerSummary = playerSummaryData.filter((el) => el.id === element.element);
        console.log(matchingPlayerSummary[0]);
        element['name'] = matchingPlayerSummary[0].first_name + ' ' + matchingPlayerSummary[0].second_name;
    });

}


