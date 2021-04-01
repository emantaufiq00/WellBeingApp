import React, { useContext } from "react";
import { BoxContainer, SubmitButton } from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContent";
import { Router, Link } from 'react-router-dom';



export function SignedInForm(props) {

    const { isUserSignedIn, signOut } = useEasybase();
    const { switchToSignin } = useContext(AccountContext);

    if (isUserSignedIn()) {
        return (
            <BoxContainer>
                <Router>
                    <Link to="../nutrition.js">Go</Link>
                </Router>
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