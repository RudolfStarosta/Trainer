// Overlaoding
type Log = {
  (input: string): void  // void is the return type ?
  (input: number): void
}

let log: Log = (
 input: string | number
) => {
  if (typeof input === 'string'){
    console.log('It is a string ' + input)
  }
  else if (typeof input === 'number'){
    console.log('It is a number ' + input)
  }
}

log("Schubbi")

log(8)

