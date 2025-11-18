import {useEffect, useState } from "react";
import { useStoreContext } from "../context";
import { useLocation } from 'react-router-dom';
import Card from "./Card";
import ShopCard from "./ShopCard";

function FullCatalogPanel(){
    const {itemCatalog, stockedItemInfo, stockedItemList} = useStoreContext();
    const [storeCatalog, setStoreCatalog] = useState([]);
    const storeId = 1;

    const isPlayerPath = useLocation().pathname.includes("player");

    console.log('playerChecking store:', itemCatalog[0])

    useEffect(() => {

        const catalogDisplay = itemCatalog.filter(
            item => stockedItemList.some(
            (stockitem) => stockitem.api_index === item.id
             && stockitem.inStock)).map(
                (item) =>{
                    if(isPlayerPath){
                        return <li><ShopCard {...item} key={item.id}/></li>
                    }else{
                        return <li><Card {...item} key={item.id}/></li>
                    }
            })
        console.log('Catralog Display', catalogDisplay)
        setStoreCatalog(catalogDisplay)

    }, [setStoreCatalog, itemCatalog, stockedItemList])
    
    return(
        <>
        <div >
            <ul id='StoreCatalog' className="flex">
                {storeCatalog}
            </ul>
        </div>
        </>
    )
}

export default FullCatalogPanel
