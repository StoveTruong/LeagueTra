// import React, { useState } from 'react';
// import SearchPageComponent from './components/searchbar/searchBar';
// import MatchDetails from './components/gamehistory/gameHistory';
// import ErrorComponent from './components/error/error';
// function App() {
//   const [searchResult, setSearchResult] = useState(null);

//   return (
//     <div>
//       <SearchPageComponent setSearchResult={setSearchResult}/>
//       <MatchDetails searchResult={searchResult} />
//     </div>
//   );
// }

// export default App;


// <div>
//   <SearchPageComponent onSearch={handleSearch} />
//   {searchResult && searchResult.error ? (
//     <ErrorComponent message={searchResult.error} />
//   ) : (
//     searchResult && <MatchDetails searchResult={searchResult} />
//   )}
// </div>



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