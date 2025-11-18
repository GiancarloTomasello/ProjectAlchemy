import { useState, useEffect } from "react";
import { useStoreContext } from "../context";

function ShopViewPlayer(){
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
        <div id='dynamicShop'>
            {dynamicShopComponent ? dynamicShopComponent : <p>customShopLayoutNull</p>}
        </div>
        </>
    )
}

export default ShopViewPlayer;