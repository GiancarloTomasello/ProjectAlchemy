import { useEffect, useState } from 'react';
import EditNavBar from '../components/EditNavBar.jsx'
import { useStoreContext } from '../context.jsx'
import ComponentDisplayCard from '../components/ComponentDisplayCard.jsx';

function EditLayout(){
      const {storeLayout, setStoreLayout} = useStoreContext();
      const [componentList, setComponentList ]= useState([]);

      useEffect(()=>{
        const newList = storeLayout.map((component, index)=> {
            return <li key={index} className='flex flex-row'>
                <ComponentDisplayCard component={component} index={index}/>
            </li>
        })
        setComponentList(newList)
        console.log('EDIT LAYOUT USE EFFECT')
      }, [storeLayout])

      function saveLayoutChanges(){
        console.log('Call update on backend')
      }
      

    return(
        <>
            <EditNavBar/>
            <h1 className='text-center'>Edit Current Web Components</h1>
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
                    <h1>Preview of the element</h1>
                    <div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default EditLayout;