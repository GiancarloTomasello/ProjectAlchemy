import { useState, useEffect } from 'react'
// import './App.css'
import Card from "../components/Card.jsx"
import Banner from '../components/Banner.jsx'
import SidePannel from '../components/SidePannel.jsx'
import { useStoreContext } from '../context.jsx'
import EditNavBar from '../components/EditNavBar.jsx'


var items = [
  {'name': 'a', 'cost': 100, 'rarity': 'Common', 'description': 'test test', 'instock': true},
  {'name': 'b', 'cost': 50, 'rarity': 'Common', 'description': 'test test', 'instock': true},
  {'name': 'c', 'cost': 509, 'rarity': 'Rare', 'description': 'test test', 'instock': true},
];

const componentMap ={
  'Card': Card,
  'Banner': Banner,
};

//Run when window has loaded
window.onload = () => {

}

function ShopPreview() {

  const {itemCatalog, stockedItemList, 
    isLoadingCatalog, catalogError, 
    storeLayout, shopDisplayPage} = useStoreContext();


  const [dynamicShopComponent, setDynamicShopComponent] = useState([]);

  useEffect(()=>{
    const shopComponents = storeLayout.map((item,index) =>{
      console.log(`${index}, ${item.name}`)
      const DynamicComponent = componentMap[item.name]
      const newComponent = DynamicComponent ? <DynamicComponent {...item.props} key={index}/> : <p>Component Not found</p>
      return newComponent
    })
    console.log(shopComponents)

    setDynamicShopComponent(shopComponents)
  }, [setDynamicShopComponent, storeLayout])

  console.log(items[0])
  return (
    <>
      {/* <Banner/>
      <div>
      <h1>Items</h1>
      </div>
      <div>
      </div> */}
      {/* {stockedItems.filter((item) => item.inStock).map((item) => <Card item={item} key={item.id}/>)} */}
      <EditNavBar/>
      <SidePannel/>
      <h1>DB ITEMS</h1>
      <ul id='dbitems' className="flex">
        {(!isLoadingCatalog && !catalogError) ?
          itemCatalog.filter(item => stockedItemList.includes(item.id))
                      .map(item => <li><Card {...item} key={item.id}/></li>):
                        <p>ERROR</p>}
      </ul>

      {/* <ul id='equptList'>DB Equipment LIST</ul>
      <ul id='magicList'>DB Magic LIST</ul> */}
      <div id='dynamicShop'>
          {dynamicShopComponent ? dynamicShopComponent : <p>customShopLayoutNull</p>}

          {/* {DynamicComponent ? <DynamicComponent item={items[0]}/> : <p>Component Not found</p>} */}
      </div>
    </>
  )
}

export default ShopPreview
