
export function getAppointmentsForDay(state, day) {
  const daySelected = state.days.filter(dayObj => dayObj.name === day);
  if (daySelected.length === 0) {
    return [];
  }
  return daySelected[0].appointments.map(item => state.appointments["" + item]);
}

export function getInterview(state, interviewObj) {
  if (!interviewObj) {
    return null;
  }

  // return {student: interviewObj.student, interviewer: state.interviewers[interviewObj.interviewer]};
  
  const interviewerId = interviewObj.interviewer;
  const interviewerObj = state.interviewers[interviewerId];
  console.log("1st", interviewObj);

  interviewObj.interviewer = interviewerObj;
  interviewObj.hello = "world";
  
  console.log("2nd", interviewObj);

  return interviewObj;

  // return {...interviewObj, interviewer: interviewerObj};
}
