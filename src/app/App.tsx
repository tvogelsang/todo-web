import { useState } from "react";

import { getCookie } from "./logic/Cookie";

import Login from "./views/login/Login";
import Todo from "./views/todo/Todo";

const App = () => {
  const [authToken, setAuthToken] = useState(getCookie());

  if (authToken) {
    return <Todo />;
  }

  return <Login handleLoggedIn={(value: string) => setAuthToken(value)} />;
};

export default App;
