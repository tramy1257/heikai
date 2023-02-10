import Pentagon from "../Pentagon/Pentagon";
import "./Dice.css";

export default function Dice( {filledColor, unavailableColor, textColor, val, onClickHandler, canSelect} ) {
  return (
    <div onClick={canSelect ? onClickHandler : null} className="dice">
      <Pentagon filledColor={canSelect ? filledColor : unavailableColor} textColor={textColor} size={60} value={val} 
          strokeSize={25} key={filledColor}/>
    </div>
  );
}