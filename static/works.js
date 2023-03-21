// document.getElementById("1").classList.add("123","12313",123123)
fetch("static/work.json").then(response => response.json())
.then(data =>{
    const ids = [1,2]
    let idx = 0
    let counter = 0
    for (const obj of data) {
        if (counter === 3){ // this will keep the row with 3 elements to show
            idx++
            counter = 0
        }
        container(ids[idx],obj,data.length)
        counter++
    }
    quotes()
})

async function quotes() {
    const response = await fetch("https://animechan.vercel.app/api/random")
    const quote = await response.json()

    document.getElementById("quote").innerText = quote.quote
}

// Create the item
function container(id,obj,total=0) {
    const father = document.getElementById(id) // row of 3 items
    const container = document.createElement("div")
    container.classList.add("col-sm-4")
    
    const a = document.createElement("a")
    a.setAttribute("href",obj.href)
    a.classList.add("black-image-project-hover")

    const img = document.createElement("img")
    img.setAttribute("src",obj.src)
    img.classList.add("img-responsive")

    a.appendChild(img)
    container.appendChild(a)

    container.appendChild(childOfContainer(obj,total))
    father.appendChild(container)

}
// Div child of the item
function childOfContainer(obj,n) {
    const innnerChild = document.createElement("div")
    innnerChild.classList.add("card-container", "card-container-lg")

    const h4 = createAppend("h4",`${obj.id}/${n}`)

    const h3 = createAppend("h3",obj.projectName)

    const p = createAppend("p",obj.description)

    const a = createAppend("a","Discover")
    a.classList.add("btn","btn-default")
    a.setAttribute("href",obj.a)
    
    for (const el of [h4,h3,p,a]) {
        innnerChild.appendChild(el)
    }
    return innnerChild
}

// CREATE APPEND
function createAppend(element,value) {
    const el = document.createElement(element)
    el.appendChild(document.createTextNode(value))

    return el
}