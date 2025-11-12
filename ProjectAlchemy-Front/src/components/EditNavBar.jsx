import { useEffect } from 'react';
import { useStoreContext } from '../context'
import { useNavigate } from 'react-router-dom'

function EditNavBar(){
    const {shopDisplayPage, setShopDisplayPage} = useStoreContext();
    // previewButtonElement = document.getElementById('previewButton');
    const navigate = useNavigate();

    function changePageDisplay(newPageName){
        console.log("CHANGE PAGE DISPLAY")
        console.log(newPageName)
        setShopDisplayPage(newPageName)
    }

    useEffect(() => {
        function PreviewListener(e){
            changePageDisplay("Preview")
            navigate('/Preview')
        }
        function LayoutListener(e){
            changePageDisplay("Layout")
            navigate('/EditLayout')
        }
        function CatalogListener(e){
            changePageDisplay("Catalog")
            navigate('/EditCatalog')
        }

        const previewButtonElement = document.getElementById('previewButton');
        const LayoutButtonElement = document.getElementById('layoutButton');
        const CatalogButtonElement = document.getElementById('catalogButton');

        previewButtonElement.addEventListener('click', PreviewListener)
        LayoutButtonElement.addEventListener('click', LayoutListener)
        CatalogButtonElement.addEventListener('click', CatalogListener)

        return () => {
            previewButtonElement.removeEventListener('click', PreviewListener)
            LayoutButtonElement.removeEventListener('click', LayoutListener)
            CatalogButtonElement.removeEventListener('click', CatalogListener)
        };
    }, [])

    return(
        <>
        <div className="editPanel">
            <button id='previewButton'>Store Preview</button>
            <button id='layoutButton'>Edit Layout</button>
            <button id='catalogButton'>Edit Catalog</button>
        </div>
        </>
    );
}

export default EditNavBar