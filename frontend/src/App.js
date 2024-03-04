import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
//Import component
//import matchDetailsComponent from './compontents/matchistory/gameHistory';
import SearchPageComponent from './compontents/searchbar/searchbar';
//Error page



export default function App() {

  //return the component instead
  const [searchResult, setSearchResult] = useState(null);

  return (
    <div className='App'>
        <SearchPageComponent onSearch={setSearchResult}/>
        <div className='searchResult'>
          <p>Here is the data: {JSON.stringify(searchResult, null, 2)}</p>
        </div>
    </div>
  );
}