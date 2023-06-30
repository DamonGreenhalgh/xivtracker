// Hooks
import { useState, useEffect, useRef } from "react";

// Data
import featureJSON from "../data/feature.json";

// Assets
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import {
  endwalkerBanner,
  hatchingTide22Banner,
  littleLadiesDay22Banner,
  moogleTreasureTrove22Banner,
  newfoundAdventureBanner,
  buriedMemoryBanner,
  godsRevelLandsTrembleBanner,
  hatchingTide23Banner,
  theDarkThroneBanner,
} from "../images/featured";

// Styles
import "../styles/Featured.css";

const banner = [
  endwalkerBanner,
  newfoundAdventureBanner,
  littleLadiesDay22Banner,
  moogleTreasureTrove22Banner,
  hatchingTide22Banner,
  buriedMemoryBanner,
  godsRevelLandsTrembleBanner,
  hatchingTide23Banner,
  theDarkThroneBanner,
];

const Featured = () => {
  const backgroundContainer = useRef(null);
  const [index, setIndex] = useState(0);
  const [events, setEvents] = useState(Object.values(featureJSON));
  const [banners, setBanners] = useState(null);

  // Mount
  useEffect(() => {
    let startDate, endDate;
    const currentDate = new Date().getTime();
    let liveEvents = [];
    let liveBanners = [];
    const event = Object.values(featureJSON);
    for (let i = event.length - 1; i > -1; i--) {
      startDate = new Date(
        event[i].start[0],
        event[i].start[1],
        event[i].start[2]
      ).getTime();
      endDate = new Date(
        event[i].end[0],
        event[i].end[1],
        event[i].end[2]
      ).getTime();
      if (startDate <= currentDate && currentDate <= endDate) {
        liveEvents.push(event[i]);
        liveBanners.push(<img src={banner[i]} key={i} alt="event banner" />);
      }
    }
    setEvents(liveEvents);
    setBanners(liveBanners);
    const interval = setInterval(
      () => setIndex((index) => (index + 1) % liveEvents.length),
      3000
    );
    return () => clearInterval(interval);
  }, []);

  // Update
  useEffect(() => {
    backgroundContainer.current.style.transform =
      "translateX(-" + 100 * index + "%)";
  }, [index]);

  return (
    <div className="featured">
      <div className="featured__overlay">
        <button
          className="arrow arrow--left"
          onClick={() =>
            setIndex((index) => (index - 1 < 0 ? events.length - 1 : index - 1))
          }
        >
          <FaChevronLeft />
        </button>
        <a href={events[index].link} target="_blank" rel="noreferrer">
          {" "}
        </a>
        <h4
          style={{
            backgroundColor:
              events[index].type === "EVENT"
                ? "var(--c-purple)"
                : events[index].type === "PATCH"
                ? "var(--c-green)"
                : "var(--c-yellow)",
          }}
        >
          {events[index].type}
        </h4>
        <div className="featured__titles">
          <p style={{ color: "#d9dfe4" }}>{events[index].date}</p>
          <h2 style={{ color: "#f3f5f7" }}>{events[index].title}</h2>
        </div>
        <button
          className="arrow arrow--right"
          onClick={() => setIndex((index) => (index + 1) % events.length)}
        >
          <FaChevronRight />
        </button>
      </div>
      <div className="featured__banners" ref={backgroundContainer}>
        {banners}
      </div>
    </div>
  );
};

export default Featured;
