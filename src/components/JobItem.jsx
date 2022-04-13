import Bar from './utility/Bar';
const JobItem = (props) => {
    const link = "https://na.finalfantasyxiv.com/jobguide/";
    let nameNoGap = (props.name).replace(/\s/g, '');
    const name = nameNoGap.charAt(0).toUpperCase() + nameNoGap.slice(1);
    return (
        <a 
            className={"row align-center gap-sm max-width" + (props.currentJob ? " current-job" : null)}
            style={{gridArea: nameNoGap}} 
            href={props.hasLink ? link + nameNoGap : null}
        >
            <img src={"https://xivapi.com" + props.icon} className="icon--job" />
            <h2 
                className="job__level-text" style={{color: props.level == 90 ? "var(--color-max-level)" : null}}>
                {props.level}
            </h2>

            <div className='col max-width gap-xsm'>
                <div className='row align-center justify-between'>
                    <p style={{color: "var(--c-mid-text)"}}>{name}</p>
                    <p style={{fontSize: '.6rem', textAlign: 'end'}}>
                        {props.level == 90 ? "Max Level" : props.exp[0] + " / " + props.exp[1]}
                    </p>
                </div>
                <Bar
                    width={(props.exp[0] / props.exp[1] * 100).toString() + "%"}
                    color="var(--color-experience)" 
                />

            </div>
            
        </a>
    );
}

export default JobItem