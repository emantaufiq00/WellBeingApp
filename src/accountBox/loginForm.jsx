
import React, { useContext } from "react";
import { BoxContainer, FormContainer, Input, SubmitButton, MutedLink, BoldLink } from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContent";

export function LoginForm(props) {
    const { switchToSignup } = useContext(AccountContext);
    return (
        <BoxContainer>
            <FormContainer>
                <Input type="email" placeholder="Email or Username" />
                <Input type="password" placeholder="Password" />
            </FormContainer>
            <Marginer direction="vertical" margin={5} />
            <MutedLink href="#">Forgot your password?</MutedLink>
            <Marginer direction="vertical" margin="1.6em" />
            <SubmitButton type="submit">Signin</SubmitButton>
            <Marginer direction="vertical" margin="1em" />
            <MutedLink href="#">Don't have an account?<BoldLink href="#" onClick={switchToSignup}>Register</BoldLink></MutedLink>
        </BoxContainer>
    );

}