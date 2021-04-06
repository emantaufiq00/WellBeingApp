import React, { useCallback, useContext } from "react";
import { BoxContainer, FormContainer, Input, SubmitButton, MutedLink, BoldLink } from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContent";
import { Link, useHistory } from 'react-router-dom';
import app from '../firebaseconfig';
import FirebaseService from '../firebaseservice';

async function createUserData(user, id) {
  FirebaseService.createUser(user, id)
}

export function SignupForm() {

  const { switchToSignin } = useContext(AccountContext);

  const history = useHistory();
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { firstname, lastname, email, password, empid, department } = event.target.elements;
    try {
      const userAuth = await app.auth().createUserWithEmailAndPassword(email.value, password.value);
      console.log(userAuth);
      const user = {
        FirstName: firstname.value,
        LastName: lastname.value,
        Email: userAuth.user.email,
        EmpID: empid.value,
        EmpDept: department.value
      }
      console.log(user.FirstName)
      console.log(user.LastName)
      console.log(user.Email)
      console.log(user.EmpID)
      console.log(user.EmpDept)
      createUserData(user, userAuth.user.uid)
      history.push('/');
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleSignUp}>
        <Input id="firstname" name="firstname" type="text" placeholder="First Name" onChange={event => event.target.value} />
        <Input id="lastname" name="lastname" type="text" placeholder="Last Name" onChange={event => event.target.value} />
        <Input id="email" name="email" type="email" placeholder="Email" onChange={event => event.target.value} />
        <Input id="password" name="password" type="password" placeholder="Password" onChange={event => event.target.value} />
        <Input id="empid" name="empid" type="text" placeholder="FDM Employee ID" onChange={event => event.target.value} />
        <Input id="department" name="department" type="text" placeholder="Department" onChange={event => event.target.value} />

        <Marginer direction="vertical" margin={0} />
        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton type="submit">Register</SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin="0.2em" />
      <MutedLink href="#">Already have an account? <BoldLink href="#" onClick={switchToSignin}>Signin</BoldLink></MutedLink>
    </BoxContainer>
  );

}
