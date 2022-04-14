import './Checkbox.css';
const Checkbox = (props) => {
    return (
        <div 
            className={'checkbox checkbox--' + props.type + (props.condition ? ' checkbox--active' : '')}
            onClick={() => props.update(props.condition ? false : true)}
        >
            <div className={'checkbox__box checkbox__box--' + props.type + (props.condition ? ' checkbox__box--active' : '')} />
        </div>
    );
}

export default Checkbox;