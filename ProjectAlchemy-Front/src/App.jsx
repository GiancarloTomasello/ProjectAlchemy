import React from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import ShopPreview from './pages/ShopPreview'
import EditLayout from './pages/EditLayout'
import ShopView from './pages/ShopView'
import ShopViewPlayer from './pages/ShopViewPlayer.jsx'
import ShopCreationPage from './pages/ShopCreationPage.jsx'
import Modal from 'react-modal';
import CampaignCreationPage from './pages/CampaignCreationPage.jsx'

function App() {

  Modal.setAppElement('#root');

  return (
    <>
     <Routes>
        <Route path="/campaignCreation" element={<CampaignCreationPage/>}/>
        <Route path="/shopCreation" element={<ShopCreationPage/>}/>
        <Route path="/:storeid" element={<ShopView/>}>
          <Route index element={<ShopPreview/>}/>
          <Route path="Preview" element={<ShopPreview/>}/>
          <Route path="EditLayout" element={<EditLayout/>}/>
          <Route path="EditCatalog" element={<ShopPreview/>}/>
        </Route>
        <Route path="/shop/:storeid" element={<ShopPreview/>}/>
        <Route path="/player/store/:storeid" element={<ShopViewPlayer/>}/>
     </Routes>
    </>
  )
}

export default App
