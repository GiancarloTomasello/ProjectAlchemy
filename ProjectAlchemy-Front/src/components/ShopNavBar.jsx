import ShoppingCartPanel from "./ShoppingCartPanel";

function ShopNavBar(){
    return(
        <>
        <div className="navPanel">
            {/* <button className="shoppingCart" onClick={() => {console.log("clicked")}}>
                <img src="https://placehold.co/50" alt="shopingCart img"></img>
            </button> */}
        </div>
        <ShoppingCartPanel/>

        </>
    );
}

export default ShopNavBar