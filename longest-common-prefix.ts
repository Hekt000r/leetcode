class LCPCalculator {
  strings: string[];
  max_length: number;
  min_length: number;
  _s: string[][]; // those strings converted to char-arrays
  terminated: boolean;
  position: number;
  prefix: string[];

  constructor(strings: string[]) {
    this.strings = strings;
    this.max_length = this.max_length = Math.max(
      ...strings.map((str) => str.length),
    );
    this.min_length = Math.min(...strings.map((str) => str.length)); // gets the length of the shortest string
    this._s = strings.map((string) => [...string]); // turns to array of chars
    this.terminated = false;
    this.position = 0;
    this.prefix = [];
  }

  step() {
    if (this.terminated) return;
    // make sure we're in bounds
    if (this.position >= this.min_length) return;

    // use .map to get the  x character of every string
    const firstChars = this._s.map((string) => string[this.position]);

    // now check if every element is the same
    const isEveryElementSame = firstChars.every(
      (firstCharAtI) => firstCharAtI === firstChars[0],
    );
    if (isEveryElementSame) {
      this.prefix.push(firstChars[0]);
    } else {
      this.terminated = true;
    }

    this.position++;
  }
}

function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 0) return "";
  const LCPHelper = new LCPCalculator(strs);

  while (!LCPHelper.terminated && LCPHelper.position < LCPHelper.min_length) {
    LCPHelper.step();
  }

  const prefixString = LCPHelper.prefix.join("");
  return prefixString;
}
