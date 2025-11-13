import { useStoreContext } from '../context'

function ItemCardSimple({item}){
    const {stockedItemList, setStockedItemList} = useStoreContext();


    function ToggleInStock(item){

        if(stockedItemList.includes(item.id)){
            const newList = stockedItemList.filter(aItem => aItem != item.id);
            setStockedItemList(newList);
        }else{
            console.log(stockedItemList);
            setStockedItemList([...stockedItemList, item.id])
        }

    }


    return(
        <div className="cardSimple">
            {/* v1 */}
            <div className="flex">
                <div className="flex-1/3">
                    <img className="card-img" src="https://placehold.co/150" alt="item img"></img>
                    <label htmlFor="itemInStock">Stock Item?</label>
                    <input type="checkbox" id="itemInStock" defaultChecked={stockedItemList.includes(item.id)} onChange={() => ToggleInStock(item)}/>
                    {/* <input type="checkbox" id="itemInStock" onChange={() => ToggleInStock(item)}/> */}
                </div>
                <div className="flex-2/3">
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    <div className="flex justify-center gap-2">
                        <h3>{item.type}</h3>
                        <h3>{item.rarity}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemCardSimple