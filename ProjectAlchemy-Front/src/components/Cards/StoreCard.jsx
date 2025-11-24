import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../../context";

function StoreCard({name, welcome, id}){
    const navigate = useNavigate()
    const {fetchStoreLayout} = useStoreContext();

    const storeSelected = async () =>{
        console.log(`you clicked on ${id}, ${name}`)
        //Get store id and navigate to it
        await fetchStoreLayout(id)

        navigate(`/${id}/Preview`, {state: {storeId: id}})
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