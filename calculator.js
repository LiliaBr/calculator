  }
  
  const operand1 = +matches[1];
  const operand2 = +matches[3];
  const operator = matches[2];
  
 switch (operator) {
    case '+': {
      result =operand1 + operand2;
      break;
    }
    case '-': {
      result = operand1 - operand2;
      break;
    }
    case '*': {
      result = operand1 * operand2;
      break;
    }
    case '/': {
      result = Math.floor(operand1 / operand2);
      break;
    }
    default: {
      throw new Error('Unknown operator');
    }
  }
  if (result < 0) {
    return " "
  }
  
  return isRoman ? intToRoman(result) : String(result);
}
