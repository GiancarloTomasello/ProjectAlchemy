import { useStoreContext } from '../context'

function ItemCardSimple({item}){
    const {stockedItemList, setStockedItemList} = useStoreContext();


    function ToggleInStock(item){
        console.log("item selected: ", item)
        const stockedItem = stockedItemList.find((stockItem) => stockItem.api_index === item.id)

        if(stockedItem){
            const newList = stockedItemList.map(stockItem => {
                if(stockItem.api_index===item.id && stockItem.inStock){
                    stockItem.inStock = false
                }else if (stockItem.api_index===item.id && !stockItem.inStock){
                    stockItem.inStock = true
                }
                return stockItem
            });
            setStockedItemList(newList);
        }else{
            console.log(stockedItemList);
            const newObject = {
                "api_index" : "",
                "store-id": 1,
                "overrides": {}
            }
            setStockedItemList([...stockedItemList, newObject])
        }

    }


    return(
        <div className="cardSimple">
            {/* v1 */}
            <div className="flex">
                <div className="flex-1/3">
                    <img className="card-img" src="https://placehold.co/150" alt="item img"></img>
                    <label htmlFor="itemInStock">Stock Item?</label>
                    <input type="checkbox" id="itemInStock" defaultChecked={stockedItemList.some((stockItem) => stockItem.api_index === item.id)} 
                    onChange={() => ToggleInStock(item)}/>
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