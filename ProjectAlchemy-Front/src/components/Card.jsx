function Card({item}){
    return(
        <div className="card">
            <img className="card-img" src="https://placehold.co/150" alt="item img"></img>
            <h2 className="card-title">{item.name}</h2>
            <div className="flex gap-1 justify-center">
                <p>{item.cost}</p>
                <p>|</p>
                <p>{item.type}</p>
                <p>|</p>
                <p>{item.rarity}</p>
            </div>
            <p className="card-text">Item description goes here</p>
        </div>
    );
}
export default Card