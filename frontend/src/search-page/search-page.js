import React, {useState} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './search-page.css'

export default function SearchPageComponent() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const handleSearch = () => {
    if(searchInput) {
      setSearchResult(searchInput);
    }
    else {
      setSearchResult("Please provide a valid Summoner Name");
    }
  }

  return (
    <div className='searchPageContainer'>
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      <input className='summonerSearchbar' type="text" placeholder="SummonerName#ID" onChange={event => {setSearchInput(event.target.value)}} 
        onKeyDown={event => {if(event.key === 'Enter') handleSearch()} } value={searchInput}></input>
      <p>{searchResult}</p>
    </div>
  );
}
