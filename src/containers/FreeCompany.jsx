import Friends from "../components/Friends";
import Divider from "../components/Divider";
import { ImDiamonds } from "react-icons/im";
import FailToLoad from "../components/FailToLoad";
import "../styles/FreeCompany.css";

const FreeCompany = (props) => {
  const { freeCompany, freeCompanyMembers, display } = props;
  return (
    <div className={"section" + (display ? "" : " disabled")}>
      {freeCompany !== null ? (
        <>
          <div className="banner--free-company">
            <div
              className="relative"
              style={{ minWidth: "5rem", minHeight: "5rem" }}
            >
              <img
                src={freeCompany.Crest[0]}
                className="absolute"
                style={{ maxHeight: "5rem" }}
                alt=""
              />
              <img
                src={freeCompany.Crest[1]}
                className="absolute"
                style={{ maxHeight: "5rem" }}
                alt=""
              />
              <img
                src={freeCompany.Crest[2]}
                className="absolute"
                style={{ maxHeight: "5rem" }}
                alt=""
              />
            </div>
            <div className="col gap-sm">
              <h2>{freeCompany.Name + " [" + freeCompany.Tag + "]"}</h2>
              <div className="banner__server ">
                <ImDiamonds style={{ maxHeight: "1rem", minWidth: "1rem" }} />

                <p>{freeCompany.Server}</p>
              </div>
              <p>{freeCompany.Slogan}</p>
            </div>
          </div>
          <Divider />
          <Friends friends={freeCompanyMembers} />
        </>
      ) : (
        <FailToLoad type="noFreeCompanyError" />
      )}
    </div>
  );
};

export default FreeCompany;
