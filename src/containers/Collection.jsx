// Hooks
import { useEffect, useState } from "react";

// Components
import Item from "../components/Item";
import Header from "../components/Header";

// Style
import "../styles/Collection.css";
import FailToLoad from "../components/FailToLoad";
import Button from "../components/Button";
import { FaHorseHead, FaCat, FaSearch } from "react-icons/fa";

const iconSize = "1em";
/**
 * @name Collection
 * @description Collection container for mount and minion items.
 * @param {*} props
 * @returns
 */
const Collection = (props) => {
  const { display, mounts, minions } = props;
  // Will have to manually update these numbers after every patch.
  const totalCollection = 248 + 465;
  const [tabIndex, setTabIndex] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [displayedMounts, setDisplayedMounts] = useState([]);
  const [displayedMinions, setDisplayedMinions] = useState([]);

  useEffect(() => {
    setDisplayedMounts(
      mounts.map((mount, index) =>
        mount.Name.toLowerCase().includes(searchInput) ? (
          <Item
            name={mount.Name}
            icon={mount.Icon}
            collectionType={"Mount"}
            key={index}
          />
        ) : null
      )
    );
    setDisplayedMinions(
      minions.map((minion, index) =>
        minion.Name.toLowerCase().includes(searchInput) ? (
          <Item
            name={minion.Name}
            icon={minion.Icon}
            collectionType={"Minion"}
            key={index}
          />
        ) : null
      )
    );
  }, [searchInput]);

  return (
    <div className={"section" + (display ? "" : " disabled")}>
      {mounts === null || minions === null ? (
        <>
          <Header
            name="Collection"
            minor={"0 / " + totalCollection}
            major={(0 / totalCollection) * 100 + " %"}
          />
          <FailToLoad />
        </>
      ) : (
        <>
          <Header
            name="Collection"
            minor={
              Math.round(mounts.length + minions.length) +
              " / " +
              totalCollection
            }
            major={
              Math.round(
                ((mounts.length + minions.length) / totalCollection) * 100
              ) + " %"
            }
          />
          <div className="collection__content">
            <div className="row gap align-center">
              <Button
                content={<FaHorseHead size={iconSize} />}
                title="Mounts"
                condition={tabIndex === 0}
                onClick={() => setTabIndex(0)}
              />
              <Button
                content={<FaCat size={iconSize} />}
                title="Minions"
                condition={tabIndex === 1}
                onClick={() => setTabIndex(1)}
              />
              <input
                type="text"
                placeholder="Search"
                className="collection__searchbar"
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <FaSearch size={iconSize} />
            </div>
            <div className={"collection" + (tabIndex === 0 ? "" : " disabled")}>
              {displayedMounts}
            </div>
            <div className={"collection" + (tabIndex === 1 ? "" : " disabled")}>
              {displayedMinions}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Collection;
