function StoreCard({name, welcome, id}){

    function storeSelected(){
        console.log(`you clicked on ${id}, ${name}`)
    }

    return(
        <div onClick={storeSelected} className="card">
            <img className="card-img" src="https://placehold.co/150" alt="item img"></img>
            <h2 className="card-title">{name}</h2>
            <div className="flex gap-1 justify-center">
                {/* <p>{props.cost}</p>
                <p>|</p>
                <p>{props.type}</p>
                <p>|</p>
                <p>{props.rarity}</p> */}
            </div>
            <p className="card-text">{welcome ? welcome : 'Come on down and spend your gold here!'}</p>
        </div>
    );
}
export default StoreCard