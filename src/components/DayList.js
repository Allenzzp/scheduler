import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const {days, value, onChange} = props;
  
  const dayListWid = days.map(dayObj => {
    return <DayListItem 
      key={dayObj.id} 
      {...dayObj} 
      setDay={onChange} 
      selected={value===dayObj.name} />
  });
  return (
    <ul>
      {dayListWid}
    </ul>
  );
}