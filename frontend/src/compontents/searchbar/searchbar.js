import React, {useEffect, useState} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './searchbar.css'

export default function SearchPageComponent() {
  const getFullPlayerUrl = '/getFullInfo';

  const [selectedRegion, setSelectedRegion] = useState('Select Region');

  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState({});

  function HandleSearch() {
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
    const finalUrl = `/getFullInfo/${urlParams}`;
    

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(finalUrl, requestOptions)
      .then(response => response.json())
      .then(json => setSearchResult(json))
      .catch(error => console.error(error));
  }

  return (
    <div className='searchPageContainer'>
      <div className='searchForm'>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedRegion}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={event => {setSelectedRegion(event.target.text)}}>NA</Dropdown.Item>
            <Dropdown.Item onClick={event => {setSelectedRegion(event.target.text)}}>EUW</Dropdown.Item>
            <Dropdown.Item onClick={event => {setSelectedRegion(event.target.text)}}>EUN</Dropdown.Item>
            <Dropdown.Item onClick={event => {setSelectedRegion(event.target.text)}}>OC</Dropdown.Item>
            <Dropdown.Item onClick={event => {setSelectedRegion(event.target.text)}}>KR</Dropdown.Item>
            <Dropdown.Item onClick={event => {setSelectedRegion(event.target.text)}}>JP</Dropdown.Item>
            <Dropdown.Item onClick={event => {setSelectedRegion(event.target.text)}}>SG</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <input className='summonerSearchbar' type="text" placeholder="SummonerName#ID" onChange={event => {setSearchInput(event.target.value)}} 
          onKeyDown={event => {if(event.key === 'Enter') HandleSearch()} } value={searchInput}></input>
      </div>
      <div className='searchResult'>
        <p>{ JSON.stringify(searchResult) }</p>
      </div>
    </div>
  );
}
