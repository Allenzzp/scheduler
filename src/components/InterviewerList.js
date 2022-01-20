import React from "react";
import InterviewListItem from "./InterviewerListItem";

import "./InterviewerList.scss";

export default function InterviewerList(props) {
  const {interviewers, onChange, value} = props;

  const InterviewerListItems = interviewers.map(interviewerObj => {
    return (
      <InterviewListItem 
        {...interviewerObj} 
        selected={interviewerObj.id === value}
        setInterviewer={() => {
          onChange(interviewerObj.id)}
        }
        key={interviewerObj.id} 
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {InterviewerListItems}
      </ul>
    </section>
  );
}