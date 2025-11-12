import React from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import ShopPreview from './pages/ShopPreview'
import EditLayout from './pages/EditLayout'

function App() {

  return (
    <>
     <Routes>
        <Route path="/" element={<ShopPreview/>}/>
        <Route path="/Preview" element={<ShopPreview/>}/>
        <Route path="/EditLayout" element={<EditLayout/>}/>
        <Route path="/EditCatalog" element={<ShopPreview/>}/>
     </Routes>
    </>
  )
}

export default App
