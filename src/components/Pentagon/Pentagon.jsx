import "./Pentagon.css";

export default function Pentagon( {filledColor, size, value, strokeSize} ) {
  const style = {
    width: size + "px",
    height: size + "px"
  };

  const polygonStyle = {
    fill: filledColor,
    stroke: "black",
    strokeWidth: strokeSize
  }

  const points = "2,-98 -98,-15 -60,98 60,98 98,-15 2,-100"; 

  return (
    <div className="pentagon">
      <svg style={style} viewBox="-100 -100 200 200">
        <defs>
          <clipPath id="insidePen">
            <polygon id="pen" points={points} />
          </clipPath>
        </defs>
  
        <polygon style={polygonStyle} points={points}
          clipPath="url(#insidePen)"/>
      </svg>
      <div style={style} className="pentagonVal flexCenterBoth">{value}</div>
    </div>
  );
}