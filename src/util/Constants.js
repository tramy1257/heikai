export const LINE_SIZE = 12;

export const NumState = {
  NONE: 'NONE',
  SKIPPED: 'SKIPPED',
  TAKEN: 'TAKEN'
};

export class BoxColor {
  constructor(background, text) {
    this.background = background;
    this.text = text;
  }
}

export const LineColor = [
  new BoxColor("salmon", "black"), 
  new BoxColor("lightblue", "black"),
  new BoxColor("lightgreen", "black"),
  new BoxColor("khaki", "black"),
  new BoxColor("ivory", "black")
]
