import {useState} from "react";
import Box from "../../components/Box/Box.jsx";
import {LINE_SIZE, NumState} from "../../util/Constants.js";
import "./DiceLine.css";

const DiceLine = ({ color, numArr, total }) => {

    return (
        <div className="diceLine">
            <div className="numRow">
                {numArr.map((val, idx) => <Box color={color} num={idx + 1} state={val} key={val + idx}/>)}
            </div>
            <div className="equalSign">=</div>
            <Box className="totalBox" color={color} num={total} state={NumState.NONE} />
        </div>
    );
}

export default DiceLine;