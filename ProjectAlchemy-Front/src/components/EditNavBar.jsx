import { NavLink } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useStoreContext } from '../context';

function EditNavBar(){
    const {currentStoreId} = useStoreContext();


    
    function createShopLink(){
        const shareLink = `http://localhost:5173/player/store/${currentStoreId}`;
        toast(shareLink)
    }

    return(
        <>
        <div className="editPanel">
            <NavLink to="Preview">
                <button id='previewButton'>Store Preview</button>
            </NavLink>
            <NavLink to="EditLayout">
                <button id='layoutButton'>Edit Layout</button>
            </NavLink>
            {/* <NavLink to="EditCatalog">
                <button id='catalogButton'>Edit Catalog</button>
            </NavLink> */}
            <NavLink to="OrderList">
                <button id='catalogButton'>Orders</button>
            </NavLink>
            <button onClick={createShopLink} id='ShareLink'>Share Link</button>
        </div>
        <Toaster/>
        </>
    );
}

export default EditNavBar