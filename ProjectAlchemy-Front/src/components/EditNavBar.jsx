import { NavLink } from 'react-router-dom'

function EditNavBar(){


    return(
        <>
        <div className="editPanel">
            <NavLink to="Preview">
                <button id='previewButton'>Store Preview</button>
            </NavLink>
            <NavLink to="EditLayout">
                <button id='layoutButton'>Edit Layout</button>
            </NavLink>
            <NavLink to="EditCatalog">
                <button id='catalogButton'>Edit Catalog</button>
            </NavLink>
        </div>
        </>
    );
}

export default EditNavBar