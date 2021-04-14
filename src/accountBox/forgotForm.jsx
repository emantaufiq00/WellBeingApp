import React, { useContext } from "react";
import { BoxContainer, FormContainer, Input, SubmitButton, MutedLink, BoldLink } from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContent";
import app from '../firebaseconfig'



export function ForgotForm(props) {

    const { switchToSignin } = useContext(AccountContext);

    const handleResetPass = (e) => {
        e.preventDefault();
        const { email } = e.target.elements;
        app.auth().sendPasswordResetEmail(email.value).then(
            function() {
                alert("Please check your email for a link to reset your password")
            }, (error) => {
                alert(error.message);
            }
        );
    }

    return (
        <BoxContainer>
            <FormContainer onSubmit={handleResetPass}>
                <Input id="email" name="email" type="email" placeholder="Email" onChange={event => event.target.value} required />

                <Marginer direction="vertical" margin="1em" />
                <SubmitButton type="submit" >Login</SubmitButton>
            </FormContainer>

            <Marginer direction="vertical" margin="1em" />
            <BoldLink href="#" onClick={switchToSignin}>Go back</BoldLink>
        </BoxContainer>
    );

}