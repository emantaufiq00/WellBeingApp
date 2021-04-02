import React, { PureComponent } from 'react';
import './summary.css'
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

//sample data to plot graph
const data = [

    { value: 1000, Date: 10 },
    { value: 1500, Date: 20 },
    { value: 1700, Date: 30 },
    { value: 1300, Date: 40 },
    { value: 2000, Date: 20 },
    { value: 2500, Date: 30 },
    { value: 2200, Date: 40 },
];




export default class nutritionSummary extends PureComponent {

    render() {
        return (
            <div>
                <div className="pageTitle"> Nutritional Summary</div>
                <div className="moodChart">
                    <ResponsiveContainer width="100%" height={400}>
                        <ComposedChart
                            width={500}
                            height={400}
                            data={data}
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 20,
                            }}
                        >
                            <CartesianGrid stroke="#f5f5f5" />
                            <XAxis dataKey="Date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" barSize={20} fill=" rgba(0,212,255,1)" />
                            <Line type="monotone" dataKey="value" stroke="#ff7300" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>


            </div >

        );
    }

}
