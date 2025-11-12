import { useEffect } from 'react';
import { useStoreContext } from '../context'

function EditPanel(){
    const {shopDisplayPage, setShopDisplayPage} = useStoreContext();
    // previewButtonElement = document.getElementById('previewButton');
    

    function changePageDisplay(newPageName){
        console.log("CHANGE PAGE DISPLAY")
        console.log(newPageName)
        setShopDisplayPage(newPageName)
    }

    useEffect(() => {
        function PreviewListener(e){
            changePageDisplay("Preview")
        }
        function LayoutListener(e){
            changePageDisplay("Layout")
        }
        function CatalogListener(e){
            changePageDisplay("Catalog")
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
            <button id='previewButton'>EDITS A</button>
            <button id='layoutButton'>EDITS B</button>
            <button id='catalogButton'>EDITS C</button>
        </div>
        </>
    );
}

export default EditPanel