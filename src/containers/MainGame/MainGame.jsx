import Ditlin from "../../components/Ditlin/Ditlin";
import HeiKai from "../../components/HeiKai/HeiKai";
import {LINE_SIZE, NumState, ScoreDir} from "../../util/Constants.js";
import { LineColor } from "../../util/Constants";
import DiceLine from "../DiceLine/DiceLine";
import "./MainGame.css";
import {useState, useEffect} from "react";
import Button from "../../components/Button/Button";
import Dice from "../../components/Dice/Dice";

class DiceLineStates {
  color;
  stateArr;
  scoreDir = ScoreDir.UNKNOWN;
  lastTaken = null;

  constructor(color, stateArr, scoreDir = ScoreDir.UNKNOWN, lastTaken = null) {
    this.color = color;
    this.stateArr = stateArr;
    this.scoreDir = scoreDir;
    this.lastTaken = lastTaken;
  }

  // Return whether a number is taken successfully
  tryToTake(num) {
    if (this.stateArr.at(num - 1) !== NumState.NONE) {
      return false;
    }

    if (this.lastTaken === null) {
      // Taking the first number this row
      this.take(num);
      return true;
    } else if (this.scoreDir === ScoreDir.UNKNOWN) {
      // Taking the 2nd number this row. 
      this.skipBetween2Num(this.lastTaken, num);
      if (num > this.lastTaken) {
        this.scoreDir = ScoreDir.ASC;
        this.skipBetween2Num(-1, this.lastTaken);
      } else {
        this.scoreDir = ScoreDir.DESC;
        this.skipBetween2Num(this.lastTaken, 13);
      }
      this.take(num);
      return true;
    } else if (this.scoreDir === ScoreDir.ASC) {
      if (num - this.lastTaken > 0) {
        this.skipBetween2Num(this.lastTaken, num);
        this.take(num);
        return true;
      } else {
        return false;
      }
    } else {
      if (num - this.lastTaken < 0) {
        this.skipBetween2Num(this.lastTaken, num);
        this.take(num);
        return true;
      } else {
        return false;
      }
    }
  }

  take(num) {
    this.stateArr[num - 1] = NumState.TAKEN;
    this.lastTaken = num;
  }

  skip(num) {
    this.stateArr[num - 1] = NumState.SKIPPED;
  }

  skipBetween2Num(num1, num2) {
    let low = num1;
    let high = num2;

    if (num1 > num2) {
      low = num2;
      high = num1;
    }

    for (let i = low + 1; i <= high - 1; ++i) {
      this.skip(i);
    }
  }
}


const MainGame = () => {
    const defaultNumArr = Array(LINE_SIZE).fill(NumState.NONE);
    const defaultDiceLineStates = LineColor.map(color => new DiceLineStates(color, [...defaultNumArr]));

    const [diceLineStates, setDiceLineStates] = useState(defaultDiceLineStates);
    const [diceRollVals, setDiceRollVals] = useState(Array(LineColor.length + 1).fill(1));
    const [ditlinCount, setDitlinCount] = useState(0);

    useEffect(() => {
    }, [diceLineStates]);

    const handleRollDices = () => {
        const dicesCopy = [...diceRollVals];
        for (let i = 0; i < dicesCopy.length; ++i) {
            dicesCopy[i] = Math.floor(Math.random() * 12) + 1;
        }

        setDiceRollVals(dicesCopy);
    }

    const handleDitlin = () => {
      if (ditlinCount < 5) {
        setDitlinCount(ditlinCount + 1);
      } else {
        console.log("Can no longer ditlin");
      }
    }

    const diceClickHandler = (diceIdx, diceVal) => {
      if (isNotWildcard(diceIdx)) {
        const stateCopy = copyState(diceLineStates);
        console.log(stateCopy[diceIdx].tryToTake(diceVal));
        setDiceLineStates(stateCopy);
      }

    }

    const copyState = (states) => {
      const copy = [];
      for (const state of states) {
        copy.push(new DiceLineStates(state.color.getCopy(), 
          [...state.stateArr], state.scoreDir, state.lastTaken));
      }
      return copy;
    }

    const isNotWildcard = (idx) => {
      return idx < diceRollVals.length - 1;
    }

    return (
        <div className="mainGame">
            <div className="mainGameLeft">
                <div className="diceLines">
                    {diceLineStates.map((lineState, index) => 
                      <DiceLine color={lineState.color} numArr={lineState.stateArr} key={lineState.color.background + index}/>)}
                </div>
                <HeiKai heikaiNum={6}/>
                <Ditlin ditlinNum={ditlinCount}/>
            </div>
            <div className="mainGameRight flexRow">
                <div className="diceDisplay">
                    {LineColor.map(
                        (color, idx) => 
                        <Dice filledColor={color.background} val={diceRollVals.at(idx)} onClickHandler={() => diceClickHandler(idx, diceRollVals.at(idx))} />
                    )}
                    <Dice filledColor={"darkgrey"} val={diceRollVals[diceRollVals.length - 1]} onClickHandler={() => diceClickHandler(diceRollVals.length - 1)} />
                </div>
                <div className="gameButton flexCol">
                    <Button text="Roll Dices" onBtnClick={handleRollDices}/>
                    <Button text="Ditlin" onBtnClick={handleDitlin}/>
                </div>
            </div>
        </div>
    );
}

export default MainGame;