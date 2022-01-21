import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import "./styles.scss";

export default function Appointment(props) {
  const {time, interview} = props;
  return (
    <article className="appointment">
      <Header time={time}/>
      {props.interview ? <Show {...interview} /> : <Empty />}
    </article>
  );
}