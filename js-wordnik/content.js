window.addEventListener('mouseup', () => {
  let selectedText = window.getSelection().toString().trim()
  if (selectedText.length > 0 && selectedText.length < 20) {
    chrome.runtime.sendMessage(selectedText)
  } else {
    chrome.runtime.sendMessage('')
  }
})