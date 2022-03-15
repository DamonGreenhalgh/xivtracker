import loadingIcon from '../images/loading.svg';

const Loading = (props) => {
    return(
        <img 
            src={loadingIcon} 
            className={props.show ? "icon--loading" : "disabled"}
            alt="Loading Icon"
        />
    );
}

export default Loading;