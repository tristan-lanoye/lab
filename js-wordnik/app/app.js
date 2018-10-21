let backgroundPage = chrome.extension.getBackgroundPage()
let word = backgroundPage.word

// Function to download data to a file
function download(data, filename, type) {
  let file = new Blob([data], {
    type: type
  })
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, filename)
  } else {
    let link = document.createElement("a")
    let url = URL.createObjectURL(file)
    link.href = url
    link.download = filename
    link.appendChild(document.createTextNode(filename))
    document.body.appendChild(link)
  }
}

const render = (data, type) => {
  let element = document.createElement(type)
  element.appendChild(document.createTextNode(data))
  document.body.appendChild(element)
}

const fetchData = (url) => {
  fetch(url).then(res => {
    return res.json()
  }).then(data => {
    render(data[0].word, 'h1')
    render(data[0].text, 'p')
    download(data[0].text, 'definition.txt', 'text/plain')
  })
}

if (word != '') {
  let url = `http://api.wordnik.com:80/v4/word.json/${word}/definitions?limit=5
    &sourceDictionaries=all
    &useCanonical=true
    &includeTags=false
    &api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`
  url = url.replace(/\s+/g, '')
  fetchData(url)
} else {
  render('Select a word on the page', 'p')
}