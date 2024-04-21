export {}

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage()
})

chrome.runtime.onMessage.addListener((request) => {
  if (request === "showOptions") {
    chrome.runtime.openOptionsPage();
  } else if (request === "showCards") {
    window.open("chrome-extension://joobomfpdpigjppgddobghoimknghicm/tabs/cards.html")
  }
})
