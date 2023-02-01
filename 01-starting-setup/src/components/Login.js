import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { StateContext } from "../store/StateProvider";
import { useContext } from "react";

function Login() {
  const loginCtx = useContext(StateContext);

  const signInHandler = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        loginCtx.login(result.user);
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/225px-WhatsApp.svg.png"
          alt=""
        />

        <div className="login__text">
          <h1>Sign in to whatsapp</h1>
        </div>

        <Button onClick={signInHandler}> Sign In With Google</Button>
      </div>
    </div>
  );
}

export default Login;
