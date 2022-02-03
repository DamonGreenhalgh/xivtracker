import noticeIcon from '../images/notice.png';
import exitIcon from '../images/exit.png';
import { useRef } from 'react';

const Notice = (props) => {
    const notice = useRef(null);
    return (
    <div className={props.show ? "notice" : "disabled"} ref={notice}>
        <img src={noticeIcon} />
        {props.text}
        <img
        src={exitIcon}
        className="notice__exit-button interactable"
        onClick={() => notice.current.style.display = "none" }
        />
    </div>
    );
}

export default Notice;