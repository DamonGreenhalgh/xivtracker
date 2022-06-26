import '../styles/Checkbox.css';
const Checkbox = (props) => {
    const {
        type,
        condition,
        update
    } = props;
    return (
        <div 
            className={'checkbox checkbox--' + type + (condition ? ' checkbox--active' : '')}
            onClick={() => update(condition ? false : true)}
        >
            <div className={'checkbox__box checkbox__box--' + type + (condition ? ' checkbox__box--active' : '')} />
        </div>
    );
}

export default Checkbox;