import './Banner.css';
import { Link } from 'react-router-dom';

const Banner = (props) => {
    return (
    <Link className={'banner ' + props.type} to={props.link}>
        {props.avatar}
        <div className='col justify-center'>
            <h2>{props.name}</h2>
            <h3>{props.title}</h3>
            <p>{props.content}</p>
        </div>
        <p style={{marginLeft: 'auto'}}>{props.misc}</p>
    </Link>
    );
}

Banner.defaultProps = {
    link: ""
}

export default Banner;