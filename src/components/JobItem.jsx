import Bar from './utility/Bar';
const JobItem = (props) => {
    const link = "https://na.finalfantasyxiv.com/jobguide/";
    let nameNoGap = (props.name).replace(/\s/g, '');
    return (
        <a 
            className="row align-center gap-sm" 
            style={{gridArea: (props.name).replace(/\s/g, '')}} 
            href={props.hasLink ? link + nameNoGap : null}
        >
            <img src={"https://xivapi.com" + props.icon} className="icon--job" />
            <h2 
                className={"job__level-text" + (props.level == 90 ? " max" : "")}>
                {props.level}
            </h2>
            <div className='col max-width'>
                <p>{props.name}</p>
                <Bar
                    width={(props.exp[0] / props.exp[1] * 100).toString() + "%"}
                    color="var(--color-experience)" 
                />
            </div>
        </a>
    );
}

export default JobItem