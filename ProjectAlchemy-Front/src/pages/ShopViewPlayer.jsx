import { useState, useEffect} from "react";
import { useStoreContext } from "../context";
import ShopNavBar from "../components/ShopNavBar";


function ShopViewPlayer(){
    if(!useStoreContext()){
      console.log('PROBLEM WITH STORE CONTEXT')
    }
    const {componentMap, storeLayout} = useStoreContext();
    const [dynamicShopComponent, setDynamicShopComponent] = useState([]);
    

    useEffect(()=>{
        const shopComponents = storeLayout.map((item,index) =>{
          console.log(`${index}, ${item.name}`)
          if(item.name == 'Card'){
            item.name = 'ShopCard'
          }
          const DynamicComponent = componentMap[item.name]
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
        </>
    )
}

export default ShopViewPlayer;