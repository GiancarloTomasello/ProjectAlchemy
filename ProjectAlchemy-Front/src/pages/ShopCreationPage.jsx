import { useCallback, useEffect, useState } from "react"
import StoreCard from "../components/Cards/StoreCard"
import axios from 'axios';
import Modal from 'react-modal';
import ReactModal from "react-modal";
import { useStoreContext } from "../context";


function ShopCreationPage(){
    const [currentShops, setCurrentShops] = useState([
        {name: 'store 1', description: 'your first store'},
        {name: 'store 2', description: 'your second store'}
    ])
    const [modalIsOpen, SetModalIsOpen] = useState(false);
    const [newShopForm, setNewShopForm] = useState(null);
    const [campaignList, setCampaignList] = useState([])

    const {createNewStorefront, fetchCampaignList} = useStoreContext();


    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            color: 'black',
        },
    };

    const createShop = async (e) =>{
        e.preventDefault();

        console.log(e.target.campaignselector.value)

        const storeDetail = {
            shopname: e.target.shopname.value,
            welcomeMessage: e.target.welcomeMessage.value,
            campaignId: e.target.campaignselector.value,
            isPublic: (e.target.isPublic.value=='on'? true : false),
            storeLayout: [
                {
                    "name": "Banner",
                    "props": {
                    "name": e.target.shopname.value,
                    "img": null
                    }
                },
                {
                    "name": "FullCatalog",
                    "props": {}
                }
            ]
        }

        // console.log("ispublic", storeDetail)
        await createNewStorefront(storeDetail)

        await getStoreList()
        closeModal()
    }

    //When the page load attempt to retreive the full list of shops from backend

    const getStoreList = async () => {
        try{
            //HARD CODE USER ID
            const userId = 1
            const response = await axios.get(`http://localhost:3001/getStoresByUser/${userId}`)
            console.log("StoreList Response:",response)
            setCurrentShops(response.data)
        }catch(err){
            console.error(err.message)
        }
    }

    const updateCampaignList = useCallback(async() =>{
        const campaignList = await fetchCampaignList(1)
        setCampaignList(campaignList);
    }, [fetchCampaignList])
    
    useEffect(()=>{

        getStoreList()
        updateCampaignList()
    }, [updateCampaignList])
    

    function openModal(){
        SetModalIsOpen(true);
    }

    function closeModal(){
        SetModalIsOpen(false);
    }

 return(
    <> 
        <ReactModal id="test"/>
        <div>
            <h1 id="title">Shop Creation Page</h1>
            <button onClick={openModal}>Create New Shop</button>
            <button onClick={getStoreList}>Refresh Shops</button>
            <Modal
              id="modal"
              contentLabel="NewPagePopup"
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
            >
                <h1>Create a New Shop</h1>
                <form id="newShopForm" className="newShopModal" onSubmit={createShop}>
                    <div>
                        <label>Shop name</label>
                        <input id="shopName" type="text" name="shopname" required></input>
                    </div>
                    <div>
                        <label>Welcome Message</label>
                        <input id="welcomeMessage" type="text" name="welcomeMessage" required></input>
                    </div>
                    <div>
                        <label>Campaign Tag</label>
                        <select id='campaignSelector' name='campaignselector'>
                            {campaignList.map(campaign => <option value={campaign.id}>{campaign.campaign_name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label>Is shop public</label>
                        <input id="isPublic" type="checkbox" name="isPublic"></input>
                    </div>
                    <button>Create</button>
                </form>
            </Modal>
            <ul>
                {currentShops.map((store, index) => 
                    <StoreCard 
                        key={index}
                        name={store.store_name} 
                        welcome={store.welcome_message}
                        id = {store.id}
                    />)
                }
            </ul>
        </div>
    </>
 )   
}

export default ShopCreationPage