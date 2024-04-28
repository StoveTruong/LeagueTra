import React, {useEffect, useState} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './searchbar.css'

  export default function SearchPageComponent({ setSearchResult }) {
  const getFullPlayerUrl = '/summoner';
  const [selectedRegion, setSelectedRegion] = useState('NA');
  const [searchInput, setSearchInput] = useState('');


  const HandleSearch = async () => {
    // Validates User Input to see if it is a valid IGN
    let taglineIndex = searchInput.indexOf('#');
    let _tagLine = searchInput.substring(taglineIndex + 1);
    if(taglineIndex < 0 || !_tagLine) {
      setSearchResult({error: 'Please enter tagline'});
      return;
    }
    let _gameName = searchInput.substring(0, taglineIndex);
    if(!_gameName) {
      setSearchResult({error: 'Please enter name'});
      return;
    }
    if(!selectedRegion) {
      setSearchResult({error: 'Please select a region'});
      return;
    }
    setSearchResult(null);

    // const urlParams = `gameName=${_gameName}&tagLine=${_tagLine}&server=${selectedRegion.toLowerCase()}`;

    const urlParams = `${_gameName}/${_tagLine}/${selectedRegion.toLowerCase()}`;
    const finalUrl = `/summoner/${urlParams}`;

      try {
        const response = await fetch(finalUrl,{
          method: 'GET',
          headers: { 'Content-Type' : 'application/json'},
        });
        if (!response.ok){
          throw new Error('HTTP Error status: ${response.status}');
          console.log(response.ok);
        }
        const json = await response.json();
        setSearchResult(json);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setSearchResult({error: 'Failed to fetch data'});
      };
    }

  return (
    <div className='search-compontent'>
      <div className='searchBar-container'>
      <select className='dropdown-container'>
        <option className='dropdown-content'>NA</option>
        <option className='dropdown-content'>EUN</option>
        <option className='dropdown-content'>EUW</option>
        <option className='dropdown-content'>OC</option>
        <option className='dropdown-content'>KR</option>
        <option className='dropdown-content'>JP</option>
        <option className='dropdown-content'>SG</option>
      </select>
      <div class= "vertical"></div>
      <input className='searchbar' type="text" placeholder="SummonerName#ID" onChange={event => {setSearchInput(event.target.value)}} 
      onKeyDown={event => {if(event.key === 'Enter') HandleSearch()} } value={searchInput}></input>
      </div>
    </div>
  );
}