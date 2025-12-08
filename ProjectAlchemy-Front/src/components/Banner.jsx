import { useStoreContext } from "../context";

export function Banner(props){

    console.log('Banner props', props)

    const SetupObject = <div>
        <form>
            <div>
                <h1>-- select and image -- TEST</h1>
            </div>
            <div>
                <input placeholder="name"></input>
            </div>
        </form>
    </div>

    return(
        <div className="banner">
            <img className="banner-img" src="https://placehold.co/800x200" alt="banner img"></img>
            <h1 className="banner-title">{props.name}</h1>
        </div>
    );
}


export function BannerSetUp(){
    const {addStoreComponent} = useStoreContext();

    const finishSetup = (e) =>{
        e.preventDefault()
        console.log(e.target.bannerTitle.value)
        const newComponent = {
            name:"Banner",
            props: {
                name: e.target.bannerTitle.value
            }
        }
        addStoreComponent(newComponent);
    }

    return(
        <div>
            <h2 className="underline font-bold">Component Details: </h2>
            <form onSubmit={finishSetup} className="flex flex-wrap">
                <div className="basis-full">
                    <label>
                        Title for banner:
                        <input 
                            className="ml-2"
                            id="bannerTitle"
                            placeholder="Insert text for the Banner"
                         />
                    </label>
                </div>
                <div className="basis-full">
                    <button>submit</button>
                </div>
            </form>
        </div>
    );
}

export default Banner