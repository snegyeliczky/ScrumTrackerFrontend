import React, {useState, useContext, useEffect, useRef} from 'react';
import {PieChart} from 'react-minimal-pie-chart';

const CustomPieChart = ({data, visualMark, label}) => {

    //pie chart
    const segmentsStyle = {transition: 'stroke .3s', cursor: 'pointer', strokeWidth: 35};
    const [selectedPart, setSelectedPart] = useState();


    const labelStyle = {fontSize: "0.5rem"};

    const handleSelectPart = (segmentIndex) => {
        setSelectedPart(segmentIndex)
    };

    return (
        <div className="chart_box">
            <h1>{label}</h1>
        <PieChart
                className="chart"
                label={({dataEntry}) => {
                    return visualMark === "value" ?
                        `${Math.round(dataEntry.value)} `
                        :
                        `${Math.round(dataEntry.percentage)} %`
                }}
                labelStyle={labelStyle}
                animate={true}
                animationDuration={1000}
                lineWidth={75}
                radius={40}
                onClick={(e, segmentIndex) => handleSelectPart(segmentIndex)}
                segmentsStyle={(index) => {
                    return index === selectedPart
                        ? {...segmentsStyle, strokeWidth: 40}
                        : segmentsStyle;
                }}
                data={[
                    {title: 'Not Started', value: data.start, color: '#dd2911'},
                    {title: 'In Progress', value: data.inProgress, color: '#efc310'},
                    {title: 'Finished', value: data.finish, color: '#5bc128'},
                ]}
            />
        </div>
    );
};

export default CustomPieChart;