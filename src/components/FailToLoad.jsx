// Style
import "../styles/FailToLoad.css";
import cactuarSticker from "../images/cac.png";

const message = {
  noMountsMinionsError: (
    <p>
      Hmmm, looks like this character does not have any mounts or minions in
      their possession.
    </p>
  ),
  achievementsPrivateError: (
    <p>
      Oops! XIV Tracker was unable to retrieve information for this character.
      This could be because achievements are private on this character. If this
      is your character, you can change these settings{" "}
      <a
        href="https://na.finalfantasyxiv.com/lodestone/my/setting/account/"
        style={{ textDecoration: "underline" }}
      >
        here.
      </a>
      .
    </p>
  ),
  noFreeCompanyError: (
    <p>Hmmm, looks like this character is not part of any Free Company.</p>
  ),
  noFriendsError: (
    <p>
      Hmmm, looks like this character does not have any friends added or friends
      are private. If this is your character be sure to make friends publicly
      available. You can do so{" "}
      <a
        href="https://na.finalfantasyxiv.com/lodestone/my/setting/account/"
        style={{ textDecoration: "underline" }}
      >
        here.
      </a>
    </p>
  ),
};
const FailToLoad = (props) => {
  const { type } = props;
  return (
    <div className="failtoload">
      <img src={cactuarSticker} style={{ maxHeight: "5rem" }} />
      {message[type]}
    </div>
  );
};

export default FailToLoad;
