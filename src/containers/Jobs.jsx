// Hooks
import { useState, useEffect } from 'react';

// Components
import Header from '../components/Header';
import Button from '../components/Button';
import JobItem from '../components/JobItem';
import JobHeader from '../components/JobHeader';

// Assets
import tankIcon from '../images/tank.png';
import healerIcon from '../images/healer.png';
import meleeIcon from '../images/melee.png';
import rangedIcon from '../images/ranged.png';
import magicIcon from '../images/magic.png';
import handIcon from '../images/hand.png';
import landIcon from '../images/land.png';

// Styles
import '../styles/Jobs.css';

const Jobs = (props) => {

    const {
        display,
        jobs
    } = props;
    const [displayJob, setDisplayJob] = useState(true);
    const [completion, setCompletion] = useState([0, 0]);
    const warMagicJobs = jobs.slice(0, 20);
    const handLandJobs = jobs.slice(20);

    // This will change every expansion, will need to manually set.
    const maxLevel = 90;

    useEffect(() => {

        let numMaxLevel = 0;
        let sumOfLevels = 0;

        for (let i = 0; i < jobs.length; i++) {

            // If the job is at max level, increment.
            if (jobs[i].Level === 90) {
                numMaxLevel++;
            }
    
            // Add level to sum.
            sumOfLevels += jobs[i].Level;
        }

        setCompletion(() => [
            numMaxLevel + " / " + jobs.length,
            Math.round(sumOfLevels / (maxLevel * jobs.length) * 100) + " %"
        ])

    }, [])
    
    return (
        <div className={"section" + (display ? '' : ' disabled')}>

            <Header 
                name="Jobs"
                minor={completion[0]}
                major={completion[1]}
            />

            <div className="row gap-lg">
                <Button 
                    content="Combat" 
                    condition={displayJob} 
                    onClick={() => setDisplayJob(true)}
                />
                <Button 
                    content="Profession" 
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
                    isCombat={true}
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
                    isCombat={false}
                    />
                )}

            </div>
        </div>
    );
}

export default Jobs;