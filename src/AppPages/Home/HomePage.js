
import React from "react";
import { useHistory } from 'react-router-dom';
import ButtonAppBar from '../navBar.js'
import './homeCSS.css'
import nutritionIcon from '../images/nutritionIcon.svg'
import fitnessIcon from '../images/fitnessIcon.svg'
import moodIcon from '../images/moodIcon.svg'

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
                        onClick={nutritionChange}
                    />
                    <button className="homeButtons" onClick={nutritionChange}>Nutrition</button>
                </div>
                <div>
                    <img className="iconSize"
                        src={fitnessIcon}
                        alt='Icon'
                        onClick={fitnessChange}

                    />
                    <button className="homeButtons" onClick={fitnessChange}>Fitness</button>
                </div>
                <div>
                    <img className="iconSize"
                        src={moodIcon}
                        alt='Icon'
                        onClick={moodChange}
                    />
                    <button className="homeButtons" onClick={moodChange}>Mood</button>
                </div>
            </div>
        </div>
    )



}

export default MainSummary;