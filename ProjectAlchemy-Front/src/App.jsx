import { useState, useEffect } from 'react'
import './App.css'
import Card from "./components/Card.jsx"
import Banner from './components/Banner.jsx'
import SidePannel from './components/SidePannel.jsx'
import ItemCardSimple from './components/ItemCardSimple.jsx'
import { useStoreContext } from './context.jsx'
import {filterTestData} from './assets/assets'

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
  const itemListContainer = document.getElementById("itemList");
  items.forEach(item =>{
    const listItem = document.createElement("li");
    listItem.textContent = `Name:${item.name} Rarity:${item.rarity} cost:${item.cost}`
    itemListContainer.appendChild(listItem)
  })

  console.log(filterTestData)
  const dbListContainer = document.getElementById('equptList')
  Object.keys(filterTestData.equipment).forEach(key =>{
    const listItem = document.createElement("li")
    const innerObject = filterTestData.equipment[key]
    listItem.textContent = `Name: ${innerObject.name} Price: ${innerObject.cost.quantity}${innerObject.cost.unit}`
    // console.log(key)
    dbListContainer.appendChild(listItem)
  })

  const magicListContainer = document.getElementById('magicList')
  Object.keys(filterTestData.magicItems).forEach(key =>{
    const listItem = document.createElement("Card")
    const innerObject = filterTestData.magicItems[key]
    console.log(innerObject)
    listItem.textContent = `Name: ${innerObject.name} Price: TBD`
    // console.log(key)
    magicListContainer.appendChild(listItem)
  })
  

}


function App() {
  //const {stockedItems} = useStoreContext();

  const {itemCatalog, stockedItemList, isLoadingCatalog, catalogError} = useStoreContext();
  //const [data, setData] = useState([]);


  const [dynamicShopComponent, setDynamicShopComponent] = useState([]);
  const [CustomComponentList, setCustomComponentList] =useState(['Banner', 'Card', 'Card'])
  const [dynamicShopProps, setDynamicShopProps] = useState([
    {title:"First shop"}, 
    {name:"Basic Sword", cost:"100GP", type:"Weapon", rarity:"Common"},
    {name:"Basic Wand", cost:"200GP", type:"Wand", rarity:"Common"}
  ])

  useEffect(()=>{
    
    const shopComponents = CustomComponentList.map((item,index) =>{
      console.log('test')
      const DynamicComponent = componentMap[item]
      console.log(dynamicShopProps[index])
      const newComponent = DynamicComponent ? <DynamicComponent {...dynamicShopProps[index]} key={index}/> : <p>Component Not found</p>
      return newComponent
    })
    console.log(shopComponents)

    setDynamicShopComponent(shopComponents)
  }, [setDynamicShopComponent, CustomComponentList, dynamicShopProps])

  console.log(items[0])
  return (
    <>
      <SidePannel/>
      <Banner/>
      <div>
        <h1>Items</h1>
      </div>
      <div>
      </div>
      {/* {stockedItems.filter((item) => item.inStock).map((item) => <Card item={item} key={item.id}/>)} */}
      <ul id='itemList'>Item List</ul>
      <h1>DB ITEMS</h1>
      <ul id='dbitems' className="flex">
        {(!isLoadingCatalog && !catalogError) ?
          itemCatalog.filter(item => stockedItemList.includes(item.id))
                      .map(item => <li><Card item={item} key={item.id}/></li>):
                        <p>ERROR</p>}
      </ul>

      <ul id='equptList'>DB Equipment LIST</ul>
      <ul id='magicList'>DB Magic LIST</ul>
      <div id='dynamicShop'>
          <h1>TESTING</h1>
          {dynamicShopComponent ? dynamicShopComponent : <p>customShopLayoutNull</p>}

          {/* {DynamicComponent ? <DynamicComponent item={items[0]}/> : <p>Component Not found</p>} */}
      </div>
    </>
  )
}

export default App
