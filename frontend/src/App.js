import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SearchPageComponent from './components/search-bar/search-bar'
import ErrorPageComponent from './components/error-page/error-page'

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<SearchPageComponent/>} />
        <Route path='/error' element={<ErrorPageComponent/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App