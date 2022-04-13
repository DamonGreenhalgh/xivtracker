import './Checkbox.css';
const Checkbox = (props) => {
    return (
        <div 
            className={'checkbox' + (props.condition ? ' checkbox--active' : '')}
            onClick={() => props.update(props.condition ? false : true)}
        >
            <div className={'checkbox__box' + (props.condition ? ' checkbox__box--active' : '')} />
        </div>
    );
}

export default Checkbox;