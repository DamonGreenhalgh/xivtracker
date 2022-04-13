import './Banner.css';
import { Link } from 'react-router-dom';
import { ImDiamonds } from 'react-icons/im';

const Banner = (props) => {
    return (
    <Link className={'banner ' + props.type} to={props.link}>
        {props.avatar}
        <div className='col justify-center'>
            <h2>{props.name}</h2>
            <h3>{props.title}</h3>
            <p>{props.content}</p>
        </div>
        <div className='misc' style={{color: 'var(--color-completed)', marginLeft: 'auto'}}>
            <p>{props.misc}</p>
            <ImDiamonds style={{minHeight: '1rem', minWidth: '1rem'}}/>
        </div>
        
    </Link>
    );
}

Banner.defaultProps = {
    link: '',
    type: 'disabled'
};

export default Banner;