// Example Iterator

function* createNumbers() {
  let n = 0
  while(true){
    yield n++
  }
}

let numbers = createNumbers()

for (let i = 0; i < 10; i++){
  console.log(i + " " + numbers.next().value)
}
