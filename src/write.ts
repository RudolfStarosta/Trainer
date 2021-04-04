/**
 *  Provide object to be downloaded as JSON-file
 *
 */

(function () {
  // var textFile = window.URL.createObjectURL('none')
  var textFile: string = ''
  var makeTextFile = function (text: string) {
    var data = new Blob([text], {type: 'text/plain'})

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      console.error('Should never come here')
      window.URL.revokeObjectURL(textFile)
    }

    textFile = window.URL.createObjectURL(data)
    return textFile
  };

  var create  = document.getElementById('create'),
      textbox: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById('textbox')

  create!.addEventListener('click', function () {
    console.debug('Create file clicked')
    var link: HTMLAnchorElement = <HTMLAnchorElement> document.getElementById('downloadlink')
    link!.href = makeTextFile(textbox!.value)
    link!.style.display = 'block'
  }, false);

  // make sure file is revoked

})();
