import loadingIcon from '../../images/loading.svg';
import './Loading.css';

const Loading = () => {
    return(
        <div className='loading'>
            <img 
                src={loadingIcon} 
                className='loading__icon'
                alt="Loading Icon"
            />
            <p>Loading data from Lodestone ...</p>
        </div>
        
    );
}

export default Loading;