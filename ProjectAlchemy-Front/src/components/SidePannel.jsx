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

    //Implementation to close panel when clicking off
    //BUG: Currently triggers when clicking on itemCards too
    useEffect(() => {
        function handler (e){
            console.log(e.target.parentElement.contains(sidePanelRef.current))
            if(sidePanelRef.current && sidePanelState == true && e.target != buttonRef.current){
                if(e.target != sidePanelRef.current){
                    //TogglePanel()
                }
            }
        }

        document.addEventListener("click", handler)

        return () => {
            document.removeEventListener('click', handler)
        }
    }, [sidePanelState, TogglePanel])

    const UpdateCatalog = () => {
        const newCatalog = itemCatalog.filter(item => stockedItemList.includes(item.id))
        updateStoreCatalog(newCatalog)
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
                <button className='sideButton' onClick={UpdateCatalog}>Update Catalog</button>
            </div>
            <div className='sidepanel catalog'>
                <ol className=''>
                    {itemCatalog.map(item => <li><ItemCardSimple item={item} key={item.id}/></li>)}
                </ol>
            </div>
        </div>     
        </>
    );
}

export default SidePannel