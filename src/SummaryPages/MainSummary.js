
import React from "react";
import { useHistory } from 'react-router-dom';


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
            <div><button onClick={nutritionChange}>Nutrition</button></div>
            <div><button onClick={fitnessChange}>Fitness</button></div>
            <div><button onClick={moodChange}>Mood</button></div>
        </div>
    )



}

export default MainSummary;