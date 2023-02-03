import { DITLIN_FILLED_COLOR, DITLIN_NOT_FILLED_COLOR, MAX_DITLIN } from "../../util/Constants";
import "./Ditlin.css";

export default function Ditlin( {ditlinNum} ) {
  const ditlinArr = [];

  for (let i = 1; i <= MAX_DITLIN; ++i) {
    ditlinArr.push(<DitlinBox filled={i <= ditlinNum} size={30} />)
  }

  return (
    <div className="ditlin">
      <span>Ditlin</span>
      <div className="ditlinTracking">
        {ditlinArr}
      </div>
      <span>=</span>
      <DitlinBox size={40} value={ditlinNum * (-5)} />
    </div>
  );
}

const DitlinBox = ( {filled, size, value} ) => {
  const style = {
    width: size + "px",
    height: size + "px"
  };

  const polygonStyle = {
    fill: filled ? DITLIN_FILLED_COLOR : DITLIN_NOT_FILLED_COLOR,
    stroke: "black",
    strokeWidth: 30
  }

  const points = "2,-98 -98,-15 -60,98 60,98 98,-15 2,-100"; 

  return (
    <div className="ditlinBox">
      <svg style={style} viewBox="-100 -100 200 200">
        <defs>
          <clipPath id="insidePen">
            <polygon id="pen" points={points} />
          </clipPath>
        </defs>
  
        <polygon style={polygonStyle} points={points}
          clipPath="url(#insidePen)"/>
      </svg>
      <div style={style} className="ditlinVal flexCenterBoth">{value}</div>
    </div>
  );
}