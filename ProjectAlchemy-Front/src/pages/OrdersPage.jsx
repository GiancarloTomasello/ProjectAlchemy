import { use, useCallback, useEffect, useState } from 'react';
import EditNavBar from '../components/EditNavBar.jsx'
import { useStoreContext } from '../context.jsx'
import ComponentDisplayCard from '../components/ComponentDisplayCard.jsx';

function OrderList(){
      const {storeOrders, getStoreOrders} = useStoreContext();
      const [orderList, setOrderList]= useState([]);

    //   const updateOrders = useCallback(async() =>{
    //       const order = await getStoreOrders()
    //       console.log("orders", order);
    //   }, [getStoreOrders])

    // useEffect(()=>{
    //     updateOrders()
    //     //console.log(getStoreOrders)
    //     //updateOrders()
    // }, [updateOrders])


    useEffect(()=>{
        if(!storeOrders){
            return;
        }
        
        const tableList = storeOrders.map(orders =>{
            return <tr>
                    <th scope='col'>{orders.date_purchased}</th>
                    <th scope='col'>Test User</th>
                    <th scope='col'>{orders.item_list.map(item => item.name).toString()}</th>
                </tr>
        })
        console.log("storeOrder", storeOrders)
        console.log("tableList", tableList)
        setOrderList(tableList)
    }, [storeOrders])

      

    return(
        <>
            <h1 className='text-center'>Orders Created for this store</h1>
            <div>
                <h1>TEsting</h1>
                <h1>{orderList && orderList.length > 0? orderList[0].date_purchased:"blank"}</h1>
                <table>
                    <caption>Purchases</caption>
                    <thead>
                        <tr>
                            <th scope='col'>date purchased</th>
                            <th scope='col'>User</th>
                            <th scope='col'>Items</th>
                        </tr>
                    </thead>
                    <tbody>
                      {orderList} 
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default OrderList;