
import React, { useContext, useState } from "react";
import { BoxContainer, FormContainer, Input, SubmitButton, MutedLink, BoldLink } from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContent";
import 'firebase/auth';
import { useFirebaseApp } from 'reactfire';

export function LoginForm() {
    const [user, setUser] = useState({
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

    const handleSubmit = e => {
        e.preventDefault();

        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(result => {
                if (!result.user.emailVerified) {
                    setUser({
                        ...user,
                        error: 'Please verify your email before you can continue',
                    })
                    firebase.auth().signOut();
                }
            })
            .catch(error => {
                setUser({
                    ...user,
                    error: error.message,
                })
            })
    }

    const { switchToSignup } = useContext(AccountContext);

    return (
            <BoxContainer>
                <FormContainer onSubmit={handleSubmit}>
                    <Input name="username" type="email" placeholder="Email" onChange={handleChange} />
                    <Input name="password" type="password" placeholder="Password" onChange={handleChange} />
                    <Marginer direction="vertical" margin="1.6em" />
                    <SubmitButton type="submit">Signin</SubmitButton>
                </FormContainer>
                <Marginer direction="vertical" margin={5} />
                <MutedLink href="#">Forgot your password?</MutedLink>        
                <Marginer direction="vertical" margin="1em" />
                <MutedLink href="#">Don't have an account?<BoldLink href="#" onClick={switchToSignup}>Register</BoldLink></MutedLink>
            </BoxContainer>
    );

}