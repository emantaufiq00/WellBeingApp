import React, { PureComponent } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
} from 'recharts';


function moodSummary() {
    const data = [
        { name: "facebook", value: 200000 },
        { name: "twitter", value: 10000 },
        { name: "instagram", value: 5000 },
    ];

    return (
        <div>
            <div>Mood Summary</div>
            <LineChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" />
            </LineChart>
        </div>

    )


}


export default moodSummary;