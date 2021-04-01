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

        { name: "Blissful", Date: 5000 },
        { name: "Happy", Date: 55000 },
        { name: "Shocked", Date: 110000 },
        { name: "Sad", Date: 200000 },

    ];

    return (
        <div>
            <div>Mood Summary</div>

            <LineChart
                layout="vertical"
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 'dataMax + 1000']} />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Line dataKey="Date" stroke="#8884d8" />
            </LineChart>

        </div>

    )


}


export default moodSummary;