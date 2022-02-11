const siteName = document.querySelector(".siteName input")
const siteUrl = document.querySelector(".siteUrl input")
const submit = document.querySelector(".submit button")
const list = document.querySelector(".list")

function deleteItem(div, siteName){
    let websites = localStorage.getItem("websites")
    let array = [...JSON.parse(websites)]
    array.forEach((element, i)=>{
        element.siteName===siteName? array.splice(i, 1):""
    })
    localStorage.setItem("websites", JSON.stringify(array))
    div.remove()
}

function getWebsites(){
    let websites = localStorage.getItem("websites")
    if(websites){
        let array = [...JSON.parse(websites)]
        array.forEach(element=>{
            createItem(element.siteName, element.siteUrl)
        })
    }
}

function saveWebsites(siteName, siteUrl){
    let array =[]
    let websites = localStorage.getItem("websites")
    if(websites)
        array = [...JSON.parse(websites)]
    array.push({siteName, siteUrl})
    localStorage.setItem("websites", JSON.stringify(array))
}

// function deleteWebsites(siteName, siteUrl){

// }

const createItem = (siteName, siteUrl)=>{
    const div = document.createElement("div")
    div.classList.add("item")
    div.innerHTML = `<div class="site">${siteName}</div>`

    const a = document.createElement("a")
    a.href = siteUrl
    a.innerHTML = `<button class="visit">Visit</button>`
    div.appendChild(a)

    const button = document.createElement("button")
    button.innerText = "Delete"
    button.classList.add("delete")

    div.appendChild(button)
    button.addEventListener("click", ()=>{
        deleteItem(div, siteName)
    })

    list.appendChild(div)
}

const updateList = (siteName, siteUrl)=>{
    createItem(siteName, siteUrl)
}

const validate = (siteName, siteUrl)=>{
    if(siteName ==="" || siteUrl ===""){
        alert("Please enter properly")
        return -1
    }else if(siteUrl.indexOf(".")==-1 || (siteUrl.length-siteUrl.lastIndexOf(".")-1)<2){
        alert("Invalid URL")
        return -1
    }
    if(siteUrl.indexOf("http://")==-1)
        siteUrl = "http://"+siteUrl
    updateList(siteName, siteUrl)
    return 1
}

submit.addEventListener("click", ()=>{
    let flag=1
    flag = validate(siteName.value, siteUrl.value)
    // updateList(siteName.value, siteUrl.value)
    if(flag===1)
        saveWebsites(siteName.value, siteUrl.value)
    siteName.value = "" 
    siteUrl.value = ""

})

getWebsites()