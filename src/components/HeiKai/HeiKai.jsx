import { HEIKAI_FILLED_COLOR, HEIKAI_NOT_FILLED_COLOR, MAX_HEIKAI } from "../../util/Constants";
import "./HeiKai.css";

export default function HeiKai( {heikaiNum} ) {
  const heiKaiArr = [];

  for (let i = 1; i <= MAX_HEIKAI; ++i) {
    heiKaiArr.push(<HeiKaiBox filled={i <= heikaiNum}/>)
  }

  return (
    <div className="heiKai">
      <span>HeiKai</span>
      <div className="heiKaiTracking">
        {heiKaiArr}
      </div>
      <span>=</span>
      <div className="heiKaiScore flexCenterBoth">100</div>
    </div>
  );
}

const HeiKaiBox = ( {filled} ) => {
  const style = {
    backgroundColor: filled ? HEIKAI_FILLED_COLOR : HEIKAI_NOT_FILLED_COLOR
  };

  return <div className="heiKaiBox" style={style}></div>
}