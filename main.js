async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

chrome.tabs.onActivated.addListener(activeInfo => tabActivated(activeInfo));
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => tabUpdated(tabId, changeInfo, tab));

function tabActivated(activeInfo) {
    console.log("tabActivated: " + activeInfo);
}

function tabUpdated(tabId, changeInfo, tab) {
    console.log("URL: " + changeInfo.url);
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: doSomething
    }, results => scriptResult(results));
}

function doSomething() {
    console.log("doSomething");
    // if changeInfo.url is starting with "http://" or "https://"
    if (changeInfo.url.startsWith("http://") || changeInfo.url.startsWith("https://")) {
        const heading = document.getElementById("heading");
        if (heading) {
            heading.innerHTML = "Hello World!";
        }
        console.log("Heading: " + heading);
    }
}

function scriptResult(results) {
    console.log("scriptResult: " + results);
}
