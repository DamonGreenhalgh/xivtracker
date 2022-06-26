import Bar from './Bar';
const JobItem = (props) => {
    const {
        isCombat,
        name,
        currentJob,
        icon,
        level,
        exp
    } = props;
    const link = "https://na.finalfantasyxiv.com/" + (isCombat ? "jobguide/" : "crafting_gathering_guide/");
    let nameNoGap = (name).replace(/\s/g, '');
    return (
        <a 
            className={"row align-center gap-sm max-width" + (currentJob ? " current-job" : null)}
            style={{gridArea: nameNoGap}} 
            href={link + nameNoGap}
        >
            <img src={"https://xivapi.com" + icon} className="icon--job" alt="job icon" />
            <h2 
                className="job__level-text" style={{color: level === 90 ? "#f09744" : null}}>
                {level}
            </h2>
            <div className='col max-width gap-xsm'>
                <div className='row align-center justify-between'>
                    <p style={{color: "var(--c-mid-text)"}}>{nameNoGap.charAt(0).toUpperCase() + nameNoGap.slice(1)}</p>
                    <p style={{fontSize: '.6rem', textAlign: 'end'}}>
                        {level === 90 ? "Max Level" : exp[0] + " / " + exp[1]}
                    </p>
                </div>
                <Bar
                    width={(exp[0] / exp[1] * 100).toString() + "%"}
                    color="var(--color-experience)" 
                />
            </div>
        </a>
    );
}

export default JobItem