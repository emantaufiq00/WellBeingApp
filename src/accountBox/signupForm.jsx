import React, { useCallback, useContext } from "react";
import { BoxContainer, FormContainer, Input, SubmitButton, MutedLink, BoldLink } from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContent";
import { useHistory } from 'react-router-dom';
import app from '../firebaseconfig';
import FirebaseService from '../firebaseservice';
let keys = [];
let ids = [];
async function createUserData(user, id) {
  FirebaseService.createUser(user, id)
}

 

export function SignupForm() {

  const getIDs = () => {
    ids = [];
    keys = [];  
    const getKeys =  (items) => {
     console.log(items);
     items.forEach(item => {
       keys.push(item.key);
     })   
   }
 
   const getID = (item) => {
     console.log(item);
     let data = item.val();
     console.log(data.EmpID)
     ids.push(data.EmpID);
   }
 
   FirebaseService.getUsers().on("value", getKeys);
   let i;
   for (i = 0; i < keys.length; i++) {
     FirebaseService.getInfo(keys[i]).on("value", getID)
   }
   console.log(keys);
   console.log(ids)
  }

 getIDs();

  const { switchToSignin } = useContext(AccountContext);

  console.log(ids);
 

  const history = useHistory();
  const handleSignUp = useCallback(async (event, flag) => {
    flag = false;
    event.preventDefault();
    const { firstname, lastname, email, password, empid, department } = event.target.elements;
    try {
      let i;
      for (i = 0; i < ids.length; i++) {
        if (empid.value === ids[i]) {
          flag = true;
        }
      }
      if (flag === false) {
        const userAuth = await app.auth().createUserWithEmailAndPassword(email.value, password.value);
        console.log(userAuth);
        
          const user = {
            FirstName: firstname.value,
            LastName: lastname.value,
            Email: userAuth.user.email,
            EmpID: empid.value,
            EmpDept: department.value,
            Password: password.value
          }
          console.log(user.FirstName)
          console.log(user.LastName)
          console.log(user.Email)
          console.log(user.EmpID)
          console.log(user.EmpDept)
          createUserData(user, userAuth.user.uid)
          history.push('/');
      } else {
        alert("There is currently an employee with that selected ID");
      }
    } catch (error) {
      alert(error);
    }
  }, [history]);

    return (
      <BoxContainer>
        <FormContainer onSubmit={handleSignUp}>
          <Input id="firstname" name="firstname" type="text" placeholder="First Name" onChange={event => event.target.value} required />
          <Input id="lastname" name="lastname" type="text" placeholder="Last Name" onChange={event => event.target.value} required />
          <Input id="email" name="email" type="email" placeholder="Email" onChange={event => event.target.value} required />
          <Input id="password" name="password" type="password" placeholder="Password" onChange={event => event.target.value} required />
          <Input id="empid" name="empid" type="text" placeholder="FDM Employee ID" onChange={event => event.target.value} required />
          <Input id="department" name="department" type="text" placeholder="Department" onChange={event => event.target.value} required />

          <Marginer direction="vertical" margin={0} />
          <Marginer direction="vertical" margin="1.6em" />
          <SubmitButton type="submit">Register</SubmitButton>
        </FormContainer>
        <Marginer direction="vertical" margin="0.2em" />
        <MutedLink href="#">Already have an account? <BoldLink href="#" onClick={switchToSignin}>SignIn</BoldLink></MutedLink>
      </BoxContainer>
    );
  }
