import { ScoreDir } from '../../util/Constants';
import './Box.css';
import BoxOverlay from './BoxOverlay/BoxOverlay';

const Box = ( {color, num, state, showDirSelection, setDirection} ) => {
    const dirSelectionStyle = {
        display: showDirSelection ? "flex" : "none"
    }

    return (
        <div className="boxContain">
            <div 
                className="box flexCenterBoth" 
                style={{backgroundColor: color.background, color: color.text}}
            >
                <span>{num}</span>
            </div>
            <BoxOverlay state={state}/>
            <div className="dirSelectionLeft flexCenterBoth" onClick={() => setDirection(ScoreDir.DESC)} style={dirSelectionStyle}>1</div>
            <div className="dirSelection" style={dirSelectionStyle}></div>
            <div className="dirSelectionRight flexCenterBoth" onClick={() => setDirection(ScoreDir.ASC)} style={dirSelectionStyle}>2</div>
        </div>
    );
}

export default Box;