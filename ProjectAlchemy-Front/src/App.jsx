import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from "./components/Card.jsx"
import Banner from './components/Banner.jsx'
import SidePannel from './components/SidePannel.jsx'

var items = [
  {'name': 'a', 'cost': 100, 'rarity': 'Common'},
  {'name': 'b', 'cost': 50, 'rarity': 'Common'},
  {'name': 'c', 'cost': 509, 'rarity': 'Rare'},
];

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
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <ul id='itemList'>Item List</ul>
    </>
  )
}

export default App
