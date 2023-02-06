import "./DirectionSelection.css";
import { ScoreDir } from '../../../util/Constants';

export default function DirectionSelection( {setDirection, showDirSelection} ) {
    const dirSelectionStyle = {
        display: showDirSelection ? "flex" : "none"
    }

  return (
    <div style={dirSelectionStyle}>
      <Arrow className="dirSelectionLeft" onClick={() => setDirection(ScoreDir.DESC)} />
      <Arrow className="dirSelectionRight" onClick={() => setDirection(ScoreDir.ASC)} />
    </div>
  );
}

const Arrow = ( {className, onClick} ) => {
  const pathStyle = {
    fill: "black"
  }

  return (
    <div className={className + " flexCenterBoth arrowContainer"} onClick={onClick}>
      <svg height="30px" width="30px" viewBox="0 0 26.077 26.077">
        <g>
        	<g id="c103_arrow">
        		<path style={pathStyle} d="M25.709,13.552l-9.721,9.994c0,0-1.151,1.219-1.151-0.105c0-1.325,0-4.532,0-4.532
        			s-0.781,0-1.976,0c-3.42,0-9.642,0-12.173,0c0,0-0.688,0.184-0.688-0.861c0.001-1.047,0.001-9.533,0.001-10.279
        			S0.576,7.04,0.576,7.04c2.463,0,8.895,0,12.199,0c1.072,0,1.771,0,1.771,0s0-2.569,0-4.186c0-1.61,1.208-0.395,1.208-0.395
        			s9.081,8.791,10.033,9.744C26.482,12.894,25.709,13.552,25.709,13.552z"/>
        	</g>
        </g>
      </svg>

    </div>
  );
}