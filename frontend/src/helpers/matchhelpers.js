import React, {useEffect, useState} from 'react'

export const useFetchSummonerSpellData = (setSummonerSpellMapping) => {
    useEffect (() => {
        const fetchSummonerSpellData = async () => {
            try {
                const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.8.1/data/en_US/summoner.json`);
                const data = await resposne.json();
                const spellMapping = {};
    
                Object.keys(data.data).forEach((key) => {
                    const spell = data.data[key];
                    spellMapping[spell.key] = spell.id
                });
                setSummonerSpellMapping(spellMapping);
            } catch (error) {
                console.error('Error fetching summoner spell data:', error);
            }
        };
        fetchSummonerSpellData();
    }, [setSummonerSpellMapping]);

}



export {fetchChampionImage}
