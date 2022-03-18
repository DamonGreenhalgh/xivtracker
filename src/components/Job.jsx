const Job = (props) => {
    const link = "https://na.finalfantasyxiv.com/jobguide/";
    let nameNoGap = (props.name).replace(/\s/g, '');
    return (
        <a className="job" style={{gridArea: nameNoGap}} href={props.hasLink ? link + nameNoGap : null}>
            <img src={"https://xivapi.com" + props.icon} className="icon--job" />
            <h2 className={"job__level-text " + (props.level == 90 ? "max-level" : "")}>{props.level}</h2>
            <div style={{width: "100%"}}>
                <p>{props.name}</p>
                <div className="job__level-bar">
                    <div className="job__level-bar__completed" style={{width: (props.exp[0] / props.exp[1] * 100).toString() + "%"}} />
                </div>
            </div>
        </a>
    );
}

export default Job