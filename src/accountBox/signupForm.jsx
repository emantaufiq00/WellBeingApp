
import React, { useContext } from "react";
import { BoxContainer, FormContainer, Input, SubmitButton, MutedLink, BoldLink } from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContent";

export function SignupForm(props) {
    const { switchToSignin } = useContext(AccountContext);
    return (
        <BoxContainer>
            <FormContainer>
                <Input type="text" placeholder="Full Name" />
                <Input type="password" placeholder="Password" />
                <Input type="text" placeholder="Username" />
                <Input type="email" placeholder="Email" />
                <Input type="text" placeholder="Employee ID" />
                <Input type="text" placeholder="Department" />

            </FormContainer>
            <Marginer direction="vertical" margin={0} />
            <Marginer direction="vertical" margin="1.6em" />
            <SubmitButton type="submit">Register</SubmitButton>
            <Marginer direction="vertical" margin="0.2em" />
            <MutedLink href="#">Already have an account? <BoldLink href="#" onClick={switchToSignin}>Signin</BoldLink></MutedLink>
        </BoxContainer>
    );

}