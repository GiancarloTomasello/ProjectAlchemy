import { useStoreContext } from "../context"

function ItemCardCart({item}){
    const {shoppingCart, setShoppingCart} = useStoreContext();

    function removeFromCart(){
        console.log("REMOVE FROM CART")
        const newCart = shoppingCart.filter(cartItem => cartItem.name != item.name)
        setShoppingCart(newCart)
        console.log("POST REMOVE SHOPCART", shoppingCart)
    }

    return(
        <div className="cardSimple">
            <div className="flex">
                <div className="flex-1/3">
                    <img className="card-img" src="https://placehold.co/100" alt="item img"></img>
                </div>
                <div className="flex-2/3">
                    <div className="flex justify-center gap-2">
                        <h2>{item.name}</h2>
                        <h3>|</h3>
                        <h3>{item.cost}</h3>
                    </div>
                    <div className="flex justify-center gap-2">
                        <h3>{item.type}</h3>
                        <h3>|</h3>
                        <h3>{item.rarity}</h3>
                    </div>
                    <p>{item.description}</p>
                    <div className='p-5'>
                        <button onClick={removeFromCart}>Remove from Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemCardCart