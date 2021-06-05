/**
 * Edit the answer and question catalog
 */

import { Qac } from './Trainer'

let lclQac : Qac                                     // local copy of questions and answers
let modDiv      = document.createElement('div')      // create a <div> element used to edit the catalog
let modDivCont  = document.createElement('div')      // content of the modal <div>
let modDivCls   = document.createElement('span')     // close button of the modal <div>
let modDivPar   = document.createElement('p')        // <p> to hold the content

// Arrange the modal div area
modDiv.style.display         = 'none'
modDiv.style.backgroundColor = 'rgba(0,0,0,0.5)'     // background black with opacity 0.4
modDiv.style.position        = 'absolute'
modDiv.style.top             = '0px'
modDiv.style.left            = '0px'
modDiv.style.height          = '100%'
modDiv.style.width           = '100%'
modDiv.style.zIndex          = '1'                   // top layer

// Modal content: Table of questions and answers
modDivCont.style.backgroundColor = '#fefefe'
modDivCont.style.margin          = '7% auto'
modDivCont.style.padding         = '17px'
modDivCont.style.width           = '83%'
modDivCont.style.height          = '75%'

// The paragraph
modDivPar.innerHTML              = '<h3>Question and Answer Catalog</h3>'

// The close button (x)
modDivCls.style.color      = '#aaa'
modDivCls.style.float      = 'right'
modDivCls.style.fontSize   = '28px'
modDivCls.style.fontWeight = 'bold'
modDivCls.innerHTML        = '&times;'
modDivCls.onmouseenter     = () => {modDivCls.style.color = '#000';
                                    modDivCls.style.cursor = 'pointer'
                                   }
modDivCls.onmouseleave     = () => {modDivCls.style.color = '#aaa'}
modDivCls.onclick          = () => {if (modDivPar.lastChild) modDivPar.removeChild(modDivPar.lastChild);
                                    modDiv.style.display = 'none'}

modDivCont.appendChild(modDivCls)
modDivCont.appendChild(modDivPar)
modDiv.appendChild(modDivCont)

document.body.appendChild(modDiv)

export function editCatalog(qac: Qac) : Qac {
  console.log('editCatalog()')

  let qacTable    = document.createElement('table')         // <table> to show the questions and answers
  let qacTblHead  = document.createElement('thead')         // table head corresponding to qacTable
  let qacTblBody  = document.createElement('tbody')         // table body corresponding to qacTable

  // Arrange Table
  qacTable.style.height    = window.innerHeight * 0.65 + 'px'
  qacTable.style.display   = 'block'
  qacTable.style.overflowY = 'scroll'
  qacTable.style.border    = '1px solid black'

  lclQac = qac                                              // get the local copy of qac

  modDivPar.appendChild(qacTable)                           // table is an element of the paragraph
//  qacTable.appendChild(qacTblHead)
  qacTable.appendChild(qacTblBody)

  let tr        = qacTblBody.insertRow(0)     // header row
  let thq       = tr.insertCell(0)            // header question
  thq.innerHTML = 'Question'

  let tha       = tr.insertCell(1)            // header answer
  tha.innerHTML = 'Answer'
  let thc       = tr.insertCell(2)            // header counter
  thc.innerHTML = 'Cnt'
  let the       = tr.insertCell(3)            // header edit
  the.innerHTML = 'Action'

//  qacTblHead.appendChild(tr)

  // The Table itself showing the qac array
  for (let i = 0; i < qac.length; i++) {
    let tr      = document.createElement('tr')              // row
    let tdq     = document.createElement('td')              // question cell
    let iQ      = document.createElement('textarea')        // input question
    let tda     = document.createElement('td')              // answer cell
    let iA      = document.createElement('textarea')        // input answer
    let tdc     = document.createElement('td')              // counter cell
    let iC      = document.createElement('textarea')        // input counter
    let tde     = document.createElement('td')              // edit cell
    let btnEdt  = document.createElement('button')          // create "Edit" button

    qacTblBody.appendChild(tr)

    // Question cell
    iQ.readOnly = true
    iQ.value = qac[i].q
    tdq.style.width = '46%'
    tdq.appendChild(iQ)
    tr.appendChild(tdq)

    // Answer cell
    iA.readOnly = true
    iA.value = qac[i].a
    tda.style.width = '46%'
    tda.appendChild(iA)
    tr.appendChild(tda)

    // Counter cell
    iC.readOnly = true
    iC.value = qac[i].c.toString()
    tdc.style.width = '4%'
    tdc.appendChild(iC)
    tr.appendChild(tdc)

    // Edit cell
    btnEdt.innerHTML = 'Edit'
    btnEdt.style.width = '75px'
    btnEdt.onclick = () => editRow(i)
    tde.style.width = '4%'
    tde.style.padding = '5px'
    tde.style.textAlign = 'center'
    tde.style.verticalAlign = 'center'
    tde.appendChild(btnEdt)
    tr.appendChild(tde)

  }

  modDiv.style.display = 'block'  // make the modal <div> visible

  return lclQac                   // return the local copy of qac
}

function editRow(i: number) {
  console.log('editRow()')

  let tbody = document.getElementsByTagName('tbody')
  let row   = document.getElementsByTagName('tr')[i + 1] // + 1 take into account the header row
  let cell  = row.firstChild

  // Question
  let textarea = <HTMLInputElement>cell!.firstChild
  textarea.readOnly = false

  // Answer
  cell     = cell!.nextSibling
  textarea = <HTMLInputElement>cell!.firstChild
  textarea.readOnly = false

  // Count 
  cell     = cell!.nextSibling
  textarea = <HTMLInputElement>cell!.firstChild
  textarea.readOnly = false

  // Button
  cell       = cell!.nextSibling
  let button = <HTMLInputElement>cell!.firstChild
  button.innerHTML = 'Save'
  button.style.backgroundColor = 'tomato'
  button.onclick = () => saveRow(i)

}

function saveRow(i: number) {
  console.log('saveRow()')

  let tbody = document.getElementsByTagName('tbody')
  let row   = document.getElementsByTagName('tr')[i + 1] // + 1 take into account the header row
  let cell  = row.firstChild

  // Question
  let textarea = <HTMLInputElement>cell!.firstChild
  textarea.readOnly = true
  console.log(textarea.value)
  lclQac[i].q = textarea.value

  // Answer
  cell     = cell!.nextSibling
  textarea = <HTMLInputElement>cell!.firstChild
  textarea.readOnly = true
  lclQac[i].a = textarea.value

  // Count 
  cell     = cell!.nextSibling
  textarea = <HTMLInputElement>cell!.firstChild
  textarea.readOnly = true
  lclQac[i].c = parseInt(textarea.value, 10)

  // Button
  cell       = cell!.nextSibling
  let button = <HTMLInputElement>cell!.firstChild
  button.innerHTML = 'Edit'
  button.style.backgroundColor = 'lightblue'
  button.onclick = () => editRow(i)

}
