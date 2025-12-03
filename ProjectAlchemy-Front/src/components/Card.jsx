function Card(props){

    const cardSelected = () => {
        console.log(props)
        console.log(`you have selected ${props.id} ${props.name}`)
        if(props.interactFunction){
            props.interactFunction(props)
        }
    }
    
    return(
        <div onClick={cardSelected} className="card">
            <img className="card-img" src="https://placehold.co/150" alt="item img"></img>
            <h2 className="card-title">
                {props.overrides && props.overrides.name? props.overrides.name:props.name}
            </h2>
            <div className="flex gap-1 justify-center">
                <p>
                    {props.overrides && props.overrides.cost?props.overrides.cost:props.cost}
                </p>
                <p>|</p>
                <p>
                    {props.overrides && props.overrides.type?props.overrides.type:props.type}
                </p>
                <p>|</p>
                <p>
                    {props.overrides && props.overrides.rarity?props.overrides.rarity:props.rarity}
                </p>
            </div>
            <p className="card-text">Item description goes here</p>
        </div>
    );
}
export default Card