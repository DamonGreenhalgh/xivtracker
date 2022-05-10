import loadingIcon from '../images/loading.svg';
import '../styles/Loading.css';

const Loading = (props) => {
    return(
        <div className={'col align-center justify-center gap' + (props.full ? ' full-page' : '')}>
            <img 
                src={loadingIcon} 
                className='loading__icon'
                alt="Loading Icon"
            />
            <p>Fetching data from Lodestone ...</p>
        </div>        
    );
}

export default Loading;