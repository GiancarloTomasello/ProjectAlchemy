import { useCallback, useEffect, useState } from "react"
import { useStoreContext } from "../context"
import CampaignCard from "../components/Cards/CampaignCard";
import Modal from 'react-modal';


function CampaignCreationPage(){
    const [campaignList, setCampaignList] = useState([
        {name:"test"}
    ])
    const {fetchCampaignList, createNewCampaign} = useStoreContext();
    const [modalIsOpen, SetModalIsOpen] = useState(false);

    const updateCampaingList = useCallback(async() =>{
        const campaignsFound = await fetchCampaignList(1);
        console.log("campaigns:",campaignsFound)
        setCampaignList(campaignsFound)
    }, [fetchCampaignList])
    
    

    useEffect(() =>{
        updateCampaingList(1);
    }, [updateCampaingList])

    const createCampaign = async (e) =>{
        e.preventDefault();
        console.log('target', e.target);

        const formData = new FormData(e.target)
        console.log(formData.values())
        const campaignDetail = {
            campaignName: formData.get('campaigname'),
            campaignDesc: formData.get('campaigndesc')
        }
        console.log(campaignDetail)

        //create new capmaign
        await createNewCampaign(campaignDetail)

        updateCampaingList();

        closeModal();
    }

    function openModal(){
        SetModalIsOpen(true);
    }

    function closeModal(){
        SetModalIsOpen(false);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            color: 'black',
            maxWidth: '50%',
            width:'50%',
            maxHeighth: '50%',
            height: '50%'
        },
    };
 
    return(
        <>
            <h1>Campaign Creation Page</h1>
            <button onClick={openModal}>Create New Campaign</button>
            <Modal
                id="Modal"
                currentLable="CreateCampaignPopup"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <h1>Campaign Creation</h1>
                <form id="newCampaignForm" className="newShopModal" onSubmit={createCampaign}>
                    <div>
                        <label>Campaign Name</label>
                        <input id="campaignName" type="text" name="campaigname" required/>
                    </div>
                    <div>
                        <label>Campaign Description</label>
                        <input id="campaignDesc" type="text" name="campaigndesc"/>
                    </div>
                    <button>Create</button>
                </form>
            </Modal>
            <ul>
                {campaignList && campaignList.length > 0 && campaignList.map((campagin,index) =>
                    <CampaignCard
                        key={index}
                        name={campagin.campaign_name}
                        desc={campagin.campaign_desc}
                    />
                )}
            </ul>
        </>
    )
}

export default CampaignCreationPage