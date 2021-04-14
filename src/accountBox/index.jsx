import React, { useState } from "react";
import styled from "styled-components";
import { LoginForm } from "./loginForm.jsx";
import { SignupForm } from "./signupForm.jsx";
import { ForgotForm } from "./forgotForm.jsx";
import { motion } from "framer-motion";
import { AccountContext } from "./accountContent";

/*Iphone look alike container*/
const BoxContainer = styled.div`
    width: 280px;
    min-height: 550px;
    display: flex;
    flex-direction: column;
    border-radius: 19px;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(15,15,15,0.25);
    position: relative;
    overflow: hidden;
`;

/*container which holds the blob*/
const TopContainer = styled.div`
    width:100%;
    height: 190px;
    display:flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 1.8em;
    padding-bottom: 4em;

`;

/*The blue drop part on the iphone*/
const BackDrop = styled(motion.div)`
    width: 30%;
    height: 300px;
    position: absolute;
    display:flex;
    flex-direction: column;
    border-radius: 50%;
    transform: rotate(60deg);
    top: -335px;
    left: -70px;
    background: rgb(20,182,144);
    background: linear-gradient(
        58deg, 
        rgba(20,182,144,1) 20%, 
        rgba(0,212,255,1) 100%
    );

`;

const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #000;

`;

const HeaderText = styled.h2`
    font-size: 30px;
    font-weight: 600;
    line-height: 1.24;
    color: #fff;
    z-index: 10;
    margin: 0;

`;

const SmallText = styled.h5`
    color: #fff;
    font-weight: 500;
    font-size: 11px;
    z-index: 10;
    margin: 0;
    margin-top: 7px;


`;

const InnerContainer = styled.div`
    width: 100%;
    display:flex;
    flex-direction: column;
    padding: 0 1.8em;

`;

const backdropVariants = {
    expanded: {
        width: "245%",
        height: "1050px",
        borderRadius: "20%",
        transform: "rotate(60deg)",
    },
    collapsed: {
        width: "160%",
        height: "550px",
        borderRadius: "50%",
        transform: "rotate(60deg)",

    },
};

const expandingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 30,
};

const AppContainer = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;



export default function AccountBox(props) {
    const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = useState("signin");

    const playExpandedingAnimation = () => {
        setExpanded(true);
        setTimeout(() => {
            setExpanded(false);
        }, expandingTransition.duration * 1000 - 1500);

    }

    const switchToSignup = () => {
        playExpandedingAnimation();
        setTimeout(() => {
            setActive("signup");
        }, 400);
    }

    const switchToSignin = () => {
        playExpandedingAnimation();
        setTimeout(() => {
            setActive("signin");
        }, 400);
    }

    const switchToForgotPass = () => {
        playExpandedingAnimation();
        setTimeout(() => {
            setActive("forgot");
        }, 400);
    }

    const contextValue = { switchToSignup, switchToSignin, switchToForgotPass };
    return (
        <AppContainer>
            <AccountContext.Provider value={contextValue}>
                <BoxContainer>
                    <TopContainer>
                        <BackDrop
                            initial={false}
                            animate={isExpanded ? "expanded" : "collapsed"}
                            variants={backdropVariants}
                            transition={expandingTransition}
                        />
                        {active === "signin" && <HeaderContainer>
                            <HeaderText>Welcome</HeaderText>
                            <HeaderText>Back</HeaderText>
                            <SmallText>Please sign-in to continue!</SmallText>
                        </HeaderContainer>}
                        {active === "signup" && <HeaderContainer>
                            <HeaderText>Create</HeaderText>
                            <HeaderText>Account</HeaderText>
                            <SmallText>Please sign-up to continue!</SmallText>
                        </HeaderContainer>}
                        {active === "forgot" && <HeaderContainer>
                            <HeaderText>Forgot</HeaderText>
                            <HeaderText>Password?</HeaderText>
                            <SmallText>Please enter the email of the account to reset password!</SmallText>
                        </HeaderContainer>}
                    </TopContainer>
                    <InnerContainer>
                        {active === "signin" && <LoginForm />}
                        {active === "signup" && <SignupForm />}
                        {active === "forgot" && <ForgotForm />}
                    </InnerContainer>
                </BoxContainer>
            </AccountContext.Provider>
        </AppContainer>
    )
}