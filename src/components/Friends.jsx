import "../styles/Friends.css";
import FailToLoad from "./FailToLoad";
import MiniBanner from "./MiniBanner";
const Friends = (props) => {
  const { friends, display } = props;
  return friends.length === 0 && display ? (
    <FailToLoad type="noFriendsError" />
  ) : (
    <div className={"banner--mini-container" + (display ? "" : " disabled")}>
      {friends.map((friend) => (
        <MiniBanner character={friend} key={friend.ID} />
      ))}{" "}
    </div>
  );
};

export default Friends;
