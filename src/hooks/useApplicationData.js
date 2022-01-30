import { useReducer, useEffect } from "react";
import axios from "axios";

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

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };

    case SET_APPLICATION_DATA:
      const {days, appointments, interviewers} = action;
      return { ...state, days, appointments, interviewers};

    case SET_INTERVIEW: {
      const {id, interview} = action;

      const appointment = {
        ...state.appointments[id],
        interview
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      }
      const index = spotsRemaining(id);
      const changeDays = [...state.days];

      if (!interview) {
        changeDays[index].spots++;
        return {...state, appointments, days: changeDays};
      }
      if (state.appointments[id].interview) {
        return {...state, appointments};
      }
      changeDays[index].spots--;
      return {...state, appointments, days: changeDays};
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function() {
  
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, {interview})
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
  }

  const setDay = day => dispatch({type: SET_DAY, day});
  
  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers")
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data, 
        appointments: all[1].data,
        interviewers: all[2].data
      });
    });
  }, []);

  useEffect(() => {
    const wb = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    // const wb = new WebSocket("ws://scheduler-lhl-al.herokuapp.com/");

    wb.onopen = (event) => {
      wb.send("ping");
    }

    wb.onmessage = (event) => {
      console.log("Message Received: ", event.data);
      const receive = JSON.parse(event.data);
      if (receive.type === SET_INTERVIEW) {
        dispatch({type: receive.type,
          id: receive.id,
          interview: receive.interview
        });
      }
    }

    return () => {wb.close()};
  }, []);

  return {
    state, 
    setDay,
    bookInterview,
    cancelInterview
  };
}