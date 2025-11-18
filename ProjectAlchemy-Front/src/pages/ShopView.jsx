import { useState, useEffect } from 'react'
// import './App.css'
import Card from "../components/Card.jsx"
import Banner from '../components/Banner.jsx'
import SidePannel from '../components/SidePannel.jsx'
import { useStoreContext } from '../context.jsx'
import EditNavBar from '../components/EditNavBar.jsx'
import { Outlet } from 'react-router-dom'

function ShopPreview() {
  return (
    <>
      <EditNavBar/>
      <Outlet/>
    </>
  )
}

export default ShopPreview
