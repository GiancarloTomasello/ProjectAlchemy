import { useEffect, useState } from "react"
import StoreCard from "../components/Cards/StoreCard"
import axios from 'axios';
import Modal from 'react-modal';
import ReactModal from "react-modal";
import { useStoreContext } from "../context";
import { useLocation, useParams } from "react-router-dom";
import toast, {Toaster} from 'react-hot-toast'


function ShopCreationPage(){
    const [currentShops, setCurrentShops] = useState([
        {name: 'store 1', description: 'your first store'},
        {name: 'store 2', description: 'your second store'}
    ])
    const [modalIsOpen, SetModalIsOpen] = useState(false);
    const [newShopForm, setNewShopForm] = useState(null);

    const {createNewStorefront} = useStoreContext();

    const {campaignid} = useParams();

    const isOwnerPath = !useLocation().pathname.includes('player');

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


        const formData = new FormData(e.target)
        const storeDetail = {
            shopname: formData.get('shopname'),
            welcomeMessage: formData.get('welcomeMessage'),
            campaignId: formData.get('campaignId'),
            isPublic: (formData.get('isPublic')=='on'? true : false),
            storeLayout: [
                {
                    "name": "Banner",
                    "props": {
                    "name": formData.get('shopname'),
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
            console.log("campaignId", campaignid)
            if(campaignid){
                const filteredList = response.data.filter(shops => shops.campaign_id == campaignid)
                setCurrentShops(filteredList)
            }else{
                setCurrentShops(response.data)
            }
        }catch(err){
            console.error(err.message)
        }
    }

    useEffect(()=>{

        getStoreList()
    }, [])

    function openModal(){
        SetModalIsOpen(true);
    }

    function closeModal(){
        SetModalIsOpen(false);
    }

    function createCampaignLink(){
        console.log("CreateLink")
        const shareLink = `http://localhost:5173/player/storeList/${campaignid}`
        toast(shareLink)
    }

 return(
    <> 
        <ReactModal id="test"/>
        <div>
            {isOwnerPath ?
                <div>
                    <h1 id="title">Shop List Page</h1>
                    <button onClick={openModal}>Create New Shop</button>
                    <button onClick={createCampaignLink}>Create Player Link</button>
                </div>
                :
                <div>
                    <h1>Test Campaign Shops</h1>
                </div>
            }
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
        <Toaster/>
    </>
 )   
}

export default ShopCreationPage