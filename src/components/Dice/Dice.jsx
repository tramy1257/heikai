import Pentagon from "../Pentagon/Pentagon";
import "./Dice.css";

export default function Dice( {filledColor, textColor, val, onClickHandler} ) {
  return (
    <div onClick={onClickHandler} className="dice">
      <Pentagon filledColor={filledColor} textColor={textColor} size={60} value={val} 
          strokeSize={25} key={filledColor}/>
    </div>
  );
}