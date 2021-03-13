
import React, { useContext, useState } from "react";
import { useEasybase } from 'easybase-react';
import { BoxContainer, FormContainer, Input, SubmitButton, MutedLink, BoldLink } from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContent";

export function SignupForm(props) {
    const [usernameValue, setUsernameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const { signUp } = useEasybase();
    const { switchToSignin } = useContext(AccountContext);
    
    return (
            <BoxContainer>
                <FormContainer>
                    <Input type="text" placeholder="Full Name" />
                    <Input type="password" value={passwordValue} placeholder="Password" onChange={e => setPasswordValue(e.target.value)} />
                    <Input type="text" value={usernameValue} placeholder="Username" onChange={e => setUsernameValue(e.target.value)} />
                    <Input type="email" placeholder="Email" />
                    <Input type="text" placeholder="Employee ID" />
                    <Input type="text" placeholder="Department" /> 
                </FormContainer>
                <Marginer direction="vertical" margin={0} />
                <Marginer direction="vertical" margin="1.6em" />
                <SubmitButton onClick={_ => signUp(usernameValue, passwordValue)}>Register</SubmitButton>
                <Marginer direction="vertical" margin="0.2em" />
                <MutedLink href="#">Already have an account? <BoldLink href="#" onClick={switchToSignin}>Signin</BoldLink></MutedLink>
            </BoxContainer>
    );

}