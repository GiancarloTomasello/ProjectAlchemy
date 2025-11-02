import React, { createContext, useEffect, useContext, useState } from 'react';
import { dummyItems } from './assets/assets';
import axios from 'axios';


export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    //Late we will fetch these from the database
    const [itemCatalog, setItemCatalog] = useState([]);
    const [isLoadingCatalog, setIsLoadingCatalog] = useState(true)
    const [catalogError, setCatalogError] = useState(null);
    
    const [stockedItemInfo, setStockedItemInfo] = useState([]);
    const [stockedItemList, setStockedItemList] = useState([]);

    // const fetchCatalog = async () =>{
    //     try{
    //         const response = await axios.get('http://localhost:3001/getItems')
    //         setItemCatalog(response.data)
    //         setIsLoadingCatalog(false)
    //     }catch(err){
    //         setCatalogError(err.message);
    //         console.error(err.message);
    //         setIsLoadingCatalog(false);
    //     }
    // }

    // async function fetchStockedItems(){
    //     try{
    //         const response = await axios.get('http://localhost:3001/getStock/1')
    //         console.log("Response"+response)
    //         setStockedItemInfo(response.data)
    //         setStockedItemList(stockedItemInfo.map((item) => item.id))
    //         console.log("StockedItemList: ", stockedItemList)
    //     }catch(err){
    //         console.log(err);
    //     }
    // }

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

    fetchCatalog()
    fetchStockedItems()
  }, []);

  useEffect(()=>{
    setStockedItemList(stockedItemInfo.map((item) => {
                    console.log("checking index:", item)
                    return item.api_index}
                ))
  }, [stockedItemInfo])


//   useEffect(() => {
//     //Make GET request to fetch all D&D items
//     axios
//       .get('http://localhost:3001/getStock/1')
//       .then((response) => {
//         console.log("Response"+response)
//         setStockedItemInfo(response.data)
//         setStockedItemList(stockedItemInfo.map((item) => item.id))
//         console.log("StockedItemList: ", stockedItemList)
//         //setStoreStockLoading(false)
//       })
//       .catch((err) => {
//         console.log(err.message);
//         //setError(err.message);
//         //setStoreStockLoading(false);
//       })
//   }, []);

    
    const value = {
        itemCatalog, setItemCatalog, isLoadingCatalog, setIsLoadingCatalog,
        catalogError, setCatalogError, stockedItemInfo, setStockedItemInfo,
        stockedItemList, setStockedItemList
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