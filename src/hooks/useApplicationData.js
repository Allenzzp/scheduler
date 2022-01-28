import React, { useState, useEffect } from "react";
import axios from "axios";

export default function() {
  //just test oit!
  //this is bad!
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.put(`/api/appointments/${id}`, {interview})
      .then((res) => {
        if (!state.appointments[id].interview) {
          let index = spotsRemaining(id);
          const changeDays = [...state.days];
          changeDays[index].spots--;
          setState(state => ({ ...state, appointments, days: changeDays}));
        } else {
          setState(state => ({...state, appointments}));
        }
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        let index = spotsRemaining(id);
        const changeDays = [...state.days];
        changeDays[index].spots++;
        setState({...state, appointments, days: changeDays});
      });
  }

  const setDay = day => setState({...state, day});
  
  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers")
    ]).then((all) => {
      setState(prev => {
        return {...prev, 
          days: all[0].data, 
          appointments: all[1].data,
          interviewers: all[2].data
        };
      });
    });
  }, []);

  function spotsRemaining(id) {
    let res;
    if (id / 5 <= 1) {
      res = 0;
    } else if (id / 5 <= 2) {
      res = 1;
    }  else if (id / 5 <= 3) {
      res = 2;
    }  else if (id / 5 <= 4) {
      res = 3;
    }  else {
      res = 4;
    }
    return res;
  }

  return {
    state, 
    setDay,
    bookInterview,
    cancelInterview
  };
}