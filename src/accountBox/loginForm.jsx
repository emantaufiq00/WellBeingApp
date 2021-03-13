
import React, { useContext, useState } from "react";
import { useEasybase } from 'easybase-react';
import { BoxContainer, FormContainer, Input, SubmitButton, MutedLink, BoldLink } from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContent";

export function LoginForm(props) {
    const [usernameValue, setUsernameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const { isUserSignedIn, signIn } = useEasybase();

    const { switchToSignup, switchToSignedIn } = useContext(AccountContext);

    if (isUserSignedIn()) {
        return (
                <BoxContainer>       
                    <SubmitButton onClick={switchToSignedIn}>Proceed</SubmitButton>
                    <Marginer direction="vertical" margin="1em" />
                </BoxContainer>
        )
    } else {
        return (
                <BoxContainer>
                    <FormContainer>
                        <Input type="email" value={usernameValue} placeholder="Email or Username" onChange={e => setUsernameValue(e.target.value)} />
                        <Input type="password" value={passwordValue} placeholder="Password" onChange={e => setPasswordValue(e.target.value)} />
                    </FormContainer>
                    <Marginer direction="vertical" margin={5} />
                    <MutedLink href="#">Forgot your password?</MutedLink>
                    <Marginer direction="vertical" margin="1.6em" />
                    <SubmitButton 
                    onClick={_ => signIn(usernameValue, passwordValue)}>Signin</SubmitButton>
                    <Marginer direction="vertical" margin="1em" />
                    <MutedLink href="#">Don't have an account?<BoldLink href="#" onClick={switchToSignup}>Register</BoldLink></MutedLink>
                </BoxContainer>
        );
    }

}