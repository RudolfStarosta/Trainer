/**
 * Edit the answer and question catalog
 */

import { Qac } from './Trainer'

let modDiv      = document.createElement('div')                  // create a <div> element used to edit the catalog
let modDivCont  = document.createElement('div')                  // content of the modal <div>
let modDivCls   = document.createElement('span')                 // close button of the modal <div>
let modDivPar   = document.createElement('p')                    // <p> to hold the content
let qacTable    = document.createElement('table')                // <table> to show the questions and answers
let qacTblBody  = document.createElement('tbody')                // table body corresponding to qacTable

// Arrange the modal div area
modDiv.style.display         = 'none'
modDiv.style.backgroundColor = 'rgba(0,0,0,0.4)'
modDiv.style.position        = 'absolute'
modDiv.style.top             = '0px'
modDiv.style.left            = '0px'
modDiv.style.height          = '100%'
modDiv.style.width           = '100%'
modDiv.style.zIndex          = '1'                   // top layer

// Modal content: Table of questions and answers
modDivCont.style.backgroundColor = '#fefefe'
modDivCont.style.margin          = '7% auto'
modDivCont.style.border          = '1px solid #888'
modDivCont.style.padding         = '17px'
modDivCont.style.width           = '80%'

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
modDivCls.onclick          = () => {modDiv.style.display = 'none'}

qacTable.appendChild(qacTblBody)
modDivPar.appendChild(qacTable)
modDivCont.appendChild(modDivCls)
modDivCont.appendChild(modDivPar)
modDiv.appendChild(modDivCont)

document.body.appendChild(modDiv)

export function editCatalog(qac: Qac) {
  console.log('editCatalog()')
  // The Table itself showing the qac array
  qacTable.border = '1'   // borderise the table
  for (let i = 0; i < 3; i++) {
    let tr       = document.createElement('tr')              // row
    let tdq      = document.createElement('td')              // question cell
    let iQ       = document.createElement('textarea')        // input question
    let tda      = document.createElement('td')              // answer cell
    let tdc      = document.createElement('td')              // counter cell
    let tde      = document.createElement('td')              // edit cell
    let btnEdt   = document.createElement('button')          // create "Edit" button

    qacTblBody.appendChild(tr)

    // Question cell
    iQ.cols = 53
    iQ.readOnly = true
    iQ.style.resize = 'none'
    iQ.value = qac[i].q
    tdq.width = '45%'
    tdq.appendChild(iQ)
    tr.appendChild(tdq)

    tda.width = '45%'
    tda.appendChild(document.createTextNode(qac[i].a))
    tr.appendChild(tda)

    tdc.width = '4%'
    tdc.appendChild(document.createTextNode(qac[i].c.toString()))
    tr.appendChild(tdc)

    btnEdt.innerHTML = 'Edit'
    tde.width = '6%'
    tde.style.textAlign = 'center'
    tde.style.verticalAlign = 'center'
    tde.appendChild(btnEdt)
    tr.appendChild(tde)

  }

  modDiv.style.display = 'block'
}

