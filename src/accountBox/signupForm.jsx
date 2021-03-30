/* eslint-disable no-undef */

import React, { useCallback, useContext, Component } from "react";
import { BoxContainer, FormContainer, Input, SubmitButton, MutedLink, BoldLink } from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContent";
import { Link, useHistory } from 'react-router-dom';
import app from '../firebaseconfig';



export function SignupForm() {

    const { switchToSignin } = useContext(AccountContext);

  const history = useHistory();
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

    return (
            <BoxContainer>
                <FormContainer onSubmit={handleSignUp}>
                    <Input id="email" name="email" type="email" placeholder="Email" onChange={ event => event.target.value } />
                    <Input id="password" name="password" type="password" placeholder="Password" onChange={ event => event.target.value } />
                    <Marginer direction="vertical" margin={0} />
                    <Marginer direction="vertical" margin="1.6em" />
                    <SubmitButton type="submit">Register</SubmitButton>
                </FormContainer>
                <Marginer direction="vertical" margin="0.2em" />
                <MutedLink href="#">Already have an account? <BoldLink href="#" onClick={switchToSignin}>Signin</BoldLink></MutedLink>
            </BoxContainer>
    );

}
