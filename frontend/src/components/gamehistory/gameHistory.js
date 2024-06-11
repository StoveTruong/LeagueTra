import React, {useEffect, useState} from 'react'
import './gameHistory.css';

export default function MatchCard({ searchResult }) {

  const [summonerSpellMapping, setSummonerSpellMapping] = useState({});
  const [queueIDMapping, setqueueIDMapping] = useState({});


  useEffect(() => {
    const fetchSpellData = async () => {
      const response = await fetch('https://ddragon.leagueoflegends.com/cdn/14.7.1/data/en_US/summoner.json');
      const data = await response.json();
      const spells = {};
      Object.keys(data.data).forEach(key => {
        spells[data.data[key].key] = data.data[key].id;
      });
      setSummonerSpellMapping(spells);
    };

    fetchSpellData();
  }, []);


  const queueIdMap = {
    420: 'Ranked Solo/Duo',
    440: 'Ranked Flex',
    430: 'Normal Blind Pick',
    400: 'Normal Draft Pick',
    450: 'ARAM',
    850: 'Co-op vs AI',
    840: 'Co-op vs AI',
    830: 'Co-op vs AI',
    900: 'URF',
    1300: 'Nexus Blitz',
    700: 'Clash',
    1020: 'One for All',
    1400: 'Ultimate Spellbook',
    1700: 'Arena'
  };

  const correctedQueueID = (queueId) => {
    return queueIdMap[queueId] || 'Other';

  }



  const timeSince = (gameCreation) => {
    const millisecondsPerMinute = 60000;
    const millisecondsPerHour = 3600000;
    const millisecondsPerDay = 86400000;
  
    const now = Date.now();
    const elapsed = now - gameCreation;
  
    if (elapsed < millisecondsPerDay) {
      if (elapsed < millisecondsPerHour) {
        const minutes = Math.round(elapsed / millisecondsPerMinute);
        return `${minutes} minutes ago`;
      }
      const hours = Math.round(elapsed / millisecondsPerHour);
      return `${hours} hours ago`;
    } else if (elapsed < 2 * millisecondsPerDay) {
      return 'Yesterday';
    }
    return new Date(gameCreation).toLocaleDateString(); 
  };

  const gameDuration = (gameDuration) => {
    const minutes = Math.floor(gameDuration / 60)
    const seconds = gameDuration % 60

    return `${minutes}m ${seconds}s`;
  }

  const renderMatch = (match) => {
    const participants = match.info.participants;
    const myPlayer = match.myPlayerIndex

    console.log('Participants:', participants);

    return (
      // Ask Clerk about html elements and use the right ones 
      <div key={match.metadata.matchId} className="match-card">
        {/* Remove match ID or leave for dev mode */}
      <h3>Match ID: {match.metadata.matchId}</h3>
        {/* Dates */}
        <p>Game Creation Time: {timeSince(match.info.gameCreation)}</p>
        <p>Game Duration: {gameDuration(match.info.gameDuration)}</p>
        {/* Remove Gamemmode and display mode */}
        <p>Gamemode :{correctedQueueID(match.info.queueId)}</p>
        {/* Win: True/False. (Say victory/defeat in green/red respective)*/}
        <p>Win: {match.info.teams.win ? 'Yes' : 'No'}</p>
        {/* Average match MMR */}

        {/* This will be the main player card. 
        
        Expecting: 
        Stats
        KD + Kill participation
        CS
        Gold
        Sums
        Level
        Champ picture
        Items
        Runes (Keystone + sub)
        
        */}
        
        <img src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/champion/${participants.championName[myPlayer]}.png`}/>
        <img src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/spell/${summonerSpellMapping[participants.summoner1Id[myPlayer]]}.png`} alt={summonerSpellMapping[participants.summoner1Id]} />
        <img src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/spell/${summonerSpellMapping[participants.summoner2Id[myPlayer]]}.png`} alt={summonerSpellMapping[participants.summoner1Id]} />
        
        
        <p>{participants.kills[myPlayer]}/{participants.deaths[myPlayer]}/{participants.assists[myPlayer]}</p>
        <p>{participants.deaths[myPlayer] === 0 ? (participants.kills[myPlayer] + participants.assists[myPlayer]) : ((participants.kills[myPlayer] + participants.assists[myPlayer]) / participants.deaths[myPlayer]).toFixed(2)}</p>
        <p>Total damage: {participants.physicalDamageDealtToChampions[myPlayer] + participants.magicDamageDealtToChampions[myPlayer] + participants.trueDamageDealtToChampions[myPlayer]}</p>

        {/* This will be the other players */}
        <br></br>
        <p>Other players</p>
        {participants.championName.map((ChampionName, index) => (
          <div key={index}>
            <p>{participants.riotIdGameName[index]}</p>
            <img src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/champion/${ChampionName}.png`}/>
            
          </div>
        ))}
      </div>
    );
  };
  if (!Array.isArray(searchResult)) {
    return <div>No match data available.</div>;
  }

  return(
    <div>
      {searchResult.map((match) => renderMatch(match))}
    </div>
  );
}


// {participants.championName.map((particpant, index) => (
//   <div key={index}>
//     <p>Champion: {particpant}</p>
//     <img src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/champion/${particpant}.png`}/>
//     <img src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/spell/SummonerFlash.png`}/>
//     <img src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/spell/${summonerSpellMapping[participants.summoner1Id]}.png`} alt={summonerSpellMapping[participants.summoner1Id]} />
//     <img src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/spell/${summonerSpellMapping[participants.summoner2Id]}.png`} alt={summonerSpellMapping[participants.summoner1Id]} />
    
//     <p>{summonerSpellMapping[participants.summoner1Id]}</p>
//     <p>{summonerSpellMapping[participants.summoner2Id]}</p>

//     <p>This is {participants.summoner1Id}</p>
//     <p>This is {participants.summoner2Id}</p>
//     <p>${summonerSpellMapping[participants.summoner1Id]}$</p>
//     <p>{participants.kills[index]}/{participants.deaths[index]}/{participants.assists[index]}</p>
//     <p>{participants.deaths[index] === 0 ? (participants.kills[index] + participants.assists[index]) : ((participants.kills[index] + participants.assists[index]) / participants.deaths[index]).toFixed(2)}</p>
//     <p>Total damage: {participants.physicalDamageDealtToChampions[index] + participants.magicDamageDealtToChampions[index] + participants.trueDamageDealtToChampions[index]}</p>
//   </div>
// ))}