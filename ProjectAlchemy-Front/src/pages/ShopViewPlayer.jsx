import { useState, useEffect} from "react";
import { useStoreContext } from "../context";
import ShopNavBar from "../components/ShopNavBar";
import {Toaster} from 'react-hot-toast'
import { useParams } from "react-router-dom";


function ShopViewPlayer(){
    if(!useStoreContext()){
      console.log('PROBLEM WITH STORE CONTEXT')
    }
    const {componentMap, storeLayout, setCurrentStoreId} = useStoreContext();
    const [dynamicShopComponent, setDynamicShopComponent] = useState([]);
    
    const {storeid} = useParams();
    if(storeid && setCurrentStoreId){
      setCurrentStoreId(storeid)
    }

    useEffect(()=>{
        const shopComponents = storeLayout.map((item,index) =>{
          console.log(`${index}, ${item.name}`)
          if(item.name == 'Card'){
            item.name = 'ShopCard'
          }
          const DynamicComponent = componentMap[item.name].component
          const newComponent = DynamicComponent ? <DynamicComponent {...item.props} key={index}/> : <p>Component Not found</p>
          return newComponent
        })
        console.log(shopComponents)
    
        setDynamicShopComponent(shopComponents)
    }, [setDynamicShopComponent, storeLayout, componentMap])

    return(
        <>
        <ShopNavBar id='navBar'/>
        <div id='dynamicShop'>
            {dynamicShopComponent ? dynamicShopComponent : <p>customShopLayoutNull</p>}
        </div>
        <Toaster/>
        </>
    )
}

export default ShopViewPlayer;