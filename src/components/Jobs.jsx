import { useState } from 'react';
import Job from './Job';
import './Jobs.css';
import Header from './Header';
import tankIcon from '../images/tank.png';
import healerIcon from '../images/healer.png';
import meleeIcon from '../images/melee.png';
import rangedIcon from '../images/ranged.png';
import magicIcon from '../images/magic.png';
import handIcon from '../images/hand.png';
import landIcon from '../images/land.png';
import Button from '../components/utility/Button';


const Jobs = (props) => {

    const [displayJob, setDisplayJob] = useState(true);
    const warMagicJobs = props.jobs.slice(0, 20);
    const handLandJobs = props.jobs.slice(20);

    return (
        <div className="jobs section">
            <Header name="Jobs" />
            <div className="row gap-lg">
                <Button 
                    content="War / Magic" 
                    condition={displayJob} 
                    onClick={() => setDisplayJob(true)}
                />
                <Button 
                    content="Hand / Land" 
                    condition={!displayJob} 
                    onClick={() => setDisplayJob(false)}
                />
            </div>
            <div className="panel">
                <div className={"jobs--war-magic panel__content panel__content--" + props.type + " " + (displayJob ? "" : "disabled")}>
                    <Header name="Tank" isMinor={true} image={tankIcon} />
                    <Header name="Healer" isMinor={true} image={healerIcon} />
                    <Header name="Melee" isMinor={true} image={meleeIcon} />
                    <Header name="Ranged" isMinor={true} image={rangedIcon} />
                    <Header name="Magic" isMinor={true} image={magicIcon} />

                    {warMagicJobs.map(job => 
                        <Job
                        key={job.Job.ID}
                        icon={job.Job.Icon}
                        name={job.Job.Name}
                        level={job.Level}
                        exp={[job.ExpLevel, job.ExpLevelMax]}
                        hasLink={true}
                        />
                    )}
                </div>
                <div className={"jobs--hand-land panel__content panel__content--" + props.type + " " + (!displayJob ? "" : "disabled")}>
                    
                    <Header name="Hand" isMinor={true} image={handIcon} />
                    <Header name="Land" isMinor={true} image={landIcon} />
                    {handLandJobs.map(job => 
                        <Job
                        key={job.Job.ID}
                        icon={job.Job.Icon}
                        name={job.Job.Name}
                        level={job.Level}
                        exp={[job.ExpLevel, job.ExpLevelMax]}
                        />
                    )}
                </div>
            </div>
        </div>  
    );
}

export default Jobs;