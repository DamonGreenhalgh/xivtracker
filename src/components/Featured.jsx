// Hooks
import { useState, useEffect, useRef } from "react";

// Data
import featureJSON from "../data/feature.json";

// Assets
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import endwalkerBanner from "../images/featured/endwalker.png";
import newfoundAdventureBanner from "../images/featured/newfound-adventure.png";
import littleLadiesDayBanner from "../images/featured/little-ladies-day.png";
import moogleTreasureTroveBanner from "../images/featured/moogle-treasure-trove.png";
import hatchingTideBanner from "../images/featured/hatching-tide.png";

// Styles
import "../styles/Featured.css";

const banner = [
  endwalkerBanner,
  newfoundAdventureBanner,
  littleLadiesDayBanner,
  moogleTreasureTroveBanner,
  hatchingTideBanner,
];

const Featured = () => {
  const backgroundContainer = useRef(null);
  const [index, setIndex] = useState(0);
  const [events, setEvents] = useState(Object.values(featureJSON));
  const [banners, setBanners] = useState(null);
  const [autoScroll, setAutoScroll] = useState(null);

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
    setAutoScroll(
      setInterval(
        () => setIndex((index) => (index + 1) % liveBanners.length),
        3000
      )
    );
    return () => clearInterval(autoScroll);
  }, []);

  // Update
  useEffect(() => {
    backgroundContainer.current.style.transform =
      "translate(-" + index * 30 + "rem, 0)";
  }, [index]);

  return (
    <div className="featured">
      <div className="featured__overlay">
        <button
          className="arrow arrow--left"
          onClick={() => {
            setIndex((index) => Math.max(0, index - 1));
            clearInterval(autoScroll);
          }}
        >
          <FaChevronLeft />
        </button>
        <a href={events[index].link} target="_blank" rel="noreferrer">
          {" "}
        </a>
        <div
          className="col absolute"
          style={{
            bottom: "1rem",
            left: "1rem",
          }}
        >
          <p style={{ color: "#d9dfe4" }}>{events[index].date}</p>
          <h2 style={{ color: "#f3f5f7" }}>{events[index].title}</h2>
        </div>
        <button
          className="arrow arrow--right"
          onClick={() => {
            setIndex((index) => Math.min(index + 1, events.length - 1));
            clearInterval(autoScroll);
          }}
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
