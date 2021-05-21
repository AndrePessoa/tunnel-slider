import { useReducer } from "react";

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      //   "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

const initialState = {
  loading: false,
  result: "",
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "init":
      return { ...state, loading: true, result: "", error: "" };
    case "success":
      return { ...state, loading: false, result: action.payload, error: "" };
    case "error":
      return { ...state, loading: false, result: "", error: action.payload };
    default:
      throw new Error();
  }
}

function useApi(url) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const post = (data) => {
    dispatch({ type: "init" });
    postData(url, data)
      .then((result) => dispatch({ type: "success", payload: result }))
      .catch((error) => dispatch({ type: "error", payload: error.message }));
  };

  return {
    loading: state.loading,
    result: state.result,
    post,
    error: state.error,
  };
}
export default useApi;
