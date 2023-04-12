import { useFetchData } from "../hooks/useFetchData";
import Item from "./Item";

/**
 * @name Achievement
 * @description The achievement component to be displayed.
 * @param {*} props
 * @returns
 */
const Achievement = (props) => {
  const { name, icon, points, id } = props;
  const { data, loading, ok } = useFetchData(
    "https://xivapi.com/achievement/" + id
  );
  return loading ? null : (
    <li className="achievement">
      <Item
        icon={"https://xivapi.com" + icon}
        name={name}
        type={data.Description}
      />
      <div className="col gap-sm">
        <div className="achievement__header">
          <h4>{name}</h4>
          <p style={{ color: "var(--c-yellow)" }}>
            {data.AchievementCategory.Name}
          </p>
        </div>
        <p>{data.Description}</p>
      </div>
      <h3 style={{ marginLeft: "auto", color: "var(--c-green)" }}>{points}</h3>
    </li>
  );
};

export default Achievement;
