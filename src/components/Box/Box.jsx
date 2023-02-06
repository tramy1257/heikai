import './Box.css';
import BoxOverlay from './BoxOverlay/BoxOverlay';
import DirectionSelection from './DirectionSelection/DirectionSelection';

const Box = ( {color, num, state, setDirection, showDirSelection} ) => {
    return (
        <div className="boxContain">
            <div 
                className="box flexCenterBoth" 
                style={{backgroundColor: color.background, color: color.text}}
            >
                <span>{num}</span>
            </div>
            <BoxOverlay state={state}/>
            <DirectionSelection showDirSelection={showDirSelection} setDirection={setDirection}/>
        </div>
    );
}

export default Box;