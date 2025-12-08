function Banner(props){

    console.log('Banner props', props)

    return(
        <div className="banner">
            <img className="banner-img" src="https://placehold.co/800x200" alt="banner img"></img>
            <h1 className="banner-title">{props.name}</h1>
        </div>
    );
}
export default Banner