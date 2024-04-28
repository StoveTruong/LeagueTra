import React, { useState } from 'react';
import SearchPageComponent from './components/searchbar/searchBar';
import MatchDetails from './components/gamehistory/gameHistory';

function App() {
  const [searchResult, setSearchResult] = useState(null);

  return (
    <div>
      <SearchPageComponent setSearchResult={setSearchResult} />
      <MatchDetails searchResult={searchResult} />
    </div>
  );
}

export default App;
