import { useStoreContext } from "../context"

function ShopCard(props){
    const {shoppingCart, setShoppingCart} = useStoreContext();

    function AddToCart(){
        const inCart = shoppingCart.find(cartItem => cartItem.name === props.name)
        if(inCart){
            console.log(`${props.name} already in cart`)
        }else{
            const newCart = [...shoppingCart, props]
            setShoppingCart(newCart)
            console.log("new shopping cart:", shoppingCart)
        }
    }

    return(
        <div className="card">
            <img className="card-img" src="https://placehold.co/150" alt="item img"></img>
            <h2 className="card-title">{props.name}</h2>
            <div className="flex gap-1 justify-center">
                <p>{props.cost}</p>
                <p>|</p>
                <p>{props.type}</p>
                <p>|</p>
                <p>{props.rarity}</p>
            </div>
            <button onClick={AddToCart}>Add To Cart</button>
        </div>
    )
}
export default ShopCard