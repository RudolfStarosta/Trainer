/**
 * Read data structure from JSON file and create corresponding objects
 */

const input = document.querySelector('input')        // get file name

const textarea = document.querySelector('textarea')  // textarea to display file content

 let qac: {q: string, a: string, c: number}[] = [{a: "x", q: "y", c: 0}]     // array with answers, questions and the counter

// This event listener has been implemented to identify a
// Change in the input section of the HTML code
// It will be triggered when a file is chosen.
input!.addEventListener('change', (e) => {
  console.info("const input =")
  console.info(input)
  
  console.warn("event e =")
  console.warn(e)

  const files = input!.files

  if (files) {
    /* If any further modifications have to be made on the
       extracted text. The text can be accessed using the
       file variable. But since this is const, it is a read
       only variable, hence immutable. To make any changes,
       changing const to var, here and in the reader.onload
       function would be advisible
    */

    const file = files[0]
    const reader = new FileReader()
    
    // Read it
    reader.readAsText(file)

    // Event e = "file read"
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
        console.log('hasOwnProperty = ' + Object.prototype.hasOwnProperty.call(obj, key))
        const set = obj[key]

        for (const prop in set) {
          // skip loop if the property is from prototype
          if (!set.hasOwnProperty(prop)) continue

          // get answers and question objects
          console.log(set[prop])
          qac.push(set[prop])
        }
      }

      alert(qac[2].q + '\n' +
            qac[2].a + '\n' +
            qac[2].c)
    }

    reader.onerror = (e) => alert(e!.target!.error!.name)

  }
})
