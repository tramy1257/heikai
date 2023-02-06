import Box from "../../components/Box/Box.jsx";
import {NumState} from "../../util/Constants.js";
import "./DiceLine.css";

export default function DiceLine({ color, numArr, total, selectedNum, setDirection, heiKaiStartNumArr }) {
    return (
        <div className="diceLine">
            <div className="numRow">
                {numArr.map((val, idx) => <Box color={color} num={idx + 1} state={val} showDirSelection={idx + 1 === selectedNum} setDirection={setDirection} key={val + idx}/>)}
            </div>
            <div className="equalSign">=</div>
            <Box className="totalBox" color={color} num={total} state={NumState.NONE} />
            {heiKaiStartNumArr.map((startNum) => <div className="heiKaiTracker" style={{left: (startNum - 1) * 45 - 2}}></div>)}
        </div>
    );
}