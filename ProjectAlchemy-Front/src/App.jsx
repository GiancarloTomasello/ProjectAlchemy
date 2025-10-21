import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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
  const [count, setCount] = useState(0)

  console.log(items[0])
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <ul id='itemList'>Item List</ul>
    </>
  )
}

export default App
