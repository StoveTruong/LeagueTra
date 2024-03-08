// import React, {useEffect, useState} from 'react';
// import {searchResult} from './compontents/search-page/search-page';
// import SearchPageComponent from './compontents/searchbar/searchbar';


// export default function matchDetailsComponent(){
//     const [searchResult, setSearchResult] = useState(null);

//     return (
//         <div className='App'>
//             <SearchPageComponent onSearch={setSearchResult}/>
//             <div className='searchResult'>
//               <p>Here is the data: {JSON.stringify(searchResult, null, 2)}</p>
//             </div>
//         </div>
//       );
//     }
import React, {useEffect, useState} from 'react';
import {searchResult} from './compontents/search-page/search-page';



function matchDetails(){

    return(
        <div>
            { JSON.stringify(searchResult) }
        </div>
    )
}
