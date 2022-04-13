import './Attributes.css';
import Bar from './utility/Bar';
import Header from './Header';
import Button from './utility/Button';
import Divider from './utility/Divider';
import { useState } from 'react';
import maleIcon from '../images/male.png';
import femaleIcon from '../images/female.png';

const Attributes = (props) => {
    const [contentToggle, setContentToggle] = useState(true);
    const baseUrl = "https://xivapi.com";
    return (
        <div className="section">
            <Header name="Profile" />
            <div className="row gap-lg">
                <Button 
                    content="Information" 
                    condition={contentToggle} 
                    onClick={() => setContentToggle(true)}
                />
                <Button 
                    content="Attributes" 
                    condition={!contentToggle} 
                    onClick={() => setContentToggle(false)}
                />
            </div>

            <ul className={"attributes__list" + (contentToggle ? " disabled" : "")}>
                <div className="attributes__main">
                    <p>{props.data.GearSet.Attributes.at(-2).Attribute.Name}</p>
                    <h4>{props.data.GearSet.Attributes.at(-2).Value}</h4>
                    <Bar color="var(--color-health)" width="100%" />
                </div>
                <div className="attributes__main">
                    <p>{props.data.GearSet.Attributes.at(-1).Attribute.Name}</p>
                    <h4>{props.data.GearSet.Attributes.at(-1).Value}</h4>
                    <Bar color="var(--color-mana)" width="100%" />
                </div>
                {Object.values(props.data.GearSet.Attributes).slice(0, -2).map(attribute =>
                    <li className="row justify-between" key={attribute.Attribute.ID}>
                        <p>{attribute.Attribute.Name}</p>
                        <h4>{attribute.Value}</h4>
                    </li> 
                )}
            </ul>
            
            <ul className={'profile' + (contentToggle ? '' : " disabled")}>
                <p>Name / Title</p>
                <Divider />
                <li>
                    <p>{props.data.Title.TitleTop ? props.data.Title.Name : null}</p>
                    <h5>{props.data.Name}</h5>
                    <p>{props.data.Title.TitleTop ? null: props.data.Title.Name}</p>
                </li>
                {   
                    props.data.GrandCompany.Company !== null && props.data.GrandCompany.Rank !== null ?
                    <>
                        <p>Grand Company</p>
                        <Divider />
                        <li>                 
                            <img src={baseUrl + props.data.GrandCompany.Rank.Icon} />
                            <h5>{props.data.GrandCompany.Company.Name + ", " + props.data.GrandCompany.Rank.Name}</h5>
                        </li>
                    </> :
                    null
                }
                <p>Race / Clan / Gender</p>
                <Divider />
                <li>
                    <img src={props.data.Gender == 1 ? maleIcon : femaleIcon} style={{maxHeight: '1.5rem'}} />
                    <h5>{props.data.Race.Name + " / " + props.data.Tribe.Name + " / " + (props.data.Gender == 1 ? "Male" : "Female")}</h5>
                </li>
                <p>City-state</p>
                <Divider />
                <li>
                    <img src={baseUrl + props.data.Town.Icon} />
                    <h5>{props.data.Town.Name}</h5>
                </li>
                <p>Nameday</p>
                <Divider />
                <li>
                    <h5>{props.data.Nameday}</h5>
                </li>
                <p>Guardian Diety</p>
                <Divider />
                <li>
                    <img src={baseUrl + props.data.GuardianDeity.Icon} />
                    <h5>{props.data.GuardianDeity.Name}</h5>
                </li>
            </ul>
        </div>
    );
}

export default Attributes;