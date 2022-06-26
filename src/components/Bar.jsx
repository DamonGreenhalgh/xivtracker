import '../styles/Bar.css';
const Bar = (props) => {
    const {
        width,
        color
    } = props;
    return (
        <div className="bar">
            <div 
                className="bar__completion" 
                style={{
                    width: width,
                    backgroundColor: color
                }} 
            />
        </div>
    );
}

export default Bar;