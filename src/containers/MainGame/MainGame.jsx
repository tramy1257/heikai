import Ditlin from "../../components/Ditlin/Ditlin";
import HeiKai from "../../components/HeiKai/HeiKai";
import {LINE_SIZE, MAX_HEIKAI, NumState, ScoreDir} from "../../util/Constants.js";
import { LineColor } from "../../util/Constants";
import DiceLine from "../DiceLine/DiceLine";
import "./MainGame.css";
import {useState, useEffect} from "react";
import Button from "../../components/Button/Button";
import Dice from "../../components/Dice/Dice";

class DiceLineStates {
  color;
  stateArr;
  selectedNum = null;
  scoreDir = ScoreDir.UNKNOWN;
  consecutiveTake = 0;
  heiKaiStartNumArr = [];

  constructor(color, stateArr, selectedNum = null, scoreDir = ScoreDir.UNKNOWN, consecutiveTake = 0, heiKaiStartNumArr = []) {
    this.color = color;
    this.stateArr = stateArr;
    this.selectedNum = selectedNum;
    this.scoreDir = scoreDir;
    this.consecutiveTake = consecutiveTake;
    this.heiKaiStartNumArr = heiKaiStartNumArr;
  }

  // Return whether a number is taken successfully
  tryToTake(num) {
    // If a number is already skipped or taken or the score direction is not set, cannot take
    if (this.stateArr.at(num - 1) !== NumState.NONE || this.scoreDir === ScoreDir.UNKNOWN) {
      return false;
    }

    this.take(num);
    this.skipBehind(num);
    ++this.consecutiveTake;

    return true;
  }

  checkForHeiKai() {
    if (this.consecutiveTake === 3) {
      this.consecutiveTake = 0;
      return true;
    }

    return false;
  }

  setScoreDir(dir) {
    this.scoreDir = dir;
  }

  take(num) {
    this.stateArr[num - 1] = NumState.TAKEN;
  }

  skip(num) {
    this.stateArr[num - 1] = NumState.SKIPPED;
    this.consecutiveTake = 0;
  }

  isAvailable(num) {
    return this.stateArr[num - 1] === NumState.NONE;
  }

  /* When a number is being taken all the number between that taken number and the previous 
   * taken number or the beginning of the row (1 if direction is ASC or 12 if dir is DESC)
   * are skipped
   *
   * num - the number that is being taken on current row.
   */
  skipBehind(num) {
    // Safe checking. This function should not be called before the first num is taken
    // and the direction is set
    if (this.scoreDir === ScoreDir.UNKNOWN) {
      return;
    }

    if (this.scoreDir === ScoreDir.ASC) {
      let i = num - 1;
      while (i >= 1 && this.isAvailable(i)) {
        this.skip(i);
        --i;
      }
    } else {
      let i = num + 1;
      while (i <= LINE_SIZE && this.isAvailable(i)) {
        this.skip(i);
        ++i;
      }
    }
  }
}


const MainGame = () => {
    const defaultNumArr = Array(LINE_SIZE).fill(NumState.NONE);
    const defaultDiceLineStates = LineColor.map(color => new DiceLineStates(color, [...defaultNumArr]));

    const [diceLineStates, setDiceLineStates] = useState(defaultDiceLineStates);
    const [diceRollVals, setDiceRollVals] = useState(Array(LineColor.length + 1).fill(1));
    const [ditlinCount, setDitlinCount] = useState(0);
    const [heikaiCount, setHeiKaiCount] = useState(0);
    const [selectedWildcardNum, setSelectedWildcardNum] = useState(null);

    const handleRollDices = () => {
        const dicesCopy = [...diceRollVals];
        for (let i = 0; i < dicesCopy.length; ++i) {
            dicesCopy[i] = Math.floor(Math.random() * 12) + 1;
        }

        setDiceRollVals(dicesCopy);
    }

    const handleSetDirection = (idx, dir) => {
      if (isNotWildcard(idx)) {
        const stateCopy = copyState(diceLineStates);

        stateCopy[idx].setScoreDir(dir);
        stateCopy[idx].tryToTake(stateCopy[idx].selectedNum);
        stateCopy[idx].selectedNum = null;

        setDiceLineStates(stateCopy);
      }
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
        const currLine = stateCopy[diceIdx];

        if (currLine.scoreDir === ScoreDir.UNKNOWN) {
          currLine.selectedNum = diceVal;
        } else {
          console.log(currLine.tryToTake(diceVal));
        }

        if (currLine.checkForHeiKai() && heikaiCount < MAX_HEIKAI) {
          setHeiKaiCount(heikaiCount + 1);
          currLine.heiKaiStartNumArr.push(currLine.scoreDir === ScoreDir.ASC ? diceVal - 2 : diceVal);
        }

        setDiceLineStates(stateCopy);
      } else {
        // When wildcard dice is clicked
        setSelectedWildcardNum(diceVal);
      }
    }

    const copyState = (states) => {
      const copy = [];
      for (const state of states) {
        copy.push(new DiceLineStates(state.color.getCopy(), 
          [...state.stateArr], state.selectedNum, state.scoreDir, state.consecutiveTake, [...state.heiKaiStartNumArr]));
      }
      return copy;
    }

    const isNotWildcard = (idx) => {
      return idx < diceRollVals.length - 1;
    }

    const wildcardNumClickHandler = (idx) => {
      if (selectedWildcardNum !== null && diceLineStates[idx].isAvailable(selectedWildcardNum)) {
        diceClickHandler(idx, selectedWildcardNum);
        setSelectedWildcardNum(null);
      }
    }

    return (
        <div className="mainGame">
            <div className="mainGameLeft">
                <div className="diceLines">
                    {diceLineStates.map((lineState, index) => 
                      <DiceLine lineState={lineState}
                        setDirection={(dir) => handleSetDirection(index, dir)} 
                        selectedWildcardNum={selectedWildcardNum}
                        boxClick={() => wildcardNumClickHandler(index)}
                        key={lineState.color.background + index}/>)}
                </div>
                <HeiKai heikaiNum={heikaiCount}/>
                <Ditlin ditlinNum={ditlinCount}/>
            </div>
            <div className="mainGameRight flexRow">
                <div className="diceDisplay">
                    {LineColor.map(
                        (color, idx) => 
                        <Dice filledColor={color.background} val={diceRollVals.at(idx)} onClickHandler={() => diceClickHandler(idx, diceRollVals.at(idx))} />
                    )}
                    <Dice 
                      filledColor={"#23362B"} 
                      textColor="white" 
                      val={diceRollVals[diceRollVals.length - 1]} 
                      onClickHandler={() => diceClickHandler(diceRollVals.length - 1, diceRollVals[diceRollVals.length - 1])} />
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