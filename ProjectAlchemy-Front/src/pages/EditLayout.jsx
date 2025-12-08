import { useCallback, useEffect, useState } from 'react';
import EditNavBar from '../components/EditNavBar.jsx'
import { useStoreContext } from '../context.jsx'
import ComponentDisplayCard from '../components/ComponentDisplayCard.jsx';
import toast from 'react-hot-toast';
import axios from 'axios';

function EditLayout(){
      const {storeLayout, updateStoreLayout, currentStoreId, fetchCampaignList,
                updateStoreDetails, sentimentMap} = useStoreContext();
      const [componentList, setComponentList ]= useState([]);
      const [shopDetails, setShopDetails] = useState([]);

      const [campaignList, setCampaignList] = useState([]);




        const updateShopDetails = useCallback(async ()=>{
            try{
                const result = await axios.get(`http://localhost:3001/getStore/${currentStoreId}`)
                setShopDetails(result.data[0])
            }catch(err){
                console.log(err)
            }
        }, [currentStoreId])

      useEffect(()=>{
        const newList = storeLayout.map((component, index)=> {
            return <li key={index} className='flex flex-row'>
                <ComponentDisplayCard component={component} index={index}/>
            </li>
        })

        setComponentList(newList)

        updateShopDetails()
      }, [storeLayout, updateShopDetails])

      
    const updateCampaignList = useCallback(async() =>{
        //hardcoded for user !!!
        const campaignList = await fetchCampaignList(1)
        setCampaignList(campaignList);
        console.log(campaignList)
    }, [fetchCampaignList])

      useEffect(() => {
        updateCampaignList()
      }, [updateCampaignList])

      function saveLayoutChanges(){
        updateStoreLayout()
      }


        const sendStoreDetails = (e) => {
            e.preventDefault()

            const newDetails = {
                shopId: currentStoreId,
                shopName: (e.target.shopName.value?e.target.shopName.value:e.target.shopName.placeholder),
                welcomeMessage: (e.target.welcomeMsg.value?e.target.welcomeMsg.value:e.target.welcomeMsg.placeholder),
                campaign_id: e.target.campaignId.value,
                isPublic: e.target.isPublic.checked,
                storeSentiment: e.target.shopSentiment.value
            }

            console.log(newDetails);
            updateStoreDetails(newDetails)

            toast('Store details have been updated')
        } 
      
    return(
        <>
            <h1 className='text-center'>Edit Current Shop details</h1>
            <div className='flex flex-row justify-around'>
                <div className='basis-1/2'>
                    <h1>List of current components</h1>
                    <div className='justify-center'>
                        <ol id="storeComponentList">
                            {componentList}
                        </ol>
                    </div>
                    <div className='justify-center'>
                        <button className='SaveButton' onClick={saveLayoutChanges}>Save Updated Layout</button>
                    </div>
                </div>
                <div className='basis-1/2'>
                    <h1>Store Settings</h1>
                    <div>
                        <form className='flex flex-wrap' onSubmit={sendStoreDetails}>
                            <div className='basis-full'>
                                <label>
                                    Shop Name: <input className='m-2 border-2 border-white-500 w-2/3' 
                                    placeholder={shopDetails?shopDetails.store_name:''}
                                    id='shopName'
                                    />
                                </label>
                            </div>
                            <div className='basis-full'>
                                <label>
                                    Welcome Message: <input className='m-2 border-2 border-white-500 w-2/3' 
                                    placeholder={shopDetails?shopDetails.welcome_message:''}
                                    id='welcomeMsg'
                                    />
                                </label>
                            </div>
                            <div className='basis-full'>
                                <label>
                                    Campaign tag:
                                    <select className='m-2' id='campaignId'>
                                        {campaignList.map(campaign => {
                                            if(campaign.id == shopDetails.campaign_id){
                                                return <option selected value={campaign.id}>{campaign.campaign_name}</option>
                                            }else{
                                                return <option value={campaign.id}>{campaign.campaign_name}</option>
                                            }
                                        } 
                                    )}
                                    </select>
                                </label>
                            </div>
                            <div className='basis-full'>
                                <label>
                                    Make shop public? <input type="checkbox" id='isPublic' defaultChecked={shopDetails.isPublic}></input>
                                </label>
                            </div>
                            <div className='basis-full'>
                                <label>
                                    Sentiment:
                                    <select id='shopSentiment'>
                                        {Object.keys(sentimentMap).map(sentiment => {
                                                if(shopDetails.npc_sentiment && sentiment == shopDetails.npc_sentiment){
                                                    return <option selected value={sentiment}>{sentiment}</option>
                                                }else if(!shopDetails.npc_sentiment && sentiment =='Neutral +0%'){
                                                    return <option selected value={sentiment}>{sentiment}</option>
                                                }else{
                                                    return <option value={sentiment}>{sentiment}</option>
                                                }
                                            } 
                                        )}
                                    </select>
                                </label>
                            </div>
                            <button>Save changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditLayout;