import Ditlin from "../../components/Ditlin/Ditlin";
import HeiKai from "../../components/HeiKai/HeiKai";
import {GameState, LINE_SIZE, MAX_HEIKAI, NumState, ScoreDir} from "../../util/Constants.js";
import { LineColor } from "../../util/Constants";
import DiceLine from "../DiceLine/DiceLine";
import "./MainGame.css";
import {useState, useEffect} from "react";
import Button from "../../components/Button/Button";
import Dice from "../../components/Dice/Dice";
import DiceLineStates from "../../classes/DiceLineStates";

const MainGame = () => {
  const defaultNumArr = Array(LINE_SIZE).fill(NumState.NONE);
  const defaultDiceLineStates = LineColor.map(color => new DiceLineStates(color, [...defaultNumArr]));

  const [diceLineStates, setDiceLineStates] = useState(defaultDiceLineStates);
  const [diceRollVals, setDiceRollVals] = useState(Array(LineColor.length + 1).fill(1));
  const [ditlinCount, setDitlinCount] = useState(0);
  const [heikaiCount, setHeiKaiCount] = useState(0);
  const [selectedWildcardNum, setSelectedWildcardNum] = useState(null);

  const [taking, setTaking] = useState(false);
  const [gameState, setGameState] = useState(GameState.ROLL_ALL);

  const handleRollDices = () => {
    if (gameState === GameState.ROLL_ALL || gameState === GameState.ROLL_WILD || 
      gameState === GameState.ROLL_ALL_DITLIN) {
      const dicesCopy = [...diceRollVals];

      if (gameState === GameState.ROLL_ALL || gameState === GameState.ROLL_ALL_DITLIN) {
        for (let i = 0; i < dicesCopy.length; ++i) {
            dicesCopy[i] = Math.floor(Math.random() * 12) + 1;
        }

        setGameState(gameState === GameState.ROLL_ALL ? GameState.TAKE_OR_DITLIN 
          : gameState === GameState.ROLL_ALL_DITLIN ? GameState.TAKE_DITLIN 
          : null);
      } else { // gameState = ROLL_WILD
        // Roll only wildcard dice
        dicesCopy[dicesCopy.length - 1] = Math.floor(Math.random() * 12) + 1;
        setGameState(GameState.TAKE_OR_PASS);
      }

      setDiceRollVals(dicesCopy);
    }
  }

  const diceClickHandler = (diceIdx, diceVal) => {
    if (gameState === GameState.TAKE_OR_DITLIN || gameState === GameState.TAKE_DITLIN || gameState === GameState.TAKE_OR_PASS) {
      setTaking(true);
      takeNumFromLine(diceIdx, diceVal);
    }
  }

  const handleSetDirection = (idx, dir) => {
    if (isNotWildcard(idx)) { // Check to make sure wildcard idx is not passed here
      const stateCopy = copyState(diceLineStates);

      stateCopy[idx].setScoreDir(dir);
      stateCopy[idx].tryToTake(stateCopy[idx].selectedNum);
      stateCopy[idx].selectedNum = null;

      setDiceLineStates(stateCopy);
      updateGameStateAfterTake();
    }
  }

  const takeNumFromLine = (lineIdx, diceVal) => {
    if (isNotWildcard(lineIdx)) { // Using a color dice
      const stateCopy = copyState(diceLineStates);
      const currLine = stateCopy[lineIdx];

      if (currLine.scoreDir === ScoreDir.UNKNOWN) { // Taking the first number this line
        currLine.selectedNum = diceVal;
      } else { // Taking number that is not first for this line
        if (currLine.tryToTake(diceVal)) { // If take sucessfully
          updateGameStateAfterTake();
        }
      }

      // Check and update HeiKai
      if (currLine.checkForHeiKai() && heikaiCount < MAX_HEIKAI) {
        setHeiKaiCount(heikaiCount + 1);
        currLine.heiKaiStartNumArr.push(currLine.scoreDir === ScoreDir.ASC ? diceVal - 2 : diceVal);
      }

      setDiceLineStates(stateCopy);
    } else { // Using the wildcard dice
      setSelectedWildcardNum(diceVal);
    }
  }

  const updateGameStateAfterTake = () => {
    switch (gameState) {
      case GameState.TAKE_OR_DITLIN:
        setGameState(GameState.ROLL_WILD);
        break;
      case GameState.TAKE_DITLIN:
        setGameState(GameState.ROLL_WILD);
        break;
      case GameState.TAKE_OR_PASS:
        setGameState(GameState.ROLL_ALL);
        break;
      default:
        break;
    }

    setTaking(false);
  }

  const handleDitlin = () => {
    if (gameState === GameState.TAKE_OR_DITLIN && !taking) {
      setDitlinCount(ditlinCount + 1);
      setGameState(GameState.ROLL_ALL_DITLIN);
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
      takeNumFromLine(idx, selectedWildcardNum);
      setSelectedWildcardNum(null);
    }
  }

  const handlePass = () => {
    if (gameState === GameState.TAKE_OR_PASS && !taking) {
      setGameState(GameState.ROLL_ALL);
    } else if (gameState === GameState.TAKE_DITLIN && !taking) {
      setGameState(GameState.ROLL_WILD);
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
                      <Dice filledColor={color.background} 
                        unavailableColor={color.selectedBackground}
                        val={diceRollVals.at(idx)} 
                        canSelect={gameState === GameState.TAKE_OR_DITLIN || gameState === GameState.TAKE_DITLIN || gameState === GameState.ROLL_ALL}
                        onClickHandler={() => diceClickHandler(idx, diceRollVals.at(idx))} />
                  )}
                  <Dice 
                    filledColor={"#23362B"} 
                    textColor="white" 
                    val={diceRollVals[diceRollVals.length - 1]} 
                    canSelect={true}
                    onClickHandler={() => diceClickHandler(diceRollVals.length - 1, diceRollVals[diceRollVals.length - 1])} />
              </div>
              <div className="gameButton flexCol">
                  <Button text="Roll Dices" onBtnClick={handleRollDices}/>
                  <Button text="Ditlin" onBtnClick={handleDitlin}/>
                  <Button text="Pass" onBtnClick={handlePass}/>
              </div>
          </div>
      </div>
  );
}

export default MainGame;