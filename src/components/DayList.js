import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const {days, day, setDay} = props;
  const dayListWid = days.map(dayObj => {
    return <DayListItem key={dayObj.id} {...dayObj} setDay={setDay} selected={day===dayObj.name}/>
  });
  return (
    <ul>
      {dayListWid}
    </ul>
  );
}