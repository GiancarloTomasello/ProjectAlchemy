import React from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import ShopPreview from './pages/ShopPreview'

function App() {

  return (
    <>
     <Routes>
        <Route path="/" element={<ShopPreview/>}/>
        <Route path="/Layout" element={<ShopPreview/>}/>
     </Routes>
    </>
  )
}

export default App
