const input = document.querySelector('input')

const textarea = document.querySelector('textarea')

// let qac: {q: string, a: string, c: string}[] // array with answers, questions and the counter
let qac = [{q: "Question 1", a: "Answer 1", c: "0"}]
// This event listener has been implemented to identify a
// Change in the input section of the html code
// It will be triggered when a file is chosen.
input!.addEventListener('change', () => {
  const files = input!.files

  if (files) {
    /* If any further modifications have to be made on the
extracted text. The text can be accessed using the
file variable. But since this is const, it is a read
only variable, hence immutable. To make any changes,
changing const to var, here and In the reader.onload
function would be advisible */
    const file = files[0]

    const reader = new FileReader()

    reader.onload = (e) => {
      const file = e!.target!.result

      // This is a regular expression to identify carriage
      // returns and line breaks
      const lines = (<string>file!).split(/\r\n|\n/)
      textarea!.value = lines!.join('\n')

// retrieve answers and questions array from file
const obj = JSON.parse(<string>file)

console.log(obj)
console.log('obj.qa[0].a = ' + obj.qa[0].a)
console.log('obj.qa[0].q = ' + obj.qa[0].q)
console.log('obj.qa[0].c = ' + obj.qa[0].c)

for (const key in obj) {
  console.log(key + ' = ' + obj[key])
  if (!Object.prototype.hasOwnProperty.call(obj, key) || key === 'comment') continue
  console.log('hasOwnProperty = ' + obj.hasOwnProperty(key))
  const set = obj[key]

  for (const prop in set) {
    // skip loop if the property is from prototype
    if (!set.hasOwnProperty(prop)) continue

    // your code
    console.log(set[prop])
    qac.push(set[prop])
  }
}
      alert(qac[0].q + '\n' +
            qac[0].a + '\n' +
            qac[0].c)
    }

    reader.onerror = (e) => alert(e!.target!.error!.name)

    reader.readAsText(file)
  }
})
