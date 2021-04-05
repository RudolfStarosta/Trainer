/**
 * Read data structure from JSON file and create corresponding objects
 */

const input = document.querySelector('input')        // get file name

let qac: {q: string, a: string, c: number}[] = [{a: "x", q: "y", c: 0}]     // array with answers, questions and the counter

// This event listener has been implemented to identify a
// change in the input section of the HTML code.
// It will be triggered when a file is chosen.

input!.addEventListener('change', doit) 

// doit() steers all the processing
// reading the input,
// doing the training and
// writing back the status of the training

async function doit(e: Event) {

  await readQuestionAndAnswers().then(doTraining)
  writeResult()

}

async function readQuestionAndAnswers() {
  let fileContent = await new Promise((resolve, reject)=> {
    // Get file name
    const file = input!.files![0]
    let reader = new FileReader()
    // Read from file
    reader.readAsText(file)
    // Event e = "file read"
    reader.onload = (e) => resolve(reader.result)
   }
  )
  console.log(fileContent)
  qac = JSON.parse(<string> fileContent)
}


function doTraining(){
  console.log('doTraining()')
  console.log('qac[2].a = ' + qac[2].a)

  // Write something to body
  var elem = document.createElement("div")
  var t = document.createTextNode('Some text in div')
  elem.appendChild(t)
  document.body.appendChild(elem)

}

function writeResult() {
  console.log('writeResult()')

  // Provide qac for download
  let resJSON = JSON.stringify(qac);
  let link: HTMLAnchorElement = <HTMLAnchorElement> document.getElementById('downloadlink')
  let data = new Blob([resJSON], {type: 'text/plain'})
  link.href = window.URL.createObjectURL(data)

}
