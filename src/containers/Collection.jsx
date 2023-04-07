// Hooks
import { useEffect, useState } from "react";

// Components
import Item from "../components/Item";
import CompletionMetric from "../components/CompletionMetric";
import Button from "../components/Button";
import FailToLoad from "../components/FailToLoad";
import Divider from "../components/Divider";

// Style
import "../styles/Collection.css";
import { FaHorseHead, FaCat, FaSearch } from "react-icons/fa";

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
          <h2>Collection</h2>
          <FailToLoad />
        </>
      ) : (
        <>
          <div className="row justify-between">
            <h2>Collection</h2>
            <CompletionMetric
              numerator={mounts.length + minions.length}
              denominator={totalCollection}
            />
          </div>
          <Divider />
          <div className="collection__content">
            <div className="row gap align-center">
              <Button
                content={<FaHorseHead className="character__icon" />}
                title="Mounts"
                condition={tabIndex === 0}
                onClick={() => setTabIndex(0)}
              />
              <Button
                content={<FaCat className="character__icon" />}
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
              <FaSearch className="character__icon" />
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
