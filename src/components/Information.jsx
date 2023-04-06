import "../styles/Information.css";
import Divider from "./Divider";
import Banner from "./Banner";
import maleIcon from "../images/male.png";
import femaleIcon from "../images/female.png";

const Information = (props) => {
  const { data, display } = props;
  const baseUrl = "https://xivapi.com";

  return (
    <ul className={"information" + (display ? "" : " disabled")}>
      <p>Name / Title</p>
      <Divider />
      <li>
        <p>{data.Character.Title.TitleTop ? data.Title.Name : null}</p>
        <h5>{data.Character.Name}</h5>
        <p>
          {data.Character.Title.TitleTop ? null : data.Character.Title.Name}
        </p>
      </li>
      {data.Character.GrandCompany.Company !== null &&
      data.Character.GrandCompany.Rank !== null ? (
        <>
          <p>Grand Company</p>
          <Divider />
          <li>
            <img
              src={baseUrl + data.Character.GrandCompany.Rank.Icon}
              alt="grand company rank icon"
            />
            <h5>
              {data.Character.GrandCompany.Company.Name +
                ", " +
                data.Character.GrandCompany.Rank.Name}
            </h5>
          </li>
        </>
      ) : null}
      <p>Race / Clan / Gender</p>
      <Divider />
      <li>
        <img
          src={data.Character.Gender === 1 ? maleIcon : femaleIcon}
          style={{ maxHeight: "1.5rem" }}
          alt="gender icon"
        />
        <h5>
          {data.Character.Race.Name +
            " / " +
            data.Character.Tribe.Name +
            " / " +
            (data.Character.Gender === 1 ? "Male" : "Female")}
        </h5>
      </li>
      <p>City-state</p>
      <Divider />
      <li>
        <img src={baseUrl + data.Character.Town.Icon} alt="town icon" />
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
        <img
          src={baseUrl + data.Character.GuardianDeity.Icon}
          alt="diety icon"
        />
        <h5>{data.Character.GuardianDeity.Name}</h5>
      </li>
      {data.FreeCompany === null ? null : (
        <>
          <p>Free Company</p>
          <Divider />
          <Banner
            type="free-company"
            avatar={
              <div className="icon--mid relative">
                <img
                  src={data.FreeCompany.Crest[0]}
                  className="icon--mid absolute"
                  alt=""
                />
                <img
                  src={data.FreeCompany.Crest[1]}
                  className="icon--mid absolute"
                  alt=""
                />
                <img
                  src={data.FreeCompany.Crest[2]}
                  className="icon--mid absolute"
                  alt=""
                />
              </div>
            }
            fc={data.FreeCompany.Crest}
            name={data.FreeCompany.Name}
            content={data.FreeCompany.Slogan}
            misc={data.FreeCompany.Server}
          />
        </>
      )}
    </ul>
  );
};

export default Information;
