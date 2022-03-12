import './Notice.css';
import { MdClose } from 'react-icons/md';
import { IoAlertCircle } from 'react-icons/io5';
import { useRef } from 'react';

const Notice = (props) => {
    const notice = useRef(null);
    return (
    <div className={props.show ? "notice" : "disabled"} ref={notice}>
        <IoAlertCircle className="notice__icon"/>
        {props.text}
        <MdClose className="notice__exit-button interactable" onClick={() => notice.current.style.display = "none"}/>
    </div>
    );
}

export default Notice;