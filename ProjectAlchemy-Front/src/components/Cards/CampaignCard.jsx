import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../../context";

function CampaignCard({name, desc, id}){
    const navigate = useNavigate()
    const {fetchStoreLayout} = useStoreContext();

    const campaignSelected = async () =>{
        console.log(`you clicked on campaign ${id}, ${name}`)
        //Get store id and navigate to it
        //await fetchStoreLayout(id)

       navigate(`/storeList/${id}`)
    }

    return(
        <div onClick={campaignSelected} className="card">
            <img className="card-img" src="https://placehold.co/150" alt="item img"></img>
            <h2 className="card-title">{name}</h2>
            <p className="card-text">{desc ? desc : 'A fun adventure in a fantasy land awaits you!'}</p>
        </div>
    );
}
export default CampaignCard