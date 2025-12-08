import React, { createContext, useEffect, useContext, useState, use } from 'react';
import axios from 'axios';
import Card from './components/Card';
import {Banner, BannerSetUp} from './components/Banner';
import ShopCard from './components/ShopCard';
import FullCatalogPanel, {FullCatalogSetUp} from './components/FullCatalogPanel';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    //Late we will fetch these from the database
    const [itemCatalog, setItemCatalog] = useState([]);
    const [isLoadingCatalog, setIsLoadingCatalog] = useState(true)
    const [catalogError, setCatalogError] = useState(null);
    
    const [stockedItemInfo, setStockedItemInfo] = useState([]);
    const [stockedItemList, setStockedItemList] = useState([]);

    const [storeLayout, setStoreLayout] = useState([]);
    const [storeDetails, setStoreDetails] = useState({});

    const [shopDisplayPage, setShopDisplayPage] = useState('preview');
    const [shoppingCart, setShoppingCart] = useState([]);

    const [currentStoreId, setCurrentStoreId] = useState(1);
    const [storeOrders, setStoreOrders] = useState([]);

    const [campaignList, setCampaignList] = useState([]);

    const componentMap ={
    'Banner': {
        component: Banner,
        setUp: BannerSetUp
    },
    'FullCatalog': {
        component: FullCatalogPanel,
        setUp: FullCatalogSetUp
    } 
    };

    const sentimentMap = {
        'Distrusting +10%': 10,
        'Neutral +0%': 0,
        'Trusting -10%': -10
    }

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
            
            const storeStock = response.data.map(item =>{
                return {...item, 'inStock':true}
            })
            setStockedItemInfo(storeStock)
        }catch(err){
            console.log(err);
        }
    }

    
    fetchCatalog()
    fetchStockedItems()
    //fetchStoreLayout()
}, []);

    useEffect(()=>{
        fetchStoreLayout(currentStoreId)
    }, [currentStoreId]) 

    const fetchStoreLayout = async(storeId) =>{
        //const storeId = 1;
        console.log("GET STORE LAYOUT ", storeId)
        try{
            const response = await axios.get(`http://localhost:3001/getStoreLayout/${storeId}`)
            setStoreLayout(response.data)
        }catch(err){
            console.log(err);
        }
    }

    const fetchCampaignList = async(userId) =>{
        console.log("Get users campaigns")
        try{
            const response = await axios.get(`http://localhost:3001/getCampaigns/${userId}`)
            return response.data
        }catch(err){
            console.log(err);
        }
    }

    const updateStoreCatalog = async(newCatalog) =>{
        try{
            console.log(newCatalog);
            const storeId = '1';
            await axios.put(`http://localhost:3001/saveStoreCatalog/${storeId}`, newCatalog)
            
        }catch(err){
            console.log(err);
        }
    }

  const updateStoreLayout = async(storeId) => {
    try{
        console.log(storeLayout)
        const storeId = '1'
        await axios.put(`http://localhost:3001/saveStoreLayout/${storeId}`, storeLayout)
    }catch(err){
        console.log(err)
    }
  }

  const createNewStorefront = async(storedetail) => {
    try{
        const userId = 'test'
        storedetail.userId = userId
        await axios.put('http://localhost:3001/createShop', storedetail)
    }catch(err){
        console.log(err)
    }
  }

  const updateStoreDetails = async(storeDetails) =>{
    try{
        await axios.put('http://localhost:3001/updateShop', storeDetails)
    }catch(err){
        console.log(err)
    }
  }

  const addStoreComponent = async(newComponent) =>{
    const newStoreLayout = [...storeLayout, newComponent]
    const body = {
        shopId: currentStoreId,
        storeLayout: newStoreLayout
    }
    try{
        await axios.put('http://localhost:3001/addLayoutElement', body)
        setStoreLayout(newStoreLayout)
    }catch(err){
        console.log(err)
    }
  }

    const createNewCampaign = async(campaigndetail) => {
    try{
        //HARD CODED USER ID
        const userId = 1
        campaigndetail.userId = 1
        await axios.put('http://localhost:3001/createCampaign', campaigndetail)
    }catch(err){
        console.log(err)
    }
  }

  const updateItemOverride = async(itemOverides) => {
    try{
        await axios.put(`http://localhost:3001/updateItemValuesByName`, itemOverides)
    }catch(err){
        console.log(err)
    }
  }

  const makePurchase = async(purchasedItems) =>{
    try{
        await axios.put(`http://localhost:3001/makePurchase/${currentStoreId}`, purchasedItems)
    }catch(err){
        console.log(err)
    }
  }

  const getStoreOrders = async() =>{
    try{
        const result = await axios.get(`http://localhost:3001/getOrders/${currentStoreId}`)
        setStoreOrders(result.data)
        return result.data;
    }catch(err){
        console.log(err)
    }
  }
  
  //causing an infinite loop?!?!
  const getStoreDetails = async() =>{
    try{
        const result = await axios.get(`http://localhost:3001/getStore/${currentStoreId}`)
        //.log("context store details", result.data)
        //setStoreDetails(result.data)
        return result.data
    }catch(err){
        console.log(err)
    }
  }

  useEffect(()=>{
    setStockedItemList(stockedItemInfo.map((item) => {
                    //console.log("checking index:", item)
                    return item}
                ))
  }, [stockedItemInfo])

    
    const value = {
        itemCatalog, setItemCatalog, isLoadingCatalog, setIsLoadingCatalog,
        catalogError, setCatalogError, stockedItemInfo, setStockedItemInfo,
        stockedItemList, setStockedItemList, storeLayout, setStoreLayout,
        updateStoreCatalog, shopDisplayPage, setShopDisplayPage, updateStoreLayout,
        componentMap, shoppingCart, setShoppingCart, createNewStorefront, createNewCampaign,
        fetchStoreLayout, fetchCampaignList, currentStoreId, setCurrentStoreId, updateItemOverride,
        storeOrders, getStoreOrders, makePurchase, getStoreDetails, storeDetails, setCampaignList,
        updateStoreDetails, sentimentMap, addStoreComponent
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