
import React, { useState, useContext, Component } from "react";
import { BoxContainer, FormContainer, Input, SubmitButton, MutedLink, BoldLink } from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContent";
import 'firebase/auth';
import { useFirebaseApp } from 'reactfire';

export function SignupForm() {

    const { switchToSignin } = useContext(AccountContext);
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        error: '',
    });

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
            error: '',
        })
    };

    const firebase = useFirebaseApp();

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Sign up code here.
        await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then(result => {
            // Update the nickname
            result.user.updateProfile({
              displayName: user.username,
            });
    
            // URL of my website.
            const myURL = { url: 'http://localhost:3000/' }
    
            // Send Email Verification and redirect to my website.
            result.user.sendEmailVerification(myURL)
              .then(() => {
                setUser({
                  ...user,
                  verifyEmail: `Welcome ${user.username}. To continue please verify your email.`,
                })
              })
              .catch(error => {
                setUser({
                  ...user,
                  error: error.message,
                })
              })
    
            // Sign Out the user.
            firebase.auth().signOut();
          }).catch(error => {
            // Update the error
            setUser({
              ...user,
              error: error.message,
            })
          })  
    }

    return (
            <BoxContainer>
                <FormContainer onSubmit={handleSubmit}>
                    <Input name="username" type="text" placeholder="Username" onChange={handleChange} />
                    <Input name="email" type="text" placeholder="Email" onChange={handleChange} />
                    <Input name="password" type="password" placeholder="Password" onChange={handleChange} />
                    <Marginer direction="vertical" margin={0} />
                    <Marginer direction="vertical" margin="1.6em" />
                    <SubmitButton type="submit">Register</SubmitButton>
                </FormContainer>
                {user.error && <h4>{user.error}</h4>}
                <Marginer direction="vertical" margin="0.2em" />
                <MutedLink href="#">Already have an account? <BoldLink href="#" onClick={switchToSignin}>Signin</BoldLink></MutedLink>
            </BoxContainer>
    );

}
