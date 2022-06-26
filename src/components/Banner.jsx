import '../styles/Banner.css';
import { Link } from 'react-router-dom';
import { ImDiamonds } from 'react-icons/im';

const Banner = (props) => {
    const {
        type,
        name,
        title,
        avatar,
        link,
        misc,
        content
    } = props;
    return (
    <Link className={'banner ' + type} to={link}>
        {avatar}
        <div className='col justify-center'>
            <h2>{name}</h2>
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
        <div className={"misc" + (misc === undefined ? " disabled" : "")} style={{color: 'var(--color-completed)', marginLeft: 'auto'}}>
            <p>{misc}</p>
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