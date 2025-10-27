function Card({item}){
    return(
        <div className="card">
            <img className="card-img" src="https://placehold.co/150" alt="item img"></img>
            <h2 className="card-title">{item.name}</h2>
            <p className="card-text">Item description goes here</p>
        </div>
    );
}
export default Card