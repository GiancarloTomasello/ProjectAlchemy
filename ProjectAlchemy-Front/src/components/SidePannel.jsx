import React, { useCallback } from 'react'
import {useState, useEffect, useRef} from 'react'
// const buttonElement = document.getElementById("sidePannelButton") 

function SidePannel(){
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

    useEffect(() => {
        function handler (e){
            if(sidePanelRef.current && sidePanelState == true && e.target != buttonRef.current){
                if(e.target != sidePanelRef.current){
                    TogglePanel()
                }
            }
        }

        document.addEventListener("click", handler)

        return () => {
            document.removeEventListener('click', handler)
        }
    }, [sidePanelState, TogglePanel])




    // useEffect(() =>{
    //     console.log("Current sidePanelState: ", sidePanelState);
    // }, [sidePanelState])


    return(
        <>
        <button ref={buttonRef} id="sidePannelButton" onClick={TogglePanel}
            class="fixed left-5 rounded-md bg-white/10 px-2.5 py-1.5 hover:bg-white/20">
                Testing Side
        </button>


        <div id="sidePanel" ref={sidePanelRef} className="sidePanel">
            <p>testing side pannel two</p>
            <ol>
                <li>ONE</li>
                <li>TWO</li>
                <li>THREE</li>
            </ol>
        </div>     
        </>
    );
}

export default SidePannel