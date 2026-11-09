class BinaryCalculator {
  A: string[];
  B: string[];
  minLength: number;
  carry: boolean;
  result: string[];
  finalResult: string;
  offsetA: number;
  offsetB: number;
  constructor(a: string, b: string) {
    this.A = [...a];
    this.B = [...b];
    this.minLength = Math.min(this.A.length, this.B.length);
    this.offsetA = this.A.length - this.minLength;
    this.offsetB = this.B.length - this.minLength
    this.carry = false;
    this.result = [];
    this.finalResult = "";
  
  }

  write(value: string) {
    this.result.splice(0, 0, value);
  }

  addDigits(digitA: string, digitB: string) {
    if (this.carry) {
      if (digitA === "1" && digitB === "1") {
        // 1 + 1 + 1
        this.write("1");
        this.carry = true;
        return;
      } else if (digitA === "0" && digitB === "0") {
        // 0 + 0 + 1
        this.write("1");
        this.carry = false;
        return;
      } else {
        // 1 + 0 + 1
        this.write("0");
        this.carry = true;
        return;
      }
    } else {
      if (digitA === "1" && digitB === "1") {
        // 1 + 1
        this.write("0");
        this.carry = true;
        return;
      } else if (digitA === "0" && digitB === "0") {
        // 0 + 0
        this.write("0");
        return;
      } else {
        this.write("1");
        return;
      }
    }
  }

  calculate() {
    for (let i = this.minLength - 1; i >= 0; i--) {
      const digitA = this.A[this.offsetA + i];
      const digitB = this.B[this.offsetB + i];

      this.addDigits(digitA, digitB);
    }

    if (this.A.length > this.minLength) {
      for (let i = this.A.length - this.minLength - 1; i >= 0; i--) {
        this.addDigits(this.A[i], "0");
      }
    } else if (this.B.length > this.minLength) {
      for (let i = this.B.length - this.minLength - 1; i >= 0; i--) {
        this.addDigits("0", this.B[i]);
      }
    }
    // append leftover carry

    if (this.carry) this.write("1");

    this.finalResult = this.result.join("");
  }
}

function addBinary(a: string, b: string): string {
  const binaryCalculator = new BinaryCalculator(a, b);
  binaryCalculator.calculate();

  return binaryCalculator.finalResult;
}
