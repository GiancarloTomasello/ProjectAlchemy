import { useStoreContext } from "../context";

function FeaturedItem(props){
    const {itemCatalog, stockedItemList} = useStoreContext();

    function updateFeaturedItem(e){
        e.preventDefault();
        console.log('featuredItem')
        //take item id and update element details?
        const test = e.target[0].value
        console.log(test)
    }

    return(
        <>
        <div className="flex justify-between m-5 p-5 gap-3
         ">
            <div className="flex-1">
            <img src="https://placehold.co/400x400"></img>
            </div>
            <div className="flex-1">
                <h1>{props.name ? props.name : 'title'}</h1>
                <h2>{props.tagLine ? props.tagLine : 'Our specialty!'}</h2>
                <p>{props.description ? props.description : 'description'}</p>
                <h3>{props.cost ? props.cost : 'cost'}</h3>
                <h3>{props.type ? props.type : 'type'}</h3>
                <h3>{props.rarity ? props.rarity : 'rarity'}</h3>
            </div>
            <div className="flex-column flex-1">
                <h1>Featured item Details</h1>
                <form id='FeaturedItemForm' onSubmit={updateFeaturedItem}>
                    <div>                        
                        <label>Item Selection: </label>
                        <select name="stockSelection" id="stock_selection">
                            {stockedItemList.map(item => console.log(item))}
                        {itemCatalog.filter(item => stockedItemList.includes(item.id))
                        .map(item => <option value={item}>{item.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label>Tagline: </label>
                        <input type='text' name='tagLineInput'></input>
                    </div>
                    <div>
                        <button type='submit'>Update Form</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default FeaturedItem;