// Hooks
import { useState } from "react";

// Components
import Item from "../components/Item";
import Header from "../components/Header";
import Navigator from "../components/Navigator";
import Loading from "../components/Loading";

// Style
import "../styles/Collection.css";

/**
 * @name Collection
 * @description Collection container for mount and minion items.
 * @param {*} props
 * @returns
 */
const Collection = (props) => {
  const { display, mounts, minions } = props;
  // Will have to manually update these numbers after every patch.
  const totalCollection = 747;
  const capacity = 40;
  const [mountPage, setMountPage] = useState(0);
  const [minionPage, setMinionPage] = useState(0);

  return (
    <div className={"section" + (display ? "" : " disabled")}>
      {mounts === null || minions === null ? (
        <>
          <Header
            name="Collection"
            minor={"0 / " + totalCollection}
            major={(0 / totalCollection) * 100 + " %"}
          />
          <Loading />
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
            <div className="col gap-lg">
              <div className="collection">
                {mounts
                  .slice(mountPage * capacity, (mountPage + 1) * capacity)
                  .map((mount, index) => {
                    return (
                      <Item
                        name={mount.Name}
                        icon={mount.Icon}
                        collectionType={"Mount"}
                        key={index}
                      />
                    );
                  })}
              </div>
              <Navigator
                update={setMountPage}
                current={mountPage}
                min={0}
                max={Math.ceil(mounts.length / capacity) - 1}
                style={{ margin: "auto" }}
              />
            </div>
            <div className="col gap-lg">
              <div className="collection">
                {minions
                  .slice(minionPage * capacity, (minionPage + 1) * capacity)
                  .map((minion, index) => {
                    return (
                      <Item
                        name={minion.Name}
                        icon={minion.Icon}
                        collectionType={"Minion"}
                        key={index}
                      />
                    );
                  })}
              </div>
              <Navigator
                update={setMinionPage}
                current={minionPage}
                min={0}
                max={Math.ceil(minions.length / capacity) - 1}
                style={{ margin: "auto" }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Collection;
