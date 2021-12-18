const words = {
    "unit": "an individual thing",
    "resources": "a stock or supply of assets"
}

const doneMarking = total => {
    console.log("done marking.", "marked:", total)
}

const marked = markedDOM => {
    console.log("marked:", markedDOM.innerText)
    // update the markedDOM to add meaning to the marked worked
    const description = words[markedDOM.innerText.toLowerCase()]
    const meaningSpan = document.createElement("span")
    meaningSpan.className = "meaning"
    meaningSpan.innerHTML = description
    if (description) {
        markedDOM.appendChild(meaningSpan)
    }
}

const markOptions = {
    "className": "marked",
    "accuracy": "exactly",
    "done": doneMarking,
    "each": marked
}

window.onload = (event) => {
    console.log("window loaded")

    const span = document.createElement("span")
    span.setAttribute("id", "replacer")
    span.style.display = "none"
    document.body.appendChild(span)
    console.log('document updated')

    const markInstance = new Mark(document.getElementById("content"))
    for (var word in words) {
        markInstance.mark(word, markOptions)
    }
}

window.onmouseup = (event) => {
    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    const text = selection.toString()
    if (text.length > 0) {
        const span = document.getElementById("replacer")
        span.style.display = "block"
        span.style.position = "fixed"
        span.style.left = rect.left + "px"
        span.style.top = rect.top + rect.height + "px"
        span.style.backgroundColor = "rgba(200, 180, 255, 0.5)"
        span.style.border = "1px solid black"
        span.style.padding = "5px"
        span.style.zIndex = "9999"
        span.innerHTML = text + " selected"
    } else {
        const span = document.getElementById("replacer")
        span.style.display = "none"
    }

}

const getResource = (path) => {
    return chrome.runtime.getURL(path)
}

// window.getSelection().toString() returns the selection
// window.getSelection().getRangeAt(0).getBoundingClientRect() returns the axis of the selection
// window.getSelection().getRangeAt(0).getBoundingClientRect().top ↓
// window.getSelection().getRangeAt(0).getBoundingClientRect().left →
// window.getSelection().getRangeAt(0).getBoundingClientRect().width ↔
// window.getSelection().getRangeAt(0).getBoundingClientRect().height ↕
