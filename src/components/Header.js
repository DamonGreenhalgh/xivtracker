const Header = (props) => {
    return (

        props.isMinor
        ?
        <div style={{gridArea: props.name}} className="section-header--minor">
            <div className="section-header--minor-row">
                <img src={props.image} className="icon--job-header" />
                <h4 className="section-header__minor-text">{props.name}</h4>
            </div>
            <div className="divider--horizontal" />
        </div>
        :
        <div className={"section-header" + (props.isSpan ? " section-header--cover" : "")}>
            <div className="divider--horizontal" />
            <h2>{props.name}</h2>
            <div className="divider--horizontal" />
        </div>
    );
}

export default Header;