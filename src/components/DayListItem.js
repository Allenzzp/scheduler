import React from "react";
import "./DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const {name, spots, selected, setDay} = props;
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  })
  const formatSpots = (spots) => {
    let res = "";
    if (spots === 0) {
      res = "no spots remaining";
    } else if (spots === 1) {
      res = "1 spot remaining";
    } else {
      res = `${spots} spots remaining`
    }
    return res;
  };
  
  return (
    <li onClick={() => {setDay(name)}}
        className={dayClass}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}