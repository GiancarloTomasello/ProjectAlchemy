import {useCallback, useEffect, useState } from "react";
import { useStoreContext } from "../context";
import { useLocation, useParams } from 'react-router-dom';
import Card from "./Card";
import ShopCard from "./ShopCard";
import Modal from 'react-modal';


function FullCatalogPanel(){
    const {itemCatalog, stockedItemList, setStockedItemList, currentStoreId, updateItemOverride} = useStoreContext();
    const [storeCatalog, setStoreCatalog] = useState([]);

    const [modalIsOpen, SetModalIsOpen] = useState(false);
    const [modalItem, setModalItem] = useState({})

  function openModal(item){
    SetModalIsOpen(true);
    setModalItem(item)
  }

  function closeModal(){
    SetModalIsOpen(false)
  }

    const isPlayerPath = useLocation().pathname.includes("player");

    function AddToCart(){
        console.log('Add to cart')
    }

 

    useEffect(() => {

        const getOverridefromStock = (index) =>{
            const found = stockedItemList.find(stockItem => stockItem.api_index == index)
            return found.overrides
        }

        const catalogDisplay = itemCatalog.filter(
            item => stockedItemList.some(
            (stockitem) => stockitem.api_index === item.id
             && stockitem.inStock)).map(
                (item) =>{
                    if(isPlayerPath){
                        return <li><ShopCard {...item} key={item.id}/></li>
                    }else{
                        const overrides = getOverridefromStock(item.id)
                        return <li><Card {...item} overrides={overrides} interactFunction={openModal} key={item.id}/></li>
                    }
            })

        setStoreCatalog(catalogDisplay)

    }, [setStoreCatalog, itemCatalog, stockedItemList, isPlayerPath])
    
    const updateItemOverrides = async(e) =>{
        e.preventDefault();
        closeModal();

        console.log("updateItemSubmit: ",e.target)
        console.log("description", e.target.description.value)
        console.log("Modal Description", modalItem)

        const itemOverides = {
            storeId: currentStoreId? currentStoreId : 0,
            itemId: modalItem.id,
            overrides:{
                name: modalItem.name == e.target.itemName.value? null: e.target.itemName.value, //To prevent uneeded overrides?
                cost: e.target.itemCost.value,
                rarity: e.target.itemRarity.value,
                description: e.target.description.value
            }
        }
        updateItemOverride(itemOverides)
        //Update overrides
        const newStock = stockedItemList.map((item)=>{
            if(item.api_index == modalItem.id){
                const test = {...item, overrides: itemOverides.overrides}
                return test
            }
            return item
        })
        setStockedItemList(newStock)
    }

    return(
        <>
            <div>
            <Modal
                id="Modal"
                currentLabel="ItemCustomizationModal"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modalContent"
            >
                <h1 className="text-center">Item Customization</h1>
                <form className="newShopModal" onSubmit={updateItemOverrides}>
                    <label>
                        Item Name : <input id="itemName" type="text" defaultValue={modalItem.name}/>
                    </label>
                    <label>
                        Item Cost: <input id="itemCost" type="text" defaultValue={modalItem.cost}/>
                    </label>
                    <label>
                        Item Rarity:
                        <select id="itemRarity">
                            <option value="Common">Common</option>
                            <option value="Uncommon">Uncommon</option>
                            <option value="Rare">Rare</option>
                            <option value="Very Rare">Very Rare</option>
                            <option value="Legendary">Legendary</option>
                            <option value="Artifact">Artifact</option>
                        </select>
                    </label>
                    <label>
                        Description: 
                        <textarea
                            id="itemDescription"
                            name="description"
                            defaultValue={modalItem.description && modalItem.description.length > 0?
                                modalItem.description[0] : "A fun new item for your adventure"
                            }
                            rows={10}
                            cols={100}
                        />
                    </label>
                    <button className="absolute insert-x-0 bottom-10 left-1/4 w-1/2 p-5 justify-center content-center">Submit</button>
                </form>
            </Modal>
                <ul id='StoreCatalog' className="flex">
                    {storeCatalog}
                </ul>
            </div>
        </>
    )
}

export default FullCatalogPanel
