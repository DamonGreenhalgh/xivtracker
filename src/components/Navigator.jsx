import { 
    FiChevronRight,
    FiChevronLeft, 
    FiChevronsRight, 
    FiChevronsLeft 
} from 'react-icons/fi';

const Navigator = (props) => {
    const {
        style,
        min,
        max,
        update,
        current
    } = props;
    const iconSize = '1.5em';
    const clamp = (min, index, max) => {
        return Math.max(min, Math.min(index, max));
    }

    return (
        <div className='row align-center' style={style}>
            <button onClick={() => update(min)}><FiChevronsLeft size={iconSize} /></button>
            <button onClick={() => update(current => clamp(min, current - 1, max))}><FiChevronLeft size={iconSize} /></button>
            <form onSubmit={(e) => {
                e.preventDefault();
                update(clamp(min, parseInt(e.target[0].value) - 1, max));
                e.target[0].value = '';
            }}>
                <input type='text' placeholder={current + 1} style={{textAlign: 'center', width: '3rem'}}></input>
            </form>
            <button onClick={() => update(current => clamp(min, current + 1, max))}><FiChevronRight size={iconSize} /></button>
            <button onClick={() => update(max)}><FiChevronsRight size={iconSize} /></button>
        </div>
    );
}

export default Navigator;