// const multiplicator = (a:number, b:number, printText:string) => {
//     console.log(printText, a * b); 
// }

// multiplicator(5, 4, 'Hello'); 

type Operation = 'multiply' | 'add' | 'divide'; 
type Result = number | string

const calculator1 = (a: number, b: number, op: Operation): Result => {
    if(op === 'multiply') {
        return a * b;
    } else if(op === 'add') {
        return a + b;
    } else if(op === 'divide') {
        if(b === 0) {
            return 'cannot divide by 0';
        }
        return a / b;
    }
}

const calculator2 = (a : number, b: number, op: Operation): Result => {
   switch(op) {
    case 'multiply':
        return a * b;
    case 'add': 
        return a + b; 
    case 'divide': 
        if(b === 0) throw new Error ('Cannot divide by 0');
        return a / b; 
    default: 
        throw new Error('Operation is not multiply, add or divide!')
   }
}

try {
    console.log(calculator2(5, 6, 'divide'))
} catch (error: unknown) {
    let errorMsg = 'Something went wrong! '
    if(error instanceof Error) {
        errorMsg += error.message
    }
    console.log(errorMsg)
}
