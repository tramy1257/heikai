export const LINE_SIZE = 12;

// Game State
export const GameState = {
  ROLL_ALL: "ROLL_ALL",
  TAKE_WILD_OR_PASS: "TAKE_WILD_OR_PASS",
  ROLL_ALL_DITLIN: "ROLL_ALL_DITLIN",
  TAKE_OR_DITLIN: "TAKE_OR_DITLIN",
  ROLL_WILD: "ROLL_WILD",
  TAKE_OR_PASS: "TAKE_OR_PASS",
  TAKE_DITLIN: "TAKE_DITLIN",
  ENDED: "ENDED"
}

// HeiKai Config
export const MAX_HEIKAI = 10;
export const HEIKAI_FILLED_COLOR = "darkgrey";
export const HEIKAI_NOT_FILLED_COLOR = "white";

// Ditlin Config
export const MAX_DITLIN = 5;
export const DITLIN_FILLED_COLOR = "darkgrey";
export const DITLIN_NOT_FILLED_COLOR = "white";

// Game Config
export const MAX_FINISHED_LINE = 3;


export const NumState = {
  NONE: 'NONE',
  SKIPPED: 'SKIPPED',
  TAKEN: 'TAKEN'
};

export const ScoreDir = {
  UNKNOWN: 'UNKNOWN',
  DESC: 'DESC',
  ASC: 'ASC'
};

export class BoxColor {
  constructor(background, text, selectedBackground) {
    this.background = background;
    this.text = text;
    this.selectedBackground = selectedBackground;
  }

  getCopy() {
    return new BoxColor(this.background, this.text, this.selectedBackground);
  }
}

export const LineColor = [
  new BoxColor("#E86A58", "black", "#8d2313"), 
  new BoxColor("#FED45B", "black", "#ab8001"),
  new BoxColor("#1BB28C", "black", "#0d5946"),
  new BoxColor("#9BC7C5", "black", "#40716f"),
  new BoxColor("#EFEEEA", "black", "#868066")
]

export const LineScore = [-25, -25, -10, -5, 5, 10, 15, 25, 35, 50, 70, 90, 120];
