import React, {useEffect, useState} from 'react';


import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';


import './search-page.css'


export default function SearchPageComponent() {
  const testUrl = '/user';


  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState({});



  const [selectedServer, setSelectedServer] = useState("na")
  const [toggleServer, setToggleServer] = useState(false)

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

      const urlParams  = `${_gameName}/${_tagLine}/${selectedServer}`;

      const finalUrl = testUrl + '/' + urlParams


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
      //Get brian to make error page pretty please <3
    }
  }

  return (
    <>
      <nav className='searchPage'>
          <div className='searchBar-container'>
            <input 
              className='summonerSearchbar'
              type="text" 
              placeholder="SummonerName#ID" 
              
              onChange={event => {setSearchInput(event.target.value)}} 
              onKeyDown={event => {if(event.key === 'Enter')
              HandleSearch()} } value={searchInput}>
            </input>
            <div className='selectedServer'>{selectedServer.toUpperCase()}</div>
          <Dropdown onSelect={(eventKey) => setSelectedServer(eventKey)}>
            <Dropdown.Toggle variant='success' id= "dropdown-servers" className='dropdown-toggle' >
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="na">NA</Dropdown.Item>

              <Dropdown.Item eventKey="eun">EUN</Dropdown.Item>

              <Dropdown.Item eventKey="kr">KR</Dropdown.Item>

              <Dropdown.Item eventKey="jp">JP</Dropdown.Item>

              <Dropdown.Item eventKey="oc">OC</Dropdown.Item>

              <Dropdown.Item eventKey="sg">SG</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>
        {/* { <div className='searchResult'>
          <p>{ JSON.stringify(searchResult) }</p>
        </div> } */}
      </nav>
    </>
  );
}

// Start up flask.
// Start frontend by nagivating to frontend dir
// npm install if not done (get needed compontents)
// npm start


// Get rid of results get js to return results


{/* <div className='searchForm-container'>
<Link to='/' className='navbar-container'>
  League Tra <i className='navbar-logo' />
</Link>
<div className='menu-icon' onClick={handleClick}>
  <i className={click ? 'fas fa-times' : 'fas fa-bar'}/>
</div>
<ul className={click ? 'nav-menu active' : 'nav-menu'}>
  <li className='nav-item'>
    <Link to="#/action-1">NA</Link>
  </li>
</ul> */}
