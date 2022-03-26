import './Notice.css';
import { MdClose, MdError } from 'react-icons/md';
import { BsQuestionCircleFill } from 'react-icons/bs';
import { FaCookieBite } from 'react-icons/fa';
import { useState } from 'react';

const notice = {
    0: {
        icon: <FaCookieBite className="notice__icon" />,
        text: <p><b><i>XIV Tracker</i></b> uses <b>cookies (and cookie like systems)</b> to enhance user experience. Without cookies, many features may not function properly.</p>
    },
    1: {
        icon: <MdError className="notice__icon" />,
        text: <p>Didn't find what you were looking for? Search with full name and server!</p>
    },
    2: {
        icon: <MdError className="notice__icon" />,
        text: 
        <p>
            Some XIV Tracker features may not function properly due to a 
            dependency on Achievements being set to public. You can 
            change these settings <a href="https://na.finalfantasyxiv.com/lodestone/my/setting/account/">here.</a>
        </p>
    }, 
    3: {
        icon: <BsQuestionCircleFill className="notice__icon" />,
        text: <p>Did not find any character by that name.</p>
    }
}

const Notice = (props) => {
    const type = props.type;
    const [displayNotice, setDisplayNotice] = useState(true);
    return (
    <div className={"notice" + ((props.show && displayNotice) ? "" : " disabled") + (type == 0 ? " notice--cookies" : "")}>
        {notice[type].icon}
        {notice[type].text}
        <MdClose
            className="notice__close interactable"
            onClick={() => setDisplayNotice(false)}
        />
    </div>
    );
}

export default Notice;