import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SearchBarComponent from './components/search-bar/search-bar'
import ErrorPageComponent from './components/error-page/error-page'

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<SearchBarComponent/>} />
        <Route path='/error' element={<ErrorPageComponent/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App