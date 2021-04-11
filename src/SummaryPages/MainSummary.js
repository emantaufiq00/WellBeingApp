
import React from "react";
import { useHistory } from 'react-router-dom';
import './summary.css'
import ButtonAppBar from '../AppPages/navBar'


function MainSummary() {

    const history = useHistory();

    const nutritionChange = () => {
        history.push('/summaryNutrition');
    }

    const moodChange = () => {
        history.push('/summaryMood');
    }

    const fitnessChange = () => {
        history.push('/summaryFitness');
    }

    return (
        <div>
            <ButtonAppBar />
            <h3 className='fithead'> Summary </h3>
            <div className="buttonHolder">
                <div><button className="summaryButton" onClick={nutritionChange}>Nutrition</button></div>
                <div><button className="summaryButton" onClick={fitnessChange}>Fitness</button></div>
                <div><button className="summaryButton" onClick={moodChange}>Mood</button></div>
            </div>
        </div>
    )



}

export default MainSummary;