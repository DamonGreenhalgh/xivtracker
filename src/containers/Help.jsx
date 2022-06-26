import { useEffect } from "react";
import Divider from "../components/Divider";
import Return from "../components/Return";
import idHelp from '../images/id-help.png';

const Help = (props) => {

    useEffect(() => {
        document.documentElement.style.setProperty('--content-width', '70rem');
        props.setShowSearchbar(false);
        document.title = "XIV Tracker | Help";
    }, [])

    return(
        <div className="settings">
            <h1>FAQ</h1>
            <Divider />
            <Return />
            <div className="settings__row">
                <div className="col gap max-width">
                    <h2>"Why can't I see my quests and achievements?"</h2>
                    <p>
                        XIV Tracker uses a characters achievements to determine quest 
                        completions. Lodestone has achievements set to private by 
                        default. You can change these settings <a 
                            href="https://na.finalfantasyxiv.com/lodestone/my/setting/account/"
                            style={{textDecoration: "underline"}}
                        >here</a>
                    </p>
                    <h2>"Is XIV Tracker spoiler safe?"</h2>
                    <p>
                        By default XIV Tracker will blur out content that could be
                        considered a spoiler for the main scenario questline. 
                        You must link a character from Lodestone (using the 
                        character id on the url) to view spoiler content.
                    </p>
                </div>
                <div className="col gap max-width">
                    <h2>"Wait a minute, where is my mount!?"</h2>
                    <p>
                        XIV Tracker is dependent on resources such as the official 
                        Lodestone site. Loadestone itself updates approximately every 12
                        hours. XIV Tracker can only show data from the most recent update,
                        so XIV Tracker will not display updates to a character from the past 
                        12 hours.
                    </p>
                    <h2>"How do I assign a reference character?"</h2>
                    <p>
                        The Lodestone ID can be found by taking the digits after <i>xivtracker.gg/... </i> 
                        for example, the id for the below character would be <b>38592216</b>.
                    </p>
                    <img 
                        src={idHelp} 
                        style={{width: "100%", boxShadow: "0 .5rem 1rem var(--c-shadow)"}} 
                        alt="lodestone id location help image" 
                    />
                </div>
            </div>
        </div>
    );
} 

export default Help;