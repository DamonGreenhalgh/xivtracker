import './Banner.css';
import { Link } from 'react-router-dom';

const Banner = (props) => {
    return (
        props.isDisabled ?
        null :
        <Link className={"banner banner--" + props.type} to={"/" + props.id + "/character"}>
            {
            props.isCrest ? 
            <div className="icon--mid relative">
                <img src={props.avatar[0]} className="icon--mid absolute" />
                <img src={props.avatar[1]} className="icon--mid absolute" />
                <img src={props.avatar[2]} className="icon--mid absolute" />
            </div> 
            :
            <img className="rounded" src={props.avatar} />
            }
            <div className="banner__text">
                <h4>{props.isPrefix ? props.title : ""}</h4>
                <h2 className={props.type == "free-company" ? "free-company__text" : ""}>
                    {props.name}
                </h2>
                {
                props.type == "free-company" ?
                <p>{props.title}</p> :
                <h4>{props.isPrefix ? "" : props.title}</h4>
                }
            </div>
            <h5 className="banner__server">{props.server}</h5>
        </Link>
    );
}

export default Banner;