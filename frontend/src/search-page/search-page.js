import React, {useEffect, useState} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './search-page.css'

export default function SearchPageComponent() {
  const testUrl = '/getFullInfo';

  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState({});

  function HandleSearch() {
    if(searchInput) {
      // Validates User Input to see if it is a valid IGN
      let taglineIndex = searchInput.indexOf('#');
      let _tagLine = searchInput.substring(taglineIndex + 1, searchInput.length);
      if(taglineIndex < 0 || !_tagLine) {
        setSearchResult({error: 'Please enter tagline'});
        return;
      }
      let _gameName = searchInput.substring(0, taglineIndex);
      if(!_gameName) {
        setSearchResult('Please enter name');
        return;
      } 
      setSearchResult('');

      const urlParams = `gameName=${_gameName}&tagLine=${_tagLine}&server=na`;
      const finalUrl = testUrl + '?' + urlParams;
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };

      fetch(finalUrl, requestOptions)
        .then(response => response.json())
        .then(json => setSearchResult(json))
        .catch(error => console.error(error));
    }
    else {
      setSearchResult("Please provide a valid search");
    }
  }

  return (
    <div className='searchPageContainer'>
      <div className='searchForm'>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">NA</Dropdown.Item>
            <Dropdown.Item href="#/action-2">EUW</Dropdown.Item>
            <Dropdown.Item href="#/action-3">EUN</Dropdown.Item>
            <Dropdown.Item href="#/action-3">OC</Dropdown.Item>
            <Dropdown.Item href="#/action-3">KR</Dropdown.Item>
            <Dropdown.Item href="#/action-3">JP</Dropdown.Item>
            <Dropdown.Item href="#/action-3">SG</Dropdown.Item>
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
