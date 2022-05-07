// Hooks
import { useState } from 'react';

// Components
import Header from '../components/Header';
import Divider from './utility/Divider';
import Banner from './Banner';
import Button from './utility/Button';
import Bar from './utility/Bar';
import Item from './Item';
import JobItem from './JobItem';

// Assets
import maleIcon from '../images/male.png';
import femaleIcon from '../images/female.png';

// Style
import './Profile.css';

/**
 * @name Profile
 * @description The profile container. Contains character equipment, attributes
 * and general information about the character.
 * @param {*} props 
 * @returns 
 */
const Profile = (props) => {
    const [contentToggle, setContentToggle] = useState(true);
    const baseUrl = "https://xivapi.com";
    const equipmentNames = Object.keys(props.data.Character.GearSet.Gear);

    return(
        <div className={'section' + (props.display ? '' : ' disabled')}>
            <Header name="Profile" />
            <div className='profile__content'>
                <div className="col gap-lg max-width">
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
                            <p>{props.data.Character.GearSet.Attributes.at(-2).Attribute.Name}</p>
                            <h4>{props.data.Character.GearSet.Attributes.at(-2).Value}</h4>
                            <Bar color="var(--color-health)" width="100%" />
                        </div>
                        <div className="attributes__main">
                            <p>{props.data.Character.GearSet.Attributes.at(-1).Attribute.Name}</p>
                            <h4>{props.data.Character.GearSet.Attributes.at(-1).Value}</h4>
                            <Bar color="var(--color-mana)" width="100%" />
                        </div>
                        {Object.values(props.data.Character.GearSet.Attributes).slice(0, -2).map(attribute =>
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
                            <p>{props.data.Character.Title.TitleTop ? props.data.Title.Name : null}</p>
                            <h5>{props.data.Character.Name}</h5>
                            <p>{props.data.Character.Title.TitleTop ? null: props.data.Character.Title.Name}</p>
                        </li>
                        {   
                            props.data.Character.GrandCompany.Company !== null && props.data.Character.GrandCompany.Rank !== null ?
                            <>
                                <p>Grand Company</p>
                                <Divider />
                                <li>                 
                                    <img src={baseUrl + props.data.Character.GrandCompany.Rank.Icon} />
                                    <h5>{props.data.Character.GrandCompany.Company.Name + ", " + props.data.Character.GrandCompany.Rank.Name}</h5>
                                </li>
                            </> :
                            null
                        }
                        <p>Race / Clan / Gender</p>
                        <Divider />
                        <li>
                            <img src={props.data.Character.Gender == 1 ? maleIcon : femaleIcon} style={{maxHeight: '1.5rem'}} />
                            <h5>{props.data.Character.Race.Name + " / " + props.data.Character.Tribe.Name + " / " + (props.data.Character.Gender == 1 ? "Male" : "Female")}</h5>
                        </li>
                        <p>City-state</p>
                        <Divider />
                        <li>
                            <img src={baseUrl + props.data.Character.Town.Icon} />
                            <h5>{props.data.Character.Town.Name}</h5>
                        </li>
                        <p>Nameday</p>
                        <Divider />
                        <li>
                            <h5>{props.data.Character.Nameday}</h5>
                        </li>
                        <p>Guardian Diety</p>
                        <Divider />
                        <li>
                            <img src={baseUrl + props.data.Character.GuardianDeity.Icon} />
                            <h5>{props.data.Character.GuardianDeity.Name}</h5>
                        </li>
                        {
                            props.data.FreeCompany == null ?
                            null :
                            <>
                                <p>Free Company</p>
                                <Divider />
                                <Banner 
                                    type='free-company'
                                    avatar={
                                        <div className="icon--mid relative">
                                            <img src={props.data.FreeCompany.Crest[0]} className="icon--mid absolute" />
                                            <img src={props.data.FreeCompany.Crest[1]} className="icon--mid absolute" />
                                            <img src={props.data.FreeCompany.Crest[2]} className="icon--mid absolute" />
                                        </div>
                                    }
                                    fc={props.data.FreeCompany.Crest}
                                    name={props.data.FreeCompany.Name}
                                    content={props.data.FreeCompany.Slogan}
                                    misc={props.data.FreeCompany.Server}
                                />
                            </>
                        }
                    </ul>
                </div>
                <div className="equipment">
                    <div style={{backgroundImage: "url('" + props.data.Character.Portrait + "')"}} className="equipment__portrait">
                        <JobItem 
                            name={props.data.Character.ActiveClassJob.Job.Name} 
                            level={props.data.Character.ActiveClassJob.Level} 
                            exp={[props.data.Character.ActiveClassJob.ExpLevel, props.data.Character.ActiveClassJob.ExpLevelMax]} 
                            icon={props.data.Character.ActiveClassJob.Job.Icon}
                            currentJob={true}
                            hasLink={true}
                        />
                    </div>
                    {Object.values(props.data.Character.GearSet.Gear).map((item, index) => 
                        <Item 
                            type={equipmentNames[index]}
                            name={item.Item.Name}
                            icon={("https://xivapi.com" + item.Item.Icon).slice(0, -4) + "_hr1.png"}
                            materia={item.Materia}
                            glamour={item.Mirage}
                            id={item.Item.ID}
                            key={index}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;