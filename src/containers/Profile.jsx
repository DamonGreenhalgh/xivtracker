// Hooks
import { useState } from 'react';

// Components
import Header from '../components/Header';
import Divider from '../components/Divider';
import Banner from '../components/Banner';
import Button from '../components/Button';
import Bar from '../components/Bar';
import Item from '../components/Item';
import JobItem from '../components/JobItem';

// Assets
import maleIcon from '../images/male.png';
import femaleIcon from '../images/female.png';

// Style
import '../styles/Profile.css';

/**
 * @name Profile
 * @description The profile container. Contains character equipment, attributes
 * and general information about the character.
 * @param {*} props 
 * @returns 
 */
const Profile = (props) => {
    const {
        display,
        data
    } = props;
    const [contentToggle, setContentToggle] = useState(true);
    const baseUrl = "https://xivapi.com";
    const equipmentNames = Object.keys(data.Character.GearSet.Gear);

    return(
        <div className={'section' + (display ? '' : ' disabled')}>
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
                            <p>{data.Character.GearSet.Attributes.at(-2).Attribute.Name}</p>
                            <h4>{data.Character.GearSet.Attributes.at(-2).Value}</h4>
                            <Bar color="#5d9c22" width="100%" />
                        </div>
                        <div className="attributes__main">
                            <p>{data.Character.GearSet.Attributes.at(-1).Attribute.Name}</p>
                            <h4>{data.Character.GearSet.Attributes.at(-1).Value}</h4>
                            <Bar color="#be2c9f" width="100%" />
                        </div>
                        {Object.values(data.Character.GearSet.Attributes).slice(0, -2).map(attribute =>
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
                            <p>{data.Character.Title.TitleTop ? data.Title.Name : null}</p>
                            <h5>{data.Character.Name}</h5>
                            <p>{data.Character.Title.TitleTop ? null: data.Character.Title.Name}</p>
                        </li>
                        {   
                            data.Character.GrandCompany.Company !== null && data.Character.GrandCompany.Rank !== null ?
                            <>
                                <p>Grand Company</p>
                                <Divider />
                                <li>                 
                                    <img src={baseUrl + data.Character.GrandCompany.Rank.Icon} alt="grand company rank icon" />
                                    <h5>{data.Character.GrandCompany.Company.Name + ", " + data.Character.GrandCompany.Rank.Name}</h5>
                                </li>
                            </> :
                            null
                        }
                        <p>Race / Clan / Gender</p>
                        <Divider />
                        <li>
                            <img src={data.Character.Gender === 1 ? maleIcon : femaleIcon} style={{maxHeight: '1.5rem'}} alt="gender icon"/>
                            <h5>{data.Character.Race.Name + " / " + data.Character.Tribe.Name + " / " + (data.Character.Gender === 1 ? "Male" : "Female")}</h5>
                        </li>
                        <p>City-state</p>
                        <Divider />
                        <li>
                            <img src={baseUrl + data.Character.Town.Icon} alt="town icon"/>
                            <h5>{data.Character.Town.Name}</h5>
                        </li>
                        <p>Nameday</p>
                        <Divider />
                        <li>
                            <h5>{data.Character.Nameday}</h5>
                        </li>
                        <p>Guardian Diety</p>
                        <Divider />
                        <li>
                            <img src={baseUrl + data.Character.GuardianDeity.Icon} alt="diety icon" />
                            <h5>{data.Character.GuardianDeity.Name}</h5>
                        </li>
                        {
                            data.FreeCompany === null ?
                            null :
                            <>
                                <p>Free Company</p>
                                <Divider />
                                <Banner 
                                    type='free-company'
                                    avatar={
                                        <div className="icon--mid relative">
                                            <img src={data.FreeCompany.Crest[0]} className="icon--mid absolute" alt=""/>
                                            <img src={data.FreeCompany.Crest[1]} className="icon--mid absolute" alt=""/>
                                            <img src={data.FreeCompany.Crest[2]} className="icon--mid absolute" alt=""/>
                                        </div>
                                    }
                                    fc={data.FreeCompany.Crest}
                                    name={data.FreeCompany.Name}
                                    content={data.FreeCompany.Slogan}
                                    misc={data.FreeCompany.Server}
                                />
                            </>
                        }
                    </ul>
                </div>
                <div className="equipment">
                    <div style={{backgroundImage: "url('" + data.Character.Portrait + "')"}} className="equipment__portrait">
                        <JobItem 
                            name={data.Character.ActiveClassJob.Job.Name} 
                            level={data.Character.ActiveClassJob.Level} 
                            exp={[data.Character.ActiveClassJob.ExpLevel, data.Character.ActiveClassJob.ExpLevelMax]} 
                            icon={data.Character.ActiveClassJob.Job.Icon}
                            currentJob={true}
                            hasLink={true}
                        />
                    </div>
                    {Object.values(data.Character.GearSet.Gear).map((item, index) => 
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