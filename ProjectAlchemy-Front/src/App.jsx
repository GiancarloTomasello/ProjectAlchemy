import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from "./components/Card.jsx"
import Banner from './components/Banner.jsx'
import SidePannel from './components/SidePannel.jsx'
import ItemCardSimple from './components/ItemCardSimple.jsx'
import { useStoreContext } from './context.jsx'
import {dummyItems} from './assets/assets'

var items = [
  {'name': 'a', 'cost': 100, 'rarity': 'Common', 'description': 'test test', 'instock': true},
  {'name': 'b', 'cost': 50, 'rarity': 'Common', 'description': 'test test', 'instock': true},
  {'name': 'c', 'cost': 509, 'rarity': 'Rare', 'description': 'test test', 'instock': true},
];

const testItemList = [
  <ItemCardSimple />,
  <ItemCardSimple/>
]


//Run when window has loaded
window.onload = () => {
  const itemListContainer = document.getElementById("itemList");
  items.forEach(item =>{
    const listItem = document.createElement("li");
    listItem.textContent = `Name:${item.name} Rarity:${item.rarity} cost:${item.cost}`
    itemListContainer.appendChild(listItem)
  })
}


function App() {
  const {stockedItems, setStockedItems} = useStoreContext();
  // setStockedItems(dummyProducts);

  //console.log(items[0])
  return (
    <>
      <SidePannel items={stockedItems}/>
      <Banner/>
      <div>
        <h1>Items</h1>
      </div>
      <div>
      </div>
      {stockedItems.filter((item) => item.inStock).map((item) => <Card item={item} key={item.id}/>)}
      <ul id='itemList'>Item List</ul>
    </>
  )
}

export default App
