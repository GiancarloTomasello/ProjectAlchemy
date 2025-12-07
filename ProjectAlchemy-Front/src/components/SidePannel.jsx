import React, { useCallback } from 'react'
import {useState, useEffect, useRef} from 'react'
import { useStoreContext } from '../context'
import ItemCardSimple from './ItemCardSimple';

function SidePannel(){
    const {stockedItemList, itemCatalog, updateStoreCatalog} = useStoreContext();
    console.log('stocklist inpannel: ', stockedItemList)

    const sidePanelRef = useRef(null);
    const buttonRef = useRef(null);
    const [sidePanelState, setSidePanelState] = useState(false);

    const [filteredCatalog, setfilteredCatalog] = useState([]);
    const [rarityFilter, setRarityFilter] = useState('any');
    const [typeFilter, setTypeFilter] = useState('any');
    const [textFilter, settextFilter] = useState('');


    const TogglePanel = useCallback(() => {
        if(sidePanelRef.current){
                if(sidePanelState){
                    console.log("Hide Panel")
                    sidePanelRef.current.style.transform="translate(100%)"
                    //buttonRef.current.style.right="1/4"
                    setSidePanelState(false);
                }else{
                    console.log("show panel")
                    sidePanelRef.current.style.transform="translate(0%)"
                    //buttonRef.current.style.right="0"
                    setSidePanelState(true);
                }
            }else{
                alert("ISSUE WITH SIDE PANEL")            
            }
    }, [setSidePanelState, sidePanelState])

    // //Implementation to close panel when clicking off
    // //BUG: Currently triggers when clicking on itemCards too
    // useEffect(() => {
    //     function handler (e){
    //         console.log(e.target.parentElement.contains(sidePanelRef.current))
    //         if(sidePanelRef.current && sidePanelState == true && e.target != buttonRef.current){
    //             if(e.target != sidePanelRef.current){
    //                 //TogglePanel()
    //             }
    //         }
    //     }

    //     document.addEventListener("click", handler)

    //     return () => {
    //         document.removeEventListener('click', handler)
    //     }
    // }, [sidePanelState, TogglePanel])

    const filterCatalog = useCallback(() =>{
        let newCatalog = itemCatalog
        //Filter by rarity
        newCatalog = newCatalog.filter(item => item.rarity === rarityFilter || rarityFilter=== 'any')

        console.log(typeFilter)
        //Filter by type
        newCatalog = newCatalog.filter(item => item.equipmentCatagory === typeFilter || typeFilter === 'any')

        //Filter by name
        newCatalog = newCatalog.filter(item => item.name.toLowerCase().includes(textFilter.toLowerCase()) || textFilter == '')
        console.log("filtered catalog", newCatalog)
        setfilteredCatalog(newCatalog)
    }, [itemCatalog, rarityFilter, typeFilter, textFilter])

    useEffect(() => {
        filterCatalog()
    }, [filterCatalog])
    
    
    const UpdateCatalog = () => {
        updateStoreCatalog(stockedItemList)
    }

    const filterRarity = (e) =>{
        console.log("rarity changed = ", e.target.value)
        const filter = e.target.value
        setRarityFilter(filter);
        //filterCatalog();
    }

    const filterType = (e) =>{
        console.log(e.target.value)
        const filter = e.target.value
        setTypeFilter(filter);
    }

    const filterTest = (e) =>{
        console.log("current searchVal:", e.target.value)
        settextFilter(e.target.value)
    }

    function resetFilters(){
        console.log('reset')

        const rarityElement = document.getElementById('raritySelector')
        const typeElement = document.getElementById('typeSelector')

        if(rarityElement)
            rarityElement.selectedIndex = 0;
            setRarityFilter('any')
        if(typeElement)
            typeElement.selectedIndex = 0;
            setTypeFilter('any')

        settextFilter('')
    }

    return(
        <>
        <button ref={buttonRef} id="sidePannelButton" onClick={TogglePanel}
            className="fixed z-20 right-1/4 left-auto rounded-md bg-white/10 px-2.5 py-1.5 hover:bg-white/20 -transform-x-10">
                Testing Side
        </button>
        <div id="sidePanel" ref={sidePanelRef} className="sidePanel">

            <div className="sidepanel header">
                <h1 className="font-bold">Item List</h1>
            </div>
            <div className='flex flex-row flex-wrap m-1 bg-stone-400 border-4 border-black-500 rounded p-2 justify-center'>
                <label className='w-full'>
                    Search bar:
                    <input id='searchbar' type='text' className='w-3/5 ml-1 border-2 border-black-500' value={textFilter} onChange={filterTest}/>
                    <button className='ml-2' onClick={resetFilters}>Reset Filters</button>
                </label>
                <label>
                    Rarity: 
                    <select id='raritySelector' onChange={filterRarity} className='m-3 border-1 border-black rounded text-center'>
                        <option value='any'>Any</option>
                        <option value='Common'>Common</option>
                        <option value='Uncommon'>Uncommon</option>
                        <option value='Rare'>Rare</option>
                        <option value='Very Rare'>Very Rare</option>
                        <option value='Legendary'>Legendary</option>
                        <option value='Artifact'>Artifact</option>
                    </select>
                </label>
                <label>
                    Type: 
                    <select id='typeSelector' onChange={filterType} className='m-3 border-1 border-black rounded text-center'>
                        <option value='any' selected>Any</option>
                        <option value='Adventuring Gear'>Adventuring Gear</option>
                        <option value='Armor'>Armor</option>
                        <option value='Potion'>Potion</option>
                        <option value='Ring'>Ring</option>
                        <option value='Rod'>Rod</option>
                        <option value='Shield'>Shield</option>
                        <option value='Tools'>Tools</option>
                        <option value='Weapon'>Weapon</option>
                        <option value='Wondrous Items'>Wonderous Items</option>
                        
                    </select>
                </label>
            </div>
            <div className='sidepanel catalog'>
                <ol className=''>
                    {filteredCatalog.map((item, index) => <li><ItemCardSimple item={item} key={index}/></li>)}
                </ol>
            </div>
            <div className='w-full h-full text-center'>
                <button className='sideButton' onClick={UpdateCatalog}>Update Catalog</button>
            </div>
        </div>     
        </>
    );
}

export default SidePannel