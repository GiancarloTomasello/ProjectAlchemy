import { useState, useEffect } from 'react'
// import './App.css'
import Card from "../components/Card.jsx"
import Banner from '../components/Banner.jsx'
import SidePannel from '../components/SidePannel.jsx'
import { useStoreContext } from '../context.jsx'
import EditNavBar from '../components/EditNavBar.jsx'
import { Outlet, useParams } from 'react-router-dom'

function ShopPreview() {
  const {setCurrentStoreId} = useStoreContext(); //Causing a Uncaught TypeError: (intermediate value)() is undefined, but not consistent

  const {storeid} = useParams();
  if(storeid && setCurrentStoreId){
    setCurrentStoreId(storeid)
  }

  return (
    <>
      <EditNavBar/>
      <Outlet/>
    </>
  )
}

export default ShopPreview
