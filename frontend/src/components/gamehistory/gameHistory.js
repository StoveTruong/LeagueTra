import React, {useEffect, useState} from 'react'
import './gameHistory.css';

export default function MatchCard({ searchResult }) {

  const [summonerSpellMapping, setSummonerSpellMapping] = useState({});


  const renderMatch = (match) => {
    const participants = match.info.participants;

    return (
      <div key={match.metadata.matchId} className="match-card">
        <h3>Match ID: {match.metadata.matchId}</h3>
        <p>Game Creation Time: {new Date(match.info.gameCreation).toLocaleString()}</p>
        <h3>Game creation: {match.gameCreation}</h3>
        <p>Game Duration: {match.info.gameDuration} seconds</p>

        
        {participants.championName.map((name, index) => (
          <div key={index}>
            <p>Champion: {name}</p>
            {/* <img src={} /> */}
            <img src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/champion/${name}.png`}/>
            <img src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/spell/${summonerSpellMapping[participants.summoner1Id[index]]}.png`}/>
            <p>{participants.kills[index]}/{participants.deaths[index]}/{participants.assists[index]}</p>
            <p>{participants.deaths[index] === 0 ? (participants.kills[index] + participants.assists[index]) : ((participants.kills[index] + participants.assists[index]) / participants.deaths[index]).toFixed(2)}</p>
            <p>Total damage: {participants.physicalDamageDealtToChampions[index] + participants.magicDamageDealtToChampions[index] + participants.trueDamageDealtToChampions[index]}</p>
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