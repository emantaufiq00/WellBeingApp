/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import React, { useContext, useCallback } from "react";
import { BoxContainer, FormContainer, Input, SubmitButton, MutedLink, BoldLink } from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContent";
import { Redirect } from "react-router";
import app from "../firebaseconfig.jsx";
import { AuthContext } from "../Authentication.js";



export function LoginForm({ history }) {

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      console.log(email)
      console.log(password)
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        if (!Array.isArray(history)) {
          history = [];
        }
        history.push('/');;
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { switchToSignup, switchToForgotPass } = useContext(AccountContext);
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }



  return (
    <BoxContainer>
      <FormContainer onSubmit={handleLogin}>
        <Input id="email" name="email" type="email" placeholder="Email" onChange={event => event.target.value} />
        <Input id="password" name="password" type="password" placeholder="Password" onChange={event => event.target.value} />
        <Marginer direction="vertical" margin={10} />
        <MutedLink href="#" onClick={switchToForgotPass}>Forgot your password?</MutedLink>
        <Marginer direction="vertical" margin="1em" />
        <SubmitButton type="submit" >Login</SubmitButton>
      </FormContainer>

      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">Don't have an account?<BoldLink href="#" onClick={switchToSignup}>Register</BoldLink></MutedLink>
    </BoxContainer>
  );

}