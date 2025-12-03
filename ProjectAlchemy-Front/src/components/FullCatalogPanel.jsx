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

        // console.log("updateItemSubmit: ",e.target)
        // console.log(e.target.itemName.value)

        const itemOverides = {
            storeId: currentStoreId? currentStoreId : 0,
            itemId: modalItem.id,
            overrides:{
                name: modalItem.name == e.target.itemName.value? null: e.target.itemName.value, //To prevent uneeded overrides?
                cost: e.target.itemCost.value,
                rarity: e.target.itemRarity.value,
                description: e.target.itemDescription.value
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

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            color: 'black',
            maxWidth: '50%',
            width:'50%',
            maxHeighth: '50%',
            height: '50%'
        },
    };

    return(
        <>
            <div>
            <Modal
                id="Modal"
                currentLabel="ItemCustomizationModal"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <h1>Item Customization</h1>
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
                        Description: <input id="itemDescription" type="text" defaultValue={"description"}/>
                    </label>
                    <button>Submit</button>
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
