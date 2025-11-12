import React, { createContext, useEffect, useContext, useState } from 'react';
import axios from 'axios';


export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    //Late we will fetch these from the database
    const [itemCatalog, setItemCatalog] = useState([]);
    const [isLoadingCatalog, setIsLoadingCatalog] = useState(true)
    const [catalogError, setCatalogError] = useState(null);
    
    const [stockedItemInfo, setStockedItemInfo] = useState([]);
    const [stockedItemList, setStockedItemList] = useState([]);

    const [storeLayout, setStoreLayout] = useState([]);

    const [shopDisplayPage, setShopDisplayPage] = useState('preview');

    useEffect(() => {
    //Make GET request to fetch all D&D items
    axios
    const fetchCatalog = async () =>{
        try{
            const response = await axios.get('http://localhost:3001/getItems')
            setItemCatalog(response.data)
            setIsLoadingCatalog(false)
        }catch(err){
            setCatalogError(err.message);
            console.error(err.message);
            setIsLoadingCatalog(false);
        }
    }

    const fetchStockedItems = async() =>{
        try{
            const response = await axios.get('http://localhost:3001/getStock/1')
            console.log("Response "+response.data)
            setStockedItemInfo(response.data)
        }catch(err){
            console.log(err);
        }
    }

    const fetchStoreLayout = async() =>{
        try{
            const response = await axios.get('http://localhost:3001/getStoreLayout/1')
            setStoreLayout(response.data)
        }catch(err){
            console.log(err);
        }
    }

    fetchCatalog()
    fetchStockedItems()
    fetchStoreLayout()
  }, []);

  const updateStoreCatalog = async(newCatalog) =>{
    try{
        const storeId = '1';
        await axios.put(`http://localhost:3001/saveStoreCatalog/${storeId}`, newCatalog)
        
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    setStockedItemList(stockedItemInfo.map((item) => {
                    console.log("checking index:", item)
                    return item.api_index}
                ))
  }, [stockedItemInfo])

    
    const value = {
        itemCatalog, setItemCatalog, isLoadingCatalog, setIsLoadingCatalog,
        catalogError, setCatalogError, stockedItemInfo, setStockedItemInfo,
        stockedItemList, setStockedItemList, storeLayout, updateStoreCatalog,
        shopDisplayPage, setShopDisplayPage
    }
    return (
        <StoreContext.Provider value={value}>
            {isLoadingCatalog ? <h1>Loading...</h1> : children}
        </StoreContext.Provider>
    );
}

export const useStoreContext = () => {
    return useContext(StoreContext);
}