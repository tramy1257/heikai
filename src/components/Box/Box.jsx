import './Box.css';
import BoxOverlay from './BoxOverlay/BoxOverlay';

const Box = ( {color, num, state} ) => {
    return (
        <div className="boxContain">
            <div 
                className="box flexCenterBoth" 
                style={{backgroundColor: color.background, color: color.text}}
            >
                <span>{num}</span>
            </div>
            <BoxOverlay state={state}/>
        </div>
    );
}

export default Box;