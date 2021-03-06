import React, {Fragment} from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment/index";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";


storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

storiesOf("DayListItem", module)
  .addParameters({
    backgrounds: [{name: "dark", value: "#222f3e", default: true}]
  })
  .add("Unselected", () => {
    return <DayListItem name="Monday" spots={5} />
  })
  .add("Selected", () => {
    return <DayListItem name="Monday" spots={5} selected />
  })
  .add("Full", () => {
    return <DayListItem name="Monday" spots={0} />
  })
  .add("Clickable", () => {
    return <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} />
  });

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0
  }
];

storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{name: "dark", value: "#ffc0cb", default: true}]
  })
  .add("Monday", () => {
    return <DayList days={days} value={"Monday"} onChange={action("setDay")} />
  })
  .add("Tuesday", () => {
    return <DayList days={days} value={"Tuesday"} onChange={action("setDay")} />
  })
  .add("Wednesday", () => {
    return <DayList days={days} value={"Wednesday"} onChange={action("setDay")} />
  });

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{name: "dark", value: "#222f3e", default: true}]
  })
  .add("Unselected", () => {
    return <InterviewListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  })
  .add("Selected", () => {
    return <InterviewListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  })
  .add("Clickable", () => {
    return <InterviewListItem
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={
        () => {
          action("setInterviewer")(interviewer.id)
        }
      }
    />
  });

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{name: "dark", value: "#ffc0cb", default: true}]
  })
  .add("Initial", () => {
    return <InterviewerList interviewers={interviewers} />;
  })
  .add("Selected", () => {
    return <InterviewerList interviewers={interviewers} interviewer={2} />
  })
  .add("Clickable", () => {
    return <InterviewerList 
      interviewers={interviewers} 
      onChange={action("setInterviewer")} 
    />
  });

storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{name: "white", value: "#fff", default: true}]
  })
  .add("Appointment", () => {
    return <Appointment />
  })
  .add("Appointment with Time", () => {
    return <Appointment time="12pm" />
  })
  .add("Header", () => {
    return <Header time="12pm" />;
  })
  .add("Empty", () => {
    return <Empty onAdd={action("onAdd")} />;
  })
  .add("Show", () => {
    return <Show 
      onEdit={action("onEdit")}
      onDelete={action("onDelete")}
      student="Allen"
      interviewer={interviewers[0]}
    />
  })
  .add("Confirm", () => {
    return <Confirm 
      message="Delete the appointment?"
      onConfirm={action("onConfirmed")}
      onCancel={action("onCancel")}
    />
  })
  .add("Status", () => (
    <Status message="Deleting" />
  ))
  .add("Error", () => (
    <Error 
      message="Could not delete appointment."
      onClose={action("onClose")}
    />
  ))
  .add("Edit", () => {
    return <Form 
      student="Allen"
      interviewer={2}
      interviewer={interviewers}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />
  })
  .add("Create", () => {
    return <Form 
      interviewers={interviewers}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />
  })
  .add("Appointment Empty", () => {
    return <Fragment>
      <Appointment id={1} time="4pm" />
      <Appointment time="5pm" />
    </Fragment>
  })
  .add("Appointment Booked", () => {
    return <Fragment>
      <Appointment
        id={1}
        time="4pm"
        interview={
          {student: "Allen", interviewer}
        }
      />
      <Appointment time="5pm" />
    </Fragment>
  })
