window.onload = (event) => {
    console.log("onLoad")
    const heading = document.getElementById('productTitle')
    console.log(heading.innerHTML)
    heading.innerHTML = "Hello World!"
}
