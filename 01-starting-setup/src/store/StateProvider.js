import { createContext, useState } from "react";

export const StateContext = createContext({
  user: null,
  login: (user) => {},
});

const StateProvider = (props) => {
  const [user, setUser] = useState(null);

  const loginHandler = (userDetails) => {
    setUser(userDetails);
  };
  return (
    <StateContext.Provider value={{ user: user, login: loginHandler }}>
      {props.children}
    </StateContext.Provider>
  );
};

export default StateProvider ;