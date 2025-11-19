import React, { useCallback } from 'react'
import {useState, useRef} from 'react'
import ItemCardCart from './ItemCardCart';
import { useStoreContext } from '../context';

function ShoppingCartPanel(){
    const {shoppingCart, setShoppingCart} = useStoreContext();
    
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

    function AddToCart(item){
        const itemInCart = shoppingCart.find(cartItem => cartItem.name === item.name)
        if(itemInCart){
            console.log("item in cart")
        }else{
            console.log('not in cart')
        }
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
            <div className='sidepanel catalog'>
                <ol className=''>
                    {shoppingCart.map(item => <li><ItemCardCart item={item} AddToCart={AddToCart} key={item.id}/></li>)}
                </ol>
            </div>
        </div>     
        </>
    );
}

export default ShoppingCartPanel