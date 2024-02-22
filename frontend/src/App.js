import React, { useState, useEffect } from 'react'
import SearchPageComponent from './compontents/search-page/search-page'
//Cant use useState in conditions, loops, etc.
function App() {

  


  return (
      <div>
        {
          <SearchPageComponent></SearchPageComponent>
        }

      </div>
    )
}

export default App