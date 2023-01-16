type Operation = 'multiply' | 'add' | 'divide';

const multiplication = (a: number, b: number, printtext: string) => {
    console.log(printtext, a * b)
}

multiplication(2, 3, 'Multiplication of 2 and 3 is ')

const calculator = (a: number, b: number, op: Operation) => {

    if (op === 'multiply') {
      return a * b;
    } else if (op === 'add') {
      return a + b;
    } else if (op === 'divide') {
      if (b === 0) return 'this cannot be done';
      return a / b;
    }
}



calculator(5, 10, 'add')

