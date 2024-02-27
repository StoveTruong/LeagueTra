import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
//Import component
import SearchPageComponent from './compontents/search-page/search-page';
import searchResult from './compontents/search-page/search-page';
//Error page
//Home Page
//UserDisplayPage



function App() {
  const[searchResult, setSearchResult] = useState({});


  


  return (
        <div>
            <SearchPageComponent/>
            <div className='searchResult'>
              <p>{JSON.stringify(searchResult)}</p>
              </div>
          </div>
        )
}

export default App