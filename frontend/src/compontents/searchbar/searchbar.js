import React, {useState, useEffect, useRef} from 'react';


//import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';


import './searchbar.css'


export default function SearchPageComponent({ onSearch }) {
  const testUrl = '/user';
  const [searchInput, setSearchInput] = useState("");
  const [selectedServer, setSelectedServer] = useState("na");
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle for the dropdown. stopProp prevents progation of same event being called. toggle visablity
  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsVisible(!isVisible)
  }

  //Updates the selectedServer state and hides dropdown
  const handleSelect = (server) => {
    setSelectedServer(server);
    setIsVisible(false)
  }

  //When the mouse clicks on something outside the dropdown. closes the dropdown
  useEffect(() => {
    //Check for DOM and see if its updated (I think this is where the problem is the event is not propgating???)
    const handleClickOutside = (event) => {
      //dropdownRef is hook for DOM and current DOM is whatever is being refer down there in this case the dropdown.
      //the other condition is if the event.target is not the dropdown. if object is not clicked change visablity to false
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };
    //Avoiding memory leaks and ensure the event listener does not run. We create the event listen and yeet the event listener because we are clicking outside DOM
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  //Wanted an enter button will adjust to a clearer looking button
  const handleSearchClick = () => {
    HandleSearch(); 
  };

  function HandleSearch() {
    if(searchInput) {
      // Validates User Input to see if it is a valid IGN
      let taglineIndex = searchInput.indexOf('#');
      let _tagLine = searchInput.substring(taglineIndex + 1, searchInput.length);
      if(taglineIndex < 0 || !_tagLine) {
        onSearch({error: 'Please enter tagline'});
        return;
      }
      let _gameName = searchInput.substring(0, taglineIndex);
      if(!_gameName) {
        onSearch('Please enter name');
        return;
      } 
      onSearch('');

      const urlParams  = `${_gameName}/${_tagLine}/${selectedServer}`;

      const finalUrl = testUrl + '/' + urlParams


      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };

      fetch(finalUrl, requestOptions)
        .then(response => response.json())
        .then(json => onSearch(json))
        .catch(error => console.error(error));
    }
    else {
      onSearch("Please provide a valid search");
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

            {/* the ref  */}
            <div className='dropdown' ref={dropdownRef}>
              <div className='dropdown-btn' onClick={toggleDropdown}>
                {selectedServer.toUpperCase()}
              </div>
              <div className={`dropdown-content ${isVisible ? 'dropdown-content-visible' : ''}`}>
                <div className='dropdown-item' onClick={() => handleSelect('NA')}>NA</div>
                <div className='dropdown-item' onClick={() => handleSelect('EU')}>EU</div>
              </div>
            </div>

          <button className='search-btn' onClick={handleSearchClick}>Search</button>
        </div>
      </nav>
    </>
  );
}

// Start up flask.
// Start frontend by nagivating to frontend dir
// npm install if not done (get needed compontents)
// npm start


// Get rid of results get js to return results


/* <div className='searchForm-container'>
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
</ul> */


        /* <div className='onSearch'>
          <p>{ JSON.stringify(onSearch) }</p>
        </div>  */


/*          <Dropdown> 
<Dropdown.Toggle variant='success' id= "dropdown-servers" className='dropdown-toggle'>
<div>{selectedServer.toUpperCase()}</div>
</Dropdown.Toggle>
<Dropdown.Menu>
<div>
<Dropdown.Item eventKey="na" onClick={toggleServerDropdown}>NA</Dropdown.Item>
</div>
<div>
<Dropdown.Item eventKey="eun" onClick={toggleServerDropdown}>EUN</Dropdown.Item>
</div>
<div>
<Dropdown.Item eventKey="kr" onClick={toggleServerDropdown}>KR</Dropdown.Item>
</div>
<div>
<Dropdown.Item eventKey="jp" onClick={toggleServerDropdown}>JP</Dropdown.Item>
</div>
<div>
<Dropdown.Item eventKey="oc" onClick={toggleServerDropdown}>OC</Dropdown.Item>
</div>
<div>
<Dropdown.Item eventKey="sg" onClick={toggleServerDropdown}>SG</Dropdown.Item>
</div>
</Dropdown.Menu>
</Dropdown>
*/