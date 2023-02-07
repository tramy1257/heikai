export const LINE_SIZE = 12;

// HeiKai Config
export const MAX_HEIKAI = 10;
export const HEIKAI_FILLED_COLOR = "darkgrey";
export const HEIKAI_NOT_FILLED_COLOR = "white";

// Ditlin Config
export const MAX_DITLIN = 5;
export const DITLIN_FILLED_COLOR = "darkgrey";
export const DITLIN_NOT_FILLED_COLOR = "white";


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
