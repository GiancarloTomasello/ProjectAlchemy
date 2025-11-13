import { useEffect } from "react"
import { useStoreContext } from "../context";

function ComponentDisplayCard({component, index}){
        const {storeLayout, setStoreLayout} = useStoreContext();
    
        function moveComponentUp(){
            console.log('Move component up')
            if(index != 0){
                const newLayout = [...storeLayout]
                const temp = newLayout[index]
                newLayout[index] = newLayout[index-1]
                newLayout[index-1] = temp 
                setStoreLayout(newLayout)
            }
        }

        function moveComponentDown(){
            console.log('Move component down')
            console.log(storeLayout)
            if(index < storeLayout.length-1){
                const newLayout = [...storeLayout]
                const temp = newLayout[index]
                newLayout[index] = newLayout[index+1]
                newLayout[index+1] = temp 
                setStoreLayout(newLayout)
                console.log(newLayout)
            }
        }


    return(
        <>
            <div className="editComponent">
                <button onClick={moveComponentUp} id="componentUp">UP</button>
                <h3>{component.name}</h3>
                <button onClick={moveComponentDown} id="componentDown">DOWN</button>
            </div>
        </>
    )
}

export default ComponentDisplayCard