import React, {useEffect, useState, useRef} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './searchbar.css'

export default function SearchPageComponent() {
  const getFullPlayerUrl = '/summoner';
  const [selectedRegion, setSelectedRegion] = useState('NA');
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState({});
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef(null);
  
  const toggleDropdown = () => setVisible(!visible);


  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setVisible(false); 
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);



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
    <div className='search-compontent'>
      <div className='searchBar-container'>
      <button className='dropdown' onClick={toggleDropdown}> {selectedRegion} </button>
      <div class= "vertical"></div>
      <input className='searchbar' type="text" placeholder="SummonerName#ID" onChange={event => {setSearchInput(event.target.value)}} 
      onKeyDown={event => {if(event.key === 'Enter') HandleSearch()} } value={searchInput}></input>
      </div>
      <div className='dropdown-container' ref={dropdownRef}>
        <a className='dropdown-content' onClick={event => {setSelectedRegion(event.target.text); setVisible(false)}}>NA</a>
        <a className='dropdown-content' onClick={event => {setSelectedRegion(event.target.text); setVisible(false)}}>EUN</a>
        <a className='dropdown-content' onClick={event => {setSelectedRegion(event.target.text); setVisible(false)}}>EUW</a>
        <a className='dropdown-content' onClick={event => {setSelectedRegion(event.target.text); setVisible(false)}}>OC</a>
        <a className='dropdown-content' onClick={event => {setSelectedRegion(event.target.text); setVisible(false)}}>KR</a>
        <a className='dropdown-content' onClick={event => {setSelectedRegion(event.target.text); setVisible(false)}}>JP</a>
        <a className='dropdown-content' onClick={event => {setSelectedRegion(event.target.text); setVisible(false)}}>SG</a>
      </div>
    </div>
    
  );
}

{/* <Dropdown>
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
</Dropdown> */}


{/* <div className='searchPageContainer'>
<button className='dropdown' onClick={toggleDropdown}> {selectedRegion} </button>
<div className='searchForm'>
<input className='summonerSearchbar' type="text" placeholder="SummonerName#ID" onChange={event => {setSearchInput(event.target.value)}} 
    onKeyDown={event => {if(event.key === 'Enter') HandleSearch()} } value={searchInput}></input>
  <div className='dropdown-container' ref={dropdownRef}>
    <a className='dropdown-content' onClick={event => {setSelectedRegion(event.target.text); setVisible(false)}}>NA</a>
    <a className='dropdown-content' onClick={event => {setSelectedRegion(event.target.text); setVisible(false)}}>EUN</a>
    <a className='dropdown-content' onClick={event => {setSelectedRegion(event.target.text); setVisible(false)}}>EUW</a>
    <a className='dropdown-content' onClick={event => {setSelectedRegion(event.target.text); setVisible(false)}}>OC</a>
    <a className='dropdown-content' onClick={event => {setSelectedRegion(event.target.text); setVisible(false)}}>KR</a>
    <a className='dropdown-content' onClick={event => {setSelectedRegion(event.target.text); setVisible(false)}}>JP</a>
    <a className='dropdown-content' onClick={event => {setSelectedRegion(event.target.text); setVisible(false)}}>SG</a>
  </div>
</div>


<div className='searchResult'>
  <p>{ JSON.stringify(searchResult) }</p>
  </div>
</div> */}