import { useNavigate } from "react-router-dom";

function WelcomePage(){
    const navigate = useNavigate()


    function navToCampaign(){
        navigate('/campaignCreation')
    }

    function navToShop(){
        navigate('/shopCreation')
    }


    return(
        <div className="h-full mh-full">
            <h1>Welcome user! What would you like to do?</h1>
            <div className="flex justify-evenly m-10 mh-full h-full">
                <div onClick={navToCampaign} className="basis-1/3 bg-red-500">
                    <h1>Create a new campaign</h1>
                    <img className=" card-img" src="https://placehold.co/300" alt="option img"></img>
                </div>
                <div onClick={navToShop} className="text-center align-center basis-1/3 bg-red-500 m-2">
                    <h1>Create a new shop</h1>
                    <img className="card-img" src="https://placehold.co/300" alt="option img"></img>

                </div>
            </div>
        </div>
    );
}

export default WelcomePage