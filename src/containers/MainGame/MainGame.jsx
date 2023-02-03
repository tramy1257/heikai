import { LineColor } from "../../util/Constants";
import DiceLine from "../DiceLine/DiceLine";
import "./MainGame.css";

const MainGame = () => {
    // const DICE_LINES = ["red", "blue", /*"green", "yellow", "white"*/];

    return (
        <div>
            <h1>HeiKai</h1>
            <div className="diceLines">
                {LineColor.map((color, index) => <DiceLine color={color} key={color.background + index}/>)}
            </div>
        </div>
    );
}

export default MainGame;