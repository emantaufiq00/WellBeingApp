import React from "react";
import { useHistory } from 'react-router-dom';
import ButtonAppBar from './navBar.js'
import './Home/homeCSS.css'


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
                <div>
                    <button className="homeButtons" onClick={emailChange}>Update Email</button>
                </div>
            </div>
            <div className="buttonHolder">
                <p className='homeSubHeading'> Update your password </p>
                <div>
                    <button className="homeButtons" onClick={passwordChange}>Update Password</button>
                </div>
            </div>
        </div>
    )



}

export default Settings;