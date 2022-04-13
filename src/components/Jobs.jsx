import './Jobs.css';
import { useState } from 'react';
import Header from './Header';
import Button from '../components/utility/Button';
import JobItem from './JobItem';
import JobHeader from './JobHeader';

// Images
import tankIcon from '../images/tank.png';
import healerIcon from '../images/healer.png';
import meleeIcon from '../images/melee.png';
import rangedIcon from '../images/ranged.png';
import magicIcon from '../images/magic.png';
import handIcon from '../images/hand.png';
import landIcon from '../images/land.png';
import { useEffect } from 'react';


const Jobs = (props) => {

    const [displayJob, setDisplayJob] = useState(true);
    const [completion, setCompletion] = useState([0, 0]);
    const warMagicJobs = props.jobs.slice(0, 20);
    const handLandJobs = props.jobs.slice(20);

    // This will change every expansion, will need to manually set.
    const maxLevel = 90;

    useEffect(() => {

        let numMaxLevel = 0;
        let sumOfLevels = 0;

        for (let i = 0; i < props.jobs.length; i++) {

            // If the job is at max level, increment.
            if (props.jobs[i].Level == 90) {
                numMaxLevel++;
            }
    
            // Add level to sum.
            sumOfLevels += props.jobs[i].Level;
        }

        setCompletion(() => [
            numMaxLevel + " / " + props.jobs.length,
            Math.round(sumOfLevels / (maxLevel * props.jobs.length) * 100) + " %"
        ])

    }, [])
    
    return (
        <div className="section">

            <Header name="Jobs" />

            <div className='completion-rate'>
                <h4>{completion[0]}</h4>
                <h3>{completion[1]}</h3>
            </div>

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

            <div className={"jobs__collection war-magic" + (displayJob ? "" : " disabled")}>

                <JobHeader name="Tank" icon={tankIcon} />
                <JobHeader name="Healer" icon={healerIcon} />
                <JobHeader name="Melee" icon={meleeIcon} />
                <JobHeader name="Ranged" icon={rangedIcon} />
                <JobHeader name="Magic" icon={magicIcon} />

                {warMagicJobs.map(job => 
                    <JobItem
                    key={job.Job.ID}
                    icon={job.Job.Icon}
                    name={job.Job.Name}
                    level={job.Level}
                    exp={[job.ExpLevel, job.ExpLevelMax]}
                    hasLink={true}
                    />
                )}

            </div>
            <div className={"jobs__collection hand-land" + (!displayJob ? "" : " disabled")}>

                <JobHeader name="Hand" icon={handIcon} />
                <JobHeader name="Land" icon={landIcon} />
                
                {handLandJobs.map(job => 
                    <JobItem
                    key={job.Job.ID}
                    icon={job.Job.Icon}
                    name={job.Job.Name}
                    level={job.Level}
                    exp={[job.ExpLevel, job.ExpLevelMax]}
                    />
                )}

            </div>
        </div>
    );
}

export default Jobs;