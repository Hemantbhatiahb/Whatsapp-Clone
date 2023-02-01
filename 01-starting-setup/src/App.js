import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import { useState, useContext } from "react";
import { StateContext } from "./store/StateProvider";

function App() {
  const loginCtx = useContext(StateContext);
  return (
    <div className="app">
      {!loginCtx.user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
            <Route path="*">
              <h1>Invalid URL</h1>
            </Route>
          </Switch>
        </div>
      )}
    </div>
  );
}

export default App;
