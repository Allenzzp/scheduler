
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
  const interviewerId = interviewObj.interviewer + "";
  const interviewerObj = state.interviewers[interviewerId];
  interviewObj.interviewer = interviewerObj;
  return interviewObj;
}
