function Card({name, cost, type, rarity}){
    return(
        <div className="card">
            <img className="card-img" src="https://placehold.co/150" alt="item img"></img>
            <h2 className="card-title">{name}</h2>
            <div className="flex gap-1 justify-center">
                <p>{cost}</p>
                <p>|</p>
                <p>{type}</p>
                <p>|</p>
                <p>{rarity}</p>
            </div>
            <p className="card-text">Item description goes here</p>
        </div>
    );
}
export default Card