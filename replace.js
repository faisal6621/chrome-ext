window.onload = (event) => {
    console.log("window loaded")
    const markJsPath = getResource('./lib/mark.es6.js')
    console.log(markJsPath)

    const importMarkJs = document.createElement('script')
    importMarkJs.setAttribute('type', 'module')
    importMarkJs.setAttribute('integrity', 'sha256-ArnOhqhsa/eII4oru6nNsb4c2avLzJ9d26MLtkUeUx8=')
    importMarkJs.innerHTML = `import Mark from '${markJsPath}'`
    document.body.appendChild(importMarkJs)

    const span = document.createElement("span")
    span.setAttribute("id", "replacer")
    span.style.display = "none"
    document.body.appendChild(span)
    console.log('document updated')

    const markInstance = new Mark(document.getElementById("content"))
    markInstance.mark("unit")
}

window.onmouseup = (event) => {
    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    const text = selection.toString()
    if (text.length > 0) {
        const span = document.getElementById("replacer")
        span.style.display = "block";
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
        span.style.display = "none";
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
