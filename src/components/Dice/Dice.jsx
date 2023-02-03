import Pentagon from "../Pentagon/Pentagon";
import "./Dice.css";

export default function Dice( {filledColor, val, onClickHandler} ) {
  return (
    <div onClick={onClickHandler} className="dice">
      <Pentagon filledColor={filledColor} size={60} value={val} 
          strokeSize={25} key={filledColor}/>
    </div>
  );
}