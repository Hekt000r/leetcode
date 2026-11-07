function getOppositeParen(p: string) {
  switch (p) {
    case "(":
      return ")";
    case "{":
      return "}";
    case "[":
      return "]";
    // close
    case ")":
      return "(";
    case "}":
      return "{";
    case "]":
      return "[";
  }
}

function isValid(s: string): boolean {
  class ParenHandler {
    parens: string[];
    notValid: boolean;

    constructor() {
      this.parens = [];
      this.notValid = false;
    }

    openParen(paren: string) {
      // opening parens is just always allowed
      this.parens.push(paren);
    }

    closeParen(paren: string) {
      //cant close empty
      if (this.parens.length === 0) {
        this.notValid = true;
        return;
      }
      // cannot close next paren without closing the previous one
      // ex.: ([)]
      // trying to close with ")" but the previous paren is "[" so you haave to do "]" first
      // do this check:
      // if previous (open) paren isnt the same as this (closing) paren then invalid
      const previousParen = this.parens[this.parens.length - 1];
      if (previousParen === getOppositeParen(paren)) {
        this.parens.pop();
      } else {
        this.notValid = true;
      }
    }
  }

  const _s = [...s];
  const parenHandler = new ParenHandler();

  for (let i = 0; i < _s.length; i++) {
    const char = _s[i];

    switch (char) {
      case "(":
        parenHandler.openParen("(");
        break;
      case "{":
        parenHandler.openParen("{");
        break;
      case "[":
        parenHandler.openParen("[");
        break;
      // close
      case ")":
        parenHandler.closeParen(")");
        break;
      case "}":
        parenHandler.closeParen("}");
        break;
      case "]":
        parenHandler.closeParen("]");
        break;
    }
  }

  return !parenHandler.notValid && parenHandler.parens.length === 0;
}
