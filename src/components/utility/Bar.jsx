import './Bar.css';
const Bar = (props) => {
    return (
        <div className="bar">
            <div 
                className="bar__completion" 
                style={{
                    width: props.width,
                    backgroundColor: props.color
                }} 
            />
        </div>
    );
}

export default Bar;