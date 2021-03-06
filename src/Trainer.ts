/**
 * Trainer provides a catalog of answers and questions.
 * In the training step it increments the counter by 1 in case a question is answered correctly.
 *
 * It reads the data structure from a JSON file and creates corresponding objects.
 *
 * It allows to save the current status via file download.
 *
 */

import { editCatalog } from './TrainerCatalog'                            // editing the question catalog is handled here

let qac: {q: string, a: string, c: number}[] = [{a: "x", q: "y", c: 0}]   // array with answers, questions and the counter
export type Qac = typeof qac

let actualQuestion: number = 0                                            // points to the actually processed question
const input = document.querySelector('input')                             // get file name

// Make sure user does not simply close the window
window.onbeforeunload = () => {return '-' }                               // Warn user, the text (-) is not used

// Window elements
let btnCtlg = document.createElement('button')                            // create a <button> element to edit the question and answer catalog
let btnDwld = document.createElement('button')                            // create a <button> element to download the actual question and answer catalog
let btnCtrl = document.createElement('button')                            // create a <button> element to control process
let btnOK   = document.createElement('button')                            // create a <button> element in case answer was correct
let txa     = document.createElement('textarea')                          // creat a <textarea> element

// Arrange the buttons
btnCtrl.style.backgroundColor = 'lightgrey'

btnCtlg.style.display         = 'inline'
btnCtlg.innerHTML             = 'Edit catalog'
btnCtlg.onclick = (e) => qac = editCatalog(qac)

btnDwld.style.display         = 'none'
btnDwld.innerHTML             = 'Save Status'
btnDwld.onclick               = downloadStatus

btnOK.style.backgroundColor   = 'lightgreen'
btnOK.style.display           = 'none'
btnOK.innerHTML               = 'Knew it :)'
btnOK.onclick                 = () => {}

// Arrange the text area
txa.style.display   = 'block'
txa.cols            = 120
txa.rows            = 7
txa.readOnly        = true

// Connect Ctrl-Button to file-input-field
btnCtrl.innerHTML     = 'Get questions'
btnCtrl.onclick       = () => {document.getElementById('getFile')!.click()}
btnCtrl.style.display = 'block'

// Arrange document
document.body.appendChild(btnCtlg)
document.body.appendChild(btnDwld)
document.body.appendChild(txa)
document.body.appendChild(btnCtrl)
document.body.appendChild(btnOK)
btnCtrl.focus()                        // Default to control button

// This event listener has been implemented to identify a
// change in the input section of the HTML code.
// It will be triggered when a file is chosen.

input!.addEventListener('change', doit) 

// doit() steers all the processing
// reading the input,
// doing the training and

function doit(eD: Event) {
  readQuestionsAndAnswers().
    then(doTraining).
    catch((eT) => {console.log(eT); console.log('Fehler beim Lesen der Fragen :-(')})
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
  qac.sort((a,b) => {return(a.c - b.c)})
  // Switch on the download button
  btnDwld.style.display = 'inline'
}

function doTraining(){
  console.log('doTraining()')
  showQuestion()                             // Show first question
}

function showQuestion() {
  console.log('showQuestion()')
  if (actualQuestion < qac.length) {
    btnOK.style.display = 'none'
    btnCtrl.innerHTML = 'Show answer'
    btnCtrl.onclick = showAnswer
    btnCtrl.focus()                        // Default to control button

    txa.innerHTML = txa.innerHTML + '-> ' + 
                    (actualQuestion + 1)    +
                    '. | ' + qac[actualQuestion].c + ' times known <-\n'
    txa.innerHTML = txa.innerHTML + 'Q: ' + qac[actualQuestion].q + '\n'
    txa.scrollTop = txa.scrollHeight       // Stay at the bottom of the text area 
  }
  else
  {
    // Training is over, prepare the next run
    btnCtrl.onclick = startNewRun
    btnCtrl.innerHTML = 'Start over'
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

    txa.innerHTML = txa.innerHTML + 'A: ' + qac[actualQuestion].a + '\n\n'
    txa.scrollTop = txa.scrollHeight       // Stay at the bottom of the text area 
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
}

function startNewRun() {
  // Initialize next run
  txa.innerHTML  = ''
  actualQuestion = 0 // reset actualQuestion pointer
  showQuestion()     // show first question
}

function downloadStatus() {
  console.log('downloadStatus()')
  // create a <a> element to download the actual status
  let anchor  = document.createElement('a')
  anchor.download = 'trainer.json'
  // write the array with questions and answers to an downloadable blob
  let resultJSON = JSON.stringify(qac);
  let data = new Blob([resultJSON], {type: 'application/json'})
  // revoke previously created anchor.href to prevent from memory leakage 
  if (anchor.href !== null) {
    console.log('revoking previously created URL')
    window.URL.revokeObjectURL(anchor.href)
  }
  anchor.href = window.URL.createObjectURL(data)
  console.log(anchor.href)
  anchor.click()
}
