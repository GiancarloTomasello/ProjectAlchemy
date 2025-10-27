import { useStoreContext } from '../context'

function ItemCardSimple({item}){
    const {stockedItems, setStockedItems} = useStoreContext();


    // function clickHandler(e){
    //     e.preventDefault()
    // }

    // document.addEventListener("click", clickHandler)

    // const ToggleInStock((inStock)=>{
    //     inStock = !inStock
    // })
    function ToggleInStock(item){
        console.log(item)
        let structuredData = structuredClone(stockedItems);
        let indexToUpdate = stockedItems.findIndex(obj => obj.id === item.id);
        if(indexToUpdate !== -1)
            structuredData[indexToUpdate].inStock = !item.inStock
        //console.log(item.inStock)
        setStockedItems(structuredData)
        console.log(stockedItems)
        //item.inStock = false;
    }


    return(
        <div className="cardSimple">
            {/* v1 */}
            <div className="flex">
                <div className="flex-1/3">
                    <img className="card-img" src="https://placehold.co/150" alt="item img"></img>
                    <label htmlFor="itemInStock">Stock Item?</label>
                    <input type="checkbox" id="itemInStock" defaultChecked={item.inStock} onChange={() => ToggleInStock(item)}/>
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