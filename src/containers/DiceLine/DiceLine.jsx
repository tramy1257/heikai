import Box from "../../components/Box/Box.jsx";
import {NumState} from "../../util/Constants.js";
import "./DiceLine.css";

export default function DiceLine({ lineState, total, setDirection, selectedWildcardNum, boxClick }) {
    const canBeSelectAsWildcard = (num) => {
        return selectedWildcardNum === num && lineState.isAvailable(num);
    }

    return (
        <div className="diceLine">
            <div className="numRow">
                {lineState.stateArr.map((val, idx) => 
                    <Box color={lineState.color} 
                        num={idx + 1} 
                        state={val} 
                        showDirSelection={idx + 1 === lineState.selectedNum} 
                        setDirection={setDirection} 
                        onClick={boxClick}
                        isSelectedWildcardNum={canBeSelectAsWildcard(idx + 1)}
                        key={val + idx}/>)}
            </div>
            <div className="equalSign">=</div>
            <Box className="totalBox" color={lineState.color} num={total} state={NumState.NONE} />
            {lineState.heiKaiStartNumArr.map((startNum) => <div className="heiKaiTracker" style={{left: (startNum - 1) * 45 - 1}}></div>)}
        </div>
    );
}