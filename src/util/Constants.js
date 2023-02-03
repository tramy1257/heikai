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
  constructor(background, text) {
    this.background = background;
    this.text = text;
  }

  getCopy() {
    return new BoxColor(this.background, this.text);
  }
}

export const LineColor = [
  new BoxColor("salmon", "black"), 
  new BoxColor("lightblue", "black"),
  new BoxColor("lightgreen", "black"),
  new BoxColor("khaki", "black"),
  new BoxColor("ivory", "black")
]
