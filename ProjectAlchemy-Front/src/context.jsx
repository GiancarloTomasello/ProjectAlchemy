import React, { createContext, useContext, useState } from 'react';
import { dummyItems } from './assets/assets';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    //Late we will fetch these from the database
    const [stockedItems, setStockedItems] = useState(dummyItems);

    
    const value = {
        stockedItems, setStockedItems
    }
    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
}

export const useStoreContext = () => {
    return useContext(StoreContext);
}