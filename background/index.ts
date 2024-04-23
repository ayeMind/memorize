export {}

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage()
})

chrome.runtime.onMessage.addListener((request) => {
  if (request === "showOptions") {
    chrome.runtime.openOptionsPage();
  } else if (request === "showCards") {
    chrome.tabs.create({
      url: "chrome-extension://joobomfpdpigjppgddobghoimknghicm/tabs/cards.html",
      active: true,
      selected: true
    });
  } else if (request === "showPlay") {
    chrome.tabs.create({
      url: "chrome-extension://joobomfpdpigjppgddobghoimknghicm/tabs/play.html",
      active: true,
      selected: true
    });
  }
})
