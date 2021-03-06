const isInt = (n) => Number(n) === n && n % 1 === 0;
const isFloat = (n) => Number(n) === n && n % 1 !== 0;


const intToRoman = (num) => {
  if (isNaN(num)) {
    return NaN;
  }
  
  let digits = String(+num).split(''),
     roman = '',
     i = 3;
  const key = [
    '','C','CC','CCC','CD','D','DC','DCC','DCCC','CM',
    '','X','XX','XXX','XL','L','LX','LXX','LXXX','XC',
    '','I','II','III','IV','V','VI','VII','VIII','IX'
  ];

  while (i--) {
    roman = (key[+digits.pop() + (i * 10)] || '') + roman;
  }

  return Array(+digits.join('') + 1).join('M') + roman;
}

const romanToInt = (str) => {
  const roman = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let num = 0;
  
  for (let i = 0; i < str.length; i++) {
    const curr = roman[str[i]];
    const next = roman[str[i + 1]];
    (curr < next) ? (num -= curr) : (num += curr);
  }
  
  return num;
};

const calculator = (expression) => {
  const matches = expression.replace(/\s+/g, '').match(/^(^[\dCDMXLCIV]+(?:\.\d+)?)([+\-*/])([\dCDMXLCIV]+(?:\.\d+)?)$/);
  let isRoman = false,
      result;      
    
  if (!matches || matches.length !== 4) {
    throw new Error('Wrong expression')
  }
  
  if((isFloat(+matches[1])) || (isFloat(+matches[3]))) {
    	matches[1] = Math.floor(matches[1]);
      matches[3] = Math.floor(matches[3]);
  }
  
  if (!isInt(+matches[1])) {
    isRoman = true;
    matches[1] = romanToInt(matches[1]);
    matches[3] = romanToInt(matches[3]);
  }
    if ((matches[1] < 0 || matches[1] > 10) ||
      (matches[3] < 0 || matches[3] > 10)) {
    throw new Error('Big expression')
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
