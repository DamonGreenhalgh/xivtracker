import "../styles/Friends.css";
import FailToLoad from "./FailToLoad";
import MiniBanner from "./MiniBanner";
const Friends = (props) => {
  const { friends } = props;
  return friends.length === 0 ? (
    <FailToLoad type="noFriendsError" />
  ) : (
    <>
      <div className="banner--mini-container">
        {friends.map((friend) => (
          <MiniBanner character={friend} key={friend.ID} />
        ))}{" "}
      </div>
    </>
  );
};

export default Friends;
