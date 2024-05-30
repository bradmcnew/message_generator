

const players = [
    //C's
    { name: 'Jayson Tatum', team: 'Celtics', skillLevel: 95 },
    { name: 'Jaylen Brown', team: 'Celtics', skillLevel: 91 },
    { name: 'Kristaps Porzingis', team: 'Celtics', skillLevel: 88 },
    { name: 'Jrue Holiday', team: 'Celtics', skillLevel: 87 },
    { name: 'Derrick White', team: 'Celtics', skillLevel: 87 },
    //Mav's
    { name: 'Luka Doncic', team: 'Mavs', skillLevel: 97 },
    { name: 'Kyrie Irving', team: 'Mavs', skillLevel: 93 },
    { name: 'Derrick Lively', team: 'Mavs', skillLevel: 82 },
    { name: 'Daniel Gafford', team: 'Mavs', skillLevel: 82 },
    { name: 'P.J. Washington', team: 'Mavs', skillLevel: 80 },
];

const goodEvents = ['hit a HUGE game winner', `scored ${Math.floor(Math.random() * 20 + 40)} points`,
    'had a CLUTCH game saving block', 'led the blowout',
    `commands the ${Math.floor(Math.random() * 20 + 1)} point victory`, `hit 10 three-pointers`];
const badEvents = ['fouled out late in the fourth', `shot ${Math.floor(Math.random() * 20 + 15)}% from the floor`,
    `had ${Math.floor(Math.random() * 5 + 5)} turnovers`, 'had 0 points'];


//calculates skill total of team
const teamSkill = arr => {
    let skillCount = 0;
    for (let player of arr) {
        skillCount += player.skillLevel;
    }
    return skillCount;
}



//celtics players array
const celticsPlayers = players.filter(player => { return player.team === 'Celtics' });
//mavs players array
const mavsPlayers = players.filter(player => { return player.team === 'Mavs' });

//team skill arrays
const celticsSkill = teamSkill(celticsPlayers);
const mavsSkill = teamSkill(mavsPlayers);
const totalSkill = celticsSkill + mavsSkill;

//game simulation
const simGame = () => {
    if (Math.floor(Math.random() * totalSkill + 1) >= 448) {
        //mavs win
        return 'm';
    }
    //celtics win
    return 'c';
}

const celticsNames = celticsPlayers.map(player => { return player.name });
const mavsNames = mavsPlayers.map(player => { return player.name });
const eventSelector = (team) => {
    if (team === 'mavs') {
        if (Math.floor(Math.random() * 2 < 1)) {
            return (`${mavsNames[Math.floor(Math.random() * mavsNames.length)]} ` +
                `${goodEvents[Math.floor(Math.random() * goodEvents.length)]} to WIN game`);
        }
        return (`${celticsNames[Math.floor(Math.random() * celticsNames.length)]} ` +
            `${badEvents[Math.floor(Math.random() * badEvents.length)]} and LOST game`);
    }
    else {
        if (Math.floor(Math.random() * 2 < 1)) {
            return (`${celticsNames[Math.floor(Math.random() * celticsNames.length)]} ` +
                `${goodEvents[Math.floor(Math.random() * goodEvents.length)]} to WIN game`);
        }
        return (`${mavsNames[Math.floor(Math.random() * mavsNames.length)]} ` +
            `${badEvents[Math.floor(Math.random() * badEvents.length)]} and LOST game`);
    }
}
const seriesScore = (DALWins, BOSWins) => {
    if (DALWins > BOSWins) {
        return `DAL leads ${DALWins} - ${BOSWins}`;
    }
    else if (DALWins < BOSWins) {
        return `Bos leads ${BOSWins} - ${DALWins}`;
    }
    else {
        return `Series tied ${BOSWins} - ${DALWins}`;
    }
}
let mavsWins = 0;
let celticsWins = 0;
let gameCount = 0;
let bestOfSeven = () => {
    while (mavsWins < 4 && celticsWins < 4) {
        gameCount++;
        if (simGame() === 'm') {
            mavsWins++;
            console.log(`${eventSelector('mavs')} ${gameCount}!`);
            if (mavsWins === 4) {
                console.log(`\nThe Dallas Mavericks win the NBA Finals!`)
            }
            else {
                console.log(seriesScore(mavsWins, celticsWins) + '\n');
            }
        }
        else {
            celticsWins++;
            console.log(`${eventSelector('celtics')} ${gameCount}!`);
            if (celticsWins === 4) {
                console.log(`\nThe Boston Celtics win the NBA Finals!`)
            }
            else {
                console.log(seriesScore(mavsWins, celticsWins) + '\n');
            }
        }
    }
}

bestOfSeven();
