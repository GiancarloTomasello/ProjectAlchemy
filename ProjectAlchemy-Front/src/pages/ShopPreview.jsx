import { useState, useEffect } from 'react'
// import './App.css'
import Card from "../components/Card.jsx"
import Banner from '../components/Banner.jsx'
import SidePannel from '../components/SidePannel.jsx'
import { useStoreContext } from '../context.jsx'
import EditNavBar from '../components/EditNavBar.jsx'
import {useLocation} from 'react-router-dom'
import Modal from 'react-modal';



var items = [
  {'name': 'a', 'cost': 100, 'rarity': 'Common', 'description': 'test test', 'instock': true},
  {'name': 'b', 'cost': 50, 'rarity': 'Common', 'description': 'test test', 'instock': true},
  {'name': 'c', 'cost': 509, 'rarity': 'Rare', 'description': 'test test', 'instock': true},
];

//Run when window has loaded
window.onload = () => {

}

function ShopPreview() {

  const {itemCatalog, stockedItemList, 
    isLoadingCatalog, catalogError, 
    storeLayout, componentMap} = useStoreContext();


  const [dynamicShopComponent, setDynamicShopComponent] = useState([]);

  useEffect(()=>{
    //console.log("Store Layout: ", storeLayout)
    const shopComponents = storeLayout.map((item,index) =>{
      const DynamicComponent = componentMap[item.name]
      const newComponent = DynamicComponent ? <DynamicComponent {...item.props} key={index}/> : <p>Component Not found</p>
      return newComponent
    })

    setDynamicShopComponent(shopComponents)
  }, [setDynamicShopComponent, storeLayout, componentMap])
  return (
    <>
      <SidePannel/>
      <div id='dynamicShop'>
          {dynamicShopComponent ? dynamicShopComponent : <p>customShopLayoutNull</p>}
      </div>
    </>
  )
}

export default ShopPreview
