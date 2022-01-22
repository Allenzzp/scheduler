
export function getAppointmentsForDay(state, day) {
  const daySelected = state.days.filter(dayObj => dayObj.name === day);
  if (daySelected.length === 0) {
    return [];
  }
  return daySelected[0].appointments.map(item => state.appointments[item]);
}

export function getInterview(state, interviewObj) {
  if (!interviewObj) {
    return null;
  }
  return {student: interviewObj.student, interviewer: state.interviewers[interviewObj.interviewer]};
  // if(typeof interviewObj.interviewer === "object") {
  //   return interviewObj;
  // }
  
  // interviewObj.interviewer = state.interviewers[interviewObj.interviewer];
  
  // return interviewObj;
}

export function getInterviewersForDay(state, day) {
  const daySelected = state.days.filter(dayObj => dayObj.name === day);

  if (daySelected.length === 0) {
    return [];
  }
  return daySelected[0].interviewers.map(item => state.interviewers[item]);
}
