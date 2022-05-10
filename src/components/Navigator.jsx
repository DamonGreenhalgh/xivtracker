import { 
    FiChevronRight,
    FiChevronLeft, 
    FiChevronsRight, 
    FiChevronsLeft 
} from 'react-icons/fi';

const Navigator = (props) => {
    const iconSize = '1.5em';

    const clamp = (min, index, max) => {
        return Math.max(min, Math.min(index, max));
    }

    return (
        <div className='row align-center' style={props.style}>
            <button onClick={() => props.update(props.min)}><FiChevronsLeft size={iconSize} /></button>
            <button onClick={() => props.update(current => clamp(props.min, current - 1, props.max))}><FiChevronLeft size={iconSize} /></button>
            <form onSubmit={(e) => {
                e.preventDefault();
                props.update(clamp(props.min, parseInt(e.target[0].value) - 1, props.max));
                e.target[0].value = '';
            }}>
                <input type='text' placeholder={props.current + 1} style={{textAlign: 'center', width: '3rem'}}></input>
            </form>
            <button onClick={() => props.update(current => clamp(props.min, current + 1, props.max))}><FiChevronRight size={iconSize} /></button>
            <button onClick={() => props.update(props.max)}><FiChevronsRight size={iconSize} /></button>
        </div>
    );
}

export default Navigator;