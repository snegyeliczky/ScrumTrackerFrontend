import React, {useState, useContext, useEffect, useRef} from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const CustomPieChart = ( {data} ) => {

    //pie chart
    const segmentsStyle = { transition: 'stroke .3s', cursor: 'pointer' };
    const [selectedBusinessValueCount, setSelectedBusinessValueCount] = useState();

    return (
            <PieChart
                className="chart"
                animate={true}
                animationDuration={1000}
                lineWidth={75}
                radius={40}
                onClick={(e, segmentIndex) => setSelectedBusinessValueCount(segmentIndex)}
                segmentsStyle={(index) => {
                    return index === selectedBusinessValueCount
                        ? { ...segmentsStyle, strokeWidth: 40 }
                        : segmentsStyle;
                }}
                data={[
                    { title: 'Not Started', value: data.start, color: '#dd2911' },
                    { title: 'In Progress', value: data.inProgress, color: '#efc310' },
                    { title: 'Finished', value: data.finish, color: '#5bc128' },
                ]}
            />
    );
};

export default CustomPieChart;