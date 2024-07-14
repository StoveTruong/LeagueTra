import React, { useEffect, useState } from 'react';
import './gameHistory.css';

export default function MatchCard({ searchResult }) {

  const [summonerSpellMapping, setSummonerSpellMapping] = useState({});

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
    const minutes = Math.floor(gameDuration / 60);
    const seconds = gameDuration % 60;

    return `${minutes}m ${seconds}s`;
  }

  const transformParticipants = (participants) => {
    const transformed = [];
    const keys = Object.keys(participants);
    const length = participants[keys[0]].length;

    for (let i = 0; i < length; i++) {
      const participant = {};
      keys.forEach(key => {
        participant[key] = participants[key][i];
      });
      transformed.push(participant);
    }

    return transformed;
  };

  const renderMatch = (match) => {
    const participants = transformParticipants(match.info.participants);
    const myPlayer = match.myPlayerIndex;

    // Filter participants by team ID
    const team100 = participants.filter((participant) => participant.teamId === 100);
    const team200 = participants.filter((participant) => participant.teamId === 200);

    // Determine the win status
    const myTeamId = participants[myPlayer].teamId;
    const teamIndex = match.info.teams.teamId.indexOf(myTeamId);

    const didWin = match.info.teams.win[teamIndex];
    console.log('MatchID',match.metadata.matchID);
    console.log('Win:', didWin);

    console.log('Participants:', participants);

    return (
  <div key={match.metadata.matchId} className={`match-card ${didWin ? 'Victory' : 'Defeat'}`}>
    <div className="match-metadata">
      <p className="match-outcome">
        {didWin ? 'Victory' : 'Defeat'}
      </p>
      <p className='queue-type'>{correctedQueueID(match.info.queueId)}</p>
      {/* <h2>Match ID: {match.metadata.matchId}</h2> */}
      <p>{timeSince(match.info.gameCreation)}</p>
      <p>{gameDuration(match.info.gameDuration)}</p>
    </div>

    <div className="player-data">
      <img className="champion-picture" src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/champion/${participants[myPlayer].championName}.png`} alt={participants[myPlayer].championName} />
      <div className="summoner-icons">
        <img src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/spell/${summonerSpellMapping[participants[myPlayer].summoner1Id]}.png`} alt={summonerSpellMapping[participants[myPlayer].summoner1Id]} />
        <img src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/spell/${summonerSpellMapping[participants[myPlayer].summoner2Id]}.png`} alt={summonerSpellMapping[participants[myPlayer].summoner2Id]} />
      </div>
      <div className="item-container">
        <div className="item-wrapper">
          <img className="items" src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/item/${participants[myPlayer].item0}.png`} onError={(e) => e.target.style.display = 'none' || e.target.parentNode.classList.add('default-item')} alt={`Item 0`} />
        </div>
        <div className="item-wrapper">
          <img className="items" src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/item/${participants[myPlayer].item1}.png`} onError={(e) => e.target.style.display = 'none' || e.target.parentNode.classList.add('default-item')} alt={`Item 1`} />
        </div>
        <div className="item-wrapper">
          <img className="items" src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/item/${participants[myPlayer].item2}.png`} onError={(e) => e.target.style.display = 'none' || e.target.parentNode.classList.add('default-item')} alt={`Item 2`} />
        </div>
        <div className="item-wrapper">
        <img className="items" src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/item/${participants[myPlayer].item3}.png`} onError={(e) => e.target.style.display = 'none' || e.target.parentNode.classList.add('default-item')} alt={`Item 3`} />
        </div>
        <div className="item-wrapper">
          <img className="items" src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/item/${participants[myPlayer].item4}.png`} onError={(e) => e.target.style.display = 'none' || e.target.parentNode.classList.add('default-item')} alt={`Item 4`} />
        </div>
        <div className="item-wrapper">
          <img className="items" src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/item/${participants[myPlayer].item5}.png`} onError={(e) => e.target.style.display = 'none' || e.target.parentNode.classList.add('default-item')} alt={`Item 5`} />
        </div>
      </div>
    </div>

    <div className="game-stats">
      <div>{participants[myPlayer].kills}/{participants[myPlayer].deaths}/{participants[myPlayer].assists}</div>
      <p>{participants[myPlayer].deaths === 0 ? (participants[myPlayer].kills + participants[myPlayer].assists) : ((participants[myPlayer].kills + participants[myPlayer].assists) / participants[myPlayer].deaths).toFixed(2)}</p>
      <p>Total damage: {participants[myPlayer].physicalDamageDealtToChampions + participants[myPlayer].magicDamageDealtToChampions + participants[myPlayer].trueDamageDealtToChampions}</p>
    </div>

    <div className="teams-container">
      <div className="other-players-team">
        {team100.map((participant, index) => (
          <div key={index} className="other-players-data">
            <img className="champion-picture" src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/champion/${participant.championName}.png`} alt={participant.championName} />
            <div className='other-players-username'>{participant.riotIdGameName}</div>
          </div>
        ))}
      </div>
      <div className="other-players-team">
        {team200.map((participant, index) => (
          <div key={index} className="other-players-data">
            <img className="champion-picture" src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/champion/${participant.championName}.png`} alt={participant.championName} />
            <div className='other-players-username'>{participant.riotIdGameName}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
    );
  }

  if (!Array.isArray(searchResult)) {
    return <div>Nothing here yet</div>;
  }

  return (
    <div>
      {searchResult.map((match) => renderMatch(match))}
    </div>
  );
}
