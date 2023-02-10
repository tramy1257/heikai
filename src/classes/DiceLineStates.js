import { LINE_SIZE, NumState, ScoreDir } from "../util/Constants";

export default class DiceLineStates {
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