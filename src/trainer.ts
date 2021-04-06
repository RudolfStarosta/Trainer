/**
 * Read data structure from JSON file and create corresponding objects
 */

const input = document.querySelector('input')        // get file name

let qac: {q: string, a: string, c: number}[] = [{a: "x", q: "y", c: 0}]     // array with answers, questions and the counter
let actualQuestion: number = 0                                              // hold the actual processed question
let btnCtrl = document.createElement('button');                             // create a <button> element to control process
let btnOK   = document.createElement('button');                             // create a <button> element in case answer was correct
let txa     = document.createElement('textarea')                            // creat a <textarea> element

// Arrange the text area
txa.cols = 120
txa.rows = 3 

// Arrange the buttons
btnCtrl.style.backgroundColor = 'lightgrey'
btnCtrl.style.display         = 'none'

btnOK.style.backgroundColor = 'lightgreen'
btnOK.style.display         = 'none'
btnOK.innerHTML             = 'Knew it :)'
btnOK.onclick               = () => {}

// Arrange document
document.body.appendChild(txa)
document.body.appendChild(btnCtrl)
document.body.appendChild(btnOK)

// This event listener has been implemented to identify a
// change in the input section of the HTML code.
// It will be triggered when a file is chosen.

input!.addEventListener('change', doit) 

// doit() steers all the processing
// reading the input,
// doing the training and
// writing back the status of the training

function doit(e: Event) {
  // Initialize next run
  txa.innerHTML         = ''
  actualQuestion        = 0
  btnCtrl.style.display = 'block'
  readQuestionsAndAnswers().
    then(doTraining).
    catch((e) => {console.log(e); console.log('Fehler beim Lesen der Fragen :-(')})

}

async function readQuestionsAndAnswers() {
  let fileContent = await new Promise((resolve, reject) => {
    // Get file name
    const file = input!.files![0]
    let reader = new FileReader()
    // Read from file
    reader.readAsText(file)
    // Event e = "file read"
    reader.onload = (e) => resolve(reader.result)
    // Event e = "error"
    reader.onerror = (e) => reject(e)
  }
  )
  console.log(fileContent)
  qac = JSON.parse(<string> fileContent)
}


function doTraining(){
  console.log('doTraining()')
  writeResult()                              // initialize BLOB for download   
  showQuestion()                             // Show first question
}

function showQuestion() {
  console.log('showQuestion()')
  if (actualQuestion < qac.length) {
    btnOK.style.display = 'none'
    btnCtrl.innerHTML = 'Show answer'
    btnCtrl.onclick = showAnswer

    txa.innerHTML = txa.innerHTML + 'Q: ' + qac[actualQuestion].q + ' '
    txa.scrollTop = txa.scrollHeight       // Stay at the bottom of the text area 
  }
  else
  {
    btnCtrl.style.display = 'none'
    btnOK.style.display = 'none'
    txa.innerHTML = txa.innerHTML + '\nAll questions processed. Save the result.\n'
    txa.scrollTop = txa.scrollHeight       // Stay at the bottom of the text area 
    return
  }
}

function showAnswer() {
  if (actualQuestion < qac.length) {
    btnCtrl.innerHTML = 'Did not know'
    btnCtrl.onclick = () => {actualQuestion++; showQuestion()} // Go to next question in case the answer was not known 
    btnOK.onclick = incrementCounter 
    btnOK.style.display = 'inline'

    txa.innerHTML = txa.innerHTML + 'A: ' + qac[actualQuestion].a + '\n'
  }
  else
  {
    alert('You should never have come here! Contact the author of this program.')
    return
  }
}

function incrementCounter() {
  qac[actualQuestion].c++
  actualQuestion++
  showQuestion()
  writeResult()
}

function writeResult() {
  console.log('writeResult()')

  // Provide qac for download
  let resultJSON = JSON.stringify(qac);
  let link: HTMLAnchorElement = <HTMLAnchorElement> document.getElementById('downloadlink')
  let data = new Blob([resultJSON], {type: 'application/json'})
  link.href = window.URL.createObjectURL(data)

}
