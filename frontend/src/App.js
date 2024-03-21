import React, { useState, useEffect } from 'react'
import SearchPageComponent from './compontents/searchbar/searchbar'
//Cant use useState in conditions, loops, etc.
function App() {
  //Typical rule of thumb is to use the useState on the top to set variables
  //Fetching data from backend and logging it.
  // const [data, setData] = useState([{}])
  // useEffect(() => {
  //   fetch("/homepage").then(
  //     res => res.json()
  //   ).then(
  //     data => {
  //       setData(data)
  //       console.log(data)
  //     }
  //   )
  // }, [])
  



  
  return (
      <div>
        {
          <SearchPageComponent></SearchPageComponent>
        /* {(typeof data.jsonfileexample === 'undefined') ? (
          <p>Loading...</p>
        ) : (
          // <SearchPageComponent></SearchPageComponent>
          data.jsonfileexample.map(([testing], i) =>(
            <p key={i}>{testing}</p>
          ))
        )} */}

      </div>
    )
}

export default App