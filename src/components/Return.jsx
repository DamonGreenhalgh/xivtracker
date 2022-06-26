import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Return = () => {
    const navigate = useNavigate();
    return(
        <button 
            style={{
                position: "absolute",
                top: ".25em",
                left: "calc(-2em - 1rem)"
            }}
            onClick={() => navigate(-1)}
        >
            <IoMdArrowBack size="2em"/>
        </button>
    );
}

export default Return;