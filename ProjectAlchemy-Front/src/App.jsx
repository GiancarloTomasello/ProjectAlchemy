import React from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import ShopPreview from './pages/ShopPreview'
import EditLayout from './pages/EditLayout'
import ShopView from './pages/ShopView'

function App() {

  return (
    <>
     <Routes>
        <Route path="/:storeid" element={<ShopView/>}>
          <Route index element={<ShopPreview/>}/>
          <Route path="Preview" element={<ShopPreview/>}/>
          <Route path="EditLayout" element={<EditLayout/>}/>
          <Route path="EditCatalog" element={<ShopPreview/>}/>
        </Route>
        <Route path="/shop/:storeid" element={<ShopPreview/>}/>
     </Routes>
    </>
  )
}

export default App
