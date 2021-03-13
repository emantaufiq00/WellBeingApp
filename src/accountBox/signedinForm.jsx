import React, { useContext } from "react";
import { useEasybase } from 'easybase-react';
import { BoxContainer, SubmitButton } from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContent";



export function SignedInForm(props) {
    const { isUserSignedIn, signOut } = useEasybase();
    const { switchToSignin } = useContext(AccountContext);

    if (isUserSignedIn()) {
    return (
            <BoxContainer>
                <SubmitButton onClick={signOut}>Sign Out</SubmitButton>
                <Marginer direction="vertical" margin="1em" />
            </BoxContainer>
    );
    } else {
        return (
        <BoxContainer>
            <p>You have signed out</p>
                <SubmitButton onClick={switchToSignin}>Go Back</SubmitButton>
                <Marginer direction="vertical" margin="1em" />
            </BoxContainer>
        );
    }

}