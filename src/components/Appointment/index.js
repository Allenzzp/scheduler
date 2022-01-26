import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const NO_STUD_ERROR = "NO_STUD_ERROR";
const NO_ITER_ERROR = "NO_ITER_ERROR";

export default function Appointment(props) {
  const {id, time, interview, interviewers, bookInterview, cancelInterview} = props;

  const {mode, transition, back} = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {

    if (name.length === 0) {
      transition(NO_STUD_ERROR);
      return;
    }
    if (!interviewer) {
      transition(NO_ITER_ERROR);
      return;
    }

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(err => {
        console.log(err.message);
        transition(ERROR_SAVE, true);
      });
  }

  function onDelete() {
    transition(CONFIRM);
  }

  function confirmDelete() {

    transition(DELETING, true);

    cancelInterview(id)
      .then((res) => {
          transition(EMPTY);
        })
      .catch(err => {
          console.log(err.message);
          transition(ERROR_DELETE, true);
        });
  }

  function onEdit() {
    transition(EDIT);
  }

  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show 
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}

      {mode === CREATE && 
      <Form
        interviewers={interviewers}
        onCancel={() => back()}
        onSave={save}
      />}

      {mode === SAVING && <Status message={SAVING} />}

      {mode === DELETING && <Status message={DELETING} />}

      {mode === CONFIRM && <Confirm 
        message="Are you sure you would like to delete?" 
        onCancel={() => back()}
        onConfirm={confirmDelete}
      />}

      {mode === EDIT && 
      <Form
        interviewers={interviewers}
        onCancel={() => back()}
        onSave={save}
        student={interview.student}
        interviewer={interview.interviewer.id}
      />}

      {mode === ERROR_SAVE && <Error message="Can not create new appointment!" onClose={() => back()} />}

      {mode === ERROR_DELETE && <Error message="Can not cancel appointment!" onClose={() => back()} />}

      {mode === NO_STUD_ERROR && <Error message="You need to choose a student first!" onClose={() => back()} />}

      {mode === NO_ITER_ERROR && <Error message="You need to choose an interviewer first!" onClose={() => back()} />}
      
    </article>
  );
}