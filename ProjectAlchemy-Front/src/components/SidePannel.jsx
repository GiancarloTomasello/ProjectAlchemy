import React, { useCallback } from 'react'
import {useState, useEffect, useRef} from 'react'
import { useStoreContext } from '../context'
import ItemCardSimple from './ItemCardSimple';

function SidePannel({items}){
    const {stockedItems, stockedItemList, itemCatalog} = useStoreContext();
    console.log('stocklist inpannel: ', stockedItemList)

    const sidePanelRef = useRef(null);
    const buttonRef = useRef(null);
    const [sidePanelState, setSidePanelState] = useState(false);

    const TogglePanel = useCallback(() => {
        if(sidePanelRef.current){
                if(sidePanelState){
                    console.log("Hide Panel")
                    sidePanelRef.current.style.transform="translate(100%)"
                    setSidePanelState(false);
                }else{
                    console.log("show panel")
                    sidePanelRef.current.style.transform="translate(0%)"
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


    return(
        <>
        <button ref={buttonRef} id="sidePannelButton" onClick={TogglePanel}
            className="fixed left-5 rounded-md bg-white/10 px-2.5 py-1.5 hover:bg-white/20">
                Testing Side
        </button>

        {/* <div className='fixed right-0 left-auto top-0 flex gap-5 z-2 '>
            <h1>TESTING</h1>
            <button>click me</button>
        </div> */}
        <div id="sidePanel" ref={sidePanelRef} className="sidePanel">
            <div className="sidepanel header">
                <h1 className="font-bold">Item List</h1>
                <button className='sideButton'>Update Catalog</button>
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