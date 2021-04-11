
import React from "react";
import { useHistory } from 'react-router-dom';
import ButtonAppBar from '../navBar.js'
import './homeCSS.css'
import nutritionIcon from '../images/nutritionPicture.png'
import fitnessIcon from '../images/fitnessPicture.png'
import moodIcon from '../images/moodPicture.png'

function MainSummary() {

    const history = useHistory();

    const nutritionChange = () => {
        history.push('/nutrition');
    }

    const moodChange = () => {
        history.push('/mood');
    }

    const fitnessChange = () => {
        history.push('/fitness');
    }

    return (
        <div>
            <ButtonAppBar />
            <h3 className='fithead'> Home </h3>
            <div className="buttonHolder">
                <p className='homeSubHeading'> Update your stats to keep on track... </p>
                <div>
                    <img className="iconSize"
                        src={nutritionIcon}
                        alt='Icon'
                    />
                    <button className="homeButtons" onClick={nutritionChange}>Nutrition</button>
                </div>
                <div>
                    <img className="iconSize"
                        src={fitnessIcon}
                        alt='Icon'
                    />
                    <button className="homeButtons" onClick={fitnessChange}>Fitness</button>
                </div>
                <div>
                    <img className="iconSize"
                        src={moodIcon}
                        alt='Icon'
                    />
                    <button className="homeButtons" onClick={moodChange}>Mood</button>
                </div>
            </div>
        </div>
    )



}

export default MainSummary;