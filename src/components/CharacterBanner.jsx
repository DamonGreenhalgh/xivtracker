const CharacterBanner = (props) => {
    return (
        <div className="row gap pad-lg">
            <img src={props.avatar} className="rounded" />
            <div className='col gap-sm justify-center'>
                <h1>{props.name}</h1>
                <h3>{props.title}</h3>
            </div>
            <h4 style={{marginLeft: "auto"}}>{props.server}</h4>
        </div>
    );
}

export default CharacterBanner;