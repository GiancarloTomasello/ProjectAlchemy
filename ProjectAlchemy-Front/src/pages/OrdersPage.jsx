import { useEffect, useState } from 'react';
import EditNavBar from '../components/EditNavBar.jsx'
import { useStoreContext } from '../context.jsx'
import ComponentDisplayCard from '../components/ComponentDisplayCard.jsx';

function OrderList(){
      const {storeOrders} = useStoreContext();
      const [orderList, setOrderList]= useState([]);

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
        setOrderList(tableList)
    }, [storeOrders])

    return(
        <>
            <h1 className='text-center'>Orders Created for this store</h1>
            <div>
                {orderList && orderList.length > 0? 
                    <table>
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
                :
                    <h1>Currently No Orders</h1>
                }
            </div>
        </>
    )
}

export default OrderList;