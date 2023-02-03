import Ditlin from "../../components/Ditlin/Ditlin";
import HeiKai from "../../components/HeiKai/HeiKai";
import Pentagon from "../../components/Pentagon/Pentagon";
import { LineColor } from "../../util/Constants";
import DiceLine from "../DiceLine/DiceLine";
import "./MainGame.css";
import {useState} from "react";
import Button from "../../components/Button/Button";

const MainGame = () => {
    const [diceRollVals, setDiceRollVals] = useState(Array(LineColor.length + 1).fill(1));

    const handleRollDices = () => {
        const dicesCopy = [...diceRollVals];
        for (let i = 0; i < dicesCopy.length; ++i) {
            dicesCopy[i] = Math.floor(Math.random() * 12) + 1;
        }

        setDiceRollVals(dicesCopy);
    }

    return (
        <div className="mainGame">
            <div className="mainGameLeft">
                <div className="diceLines">
                    {LineColor.map((color, index) => <DiceLine color={color} key={color.background + index}/>)}
                </div>
                <HeiKai heikaiNum={6}/>
                <Ditlin ditlinNum={2}/>
            </div>
            <div className="mainGameRight flexRow">
                <div className="diceDisplay">
                    {LineColor.map(
                        (color, idx) => 
                        <Pentagon filledColor={color.background} size={60} value={diceRollVals.at(idx)} 
                            strokeSize={25} key={color.background + idx}/>
                    )}
                    <Pentagon filledColor="darkgrey" size={60} value={diceRollVals.at(diceRollVals.length - 1)} 
                        strokeSize={25} key={"darkgrey" + diceRollVals.length - 1}/>
                </div>
                <div className="gameButton">
                    <Button text="Roll Dices" onBtnClick={handleRollDices}/>
                </div>
            </div>
        </div>
    );
}

export default MainGame;