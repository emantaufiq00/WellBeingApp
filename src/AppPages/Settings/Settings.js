import React from "react";
import { useHistory } from 'react-router-dom';
import ButtonAppBar from '../navBar.js'
import '../Home/homeCSS.css'
import email from '../images/email.svg'
import lock from '../images/padlock.svg'


function Settings() {

    const history = useHistory();

    const passwordChange = () => {
        history.push('/changepass');
    }

    const emailChange = () => {
        history.push('/changeemail')
    }


    return (
        <div>
            <ButtonAppBar />
            <h3 className='fithead'> Settings </h3>
            <div className="buttonHolder">
                <p className='homeSubHeading'> Update your email </p>


                <button className="lockButton" onClick={emailChange}>
                    <img className="lockIcon" src={email} alt="email Button" />
                    Update Email</button>

            </div>
            <div className="buttonHolder">
                <p className='homeSubHeading'> Update your password </p>

                <button className="lockButton" onClick={passwordChange}>
                    <img className="lockIcon" src={lock} alt="lock Button" />
                    Update Password
                </button>

            </div>
        </div>
    )



}

export default Settings;