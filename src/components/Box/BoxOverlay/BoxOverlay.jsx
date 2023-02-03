import { NumState } from '../../../util/Constants';
import './BoxOverlay.css';

export default function BoxOverlay( {state} ) {
  return (
    <div className="boxOverlay">
      {state === NumState.SKIPPED ? <SkippedBoxOverlay /> : state === NumState.TAKEN ? <TakenBoxOverlay /> : null}
    </div>
  );
}

const SkippedBoxOverlay = () => {
  return (
    <svg className="svgOverlay" viewBox="0 0 200 200">
      <rect x="10" y="85" rx="15" ry="15" width="180" height="30" style={{fill:"black", opacity: "60%"}} />
      Sorry, your browser does not support inline SVG.
    </svg>
  );
}

const TakenBoxOverlay = () => {
  const getStyle = (rotationInDeg) => {
    return {
      fill: "black",
      transformBox: "fill-box",
      transformOrigin: "center",
      transform: `rotate(${rotationInDeg}deg)`
    }
  }

  return (
    <svg className="svgOverlay" viewBox="0 0 200 200">
      <rect x="5" y="90" rx="10" ry="10" width="190" height="20" style={getStyle(45)} />
      <rect x="5" y="90" rx="10" ry="10" width="190" height="20" style={getStyle(315)} />
      Sorry, your browser does not support inline SVG.
    </svg>
  );
}