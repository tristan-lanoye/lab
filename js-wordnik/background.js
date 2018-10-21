chrome.runtime.onMessage.addListener(receiver)
window.word = undefined
function receiver(request, sender, sendResponse) {
  word = request
  console.log(word)
}