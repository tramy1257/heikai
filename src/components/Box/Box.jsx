import './Box.css';
import BoxOverlay from './BoxOverlay/BoxOverlay';
import DirectionSelection from './DirectionSelection/DirectionSelection';

const Box = ( {color, num, state, setDirection, showDirSelection, isSelectedWildcardNum, onClick} ) => {
    const boxStyle = {
        backgroundColor: isSelectedWildcardNum ? color.selectedBackground : color.background, 
        color: isSelectedWildcardNum ? "white" : color.text
    }

    return (
        <div className="boxContain" onClick={onClick}>
            <div 
                className="box flexCenterBoth" 
                style={boxStyle}
            >
                <span>{num}</span>
            </div>
            <BoxOverlay state={state}/>
            <DirectionSelection showDirSelection={showDirSelection} setDirection={setDirection}/>
        </div>
    );
}

export default Box;