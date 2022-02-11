const button = document.querySelector("button")
const tbody = document.querySelector("tbody")
const message = document.querySelector(".message")

const title = document.querySelector(".title input")
const author = document.querySelector(".author input")
const isbn = document.querySelector(".isbn input")

const getList = ()=>{
    let array = [...JSON.parse(localStorage.getItem("bookList"))]
    array.forEach(element=>{
        createTr(element.title, element.author, element.isbn)
    })
}

const updateList = (obj)=>{
    let array = []
    if(localStorage.length!=0)
        array = [...JSON.parse(localStorage.getItem("bookList"))]
    array.push(obj)
    updatedData = JSON.stringify(array)
    localStorage.setItem("bookList", updatedData)
}

const deleteList = (delEle)=>{
    const isbn =delEle.previousElementSibling.innerHTML
    delEle.parentNode.remove()
    let array = [...JSON.parse(localStorage.getItem("bookList"))]
    array.forEach((element, i)=>{
        if(array[i].isbn==isbn)
            array.splice(i, 1)
    })
    localStorage.setItem("bookList", JSON.stringify(array))
    displayMsg("Book Removed", "#78d478")
}

const createTr = (title, author, isbn)=>{
    const tr = document.createElement("tr")
    tr.innerHTML = `<td>${title}</td>
                    <td>${author}</td>
                    <td>${isbn}</td>`
    const delEle = document.createElement("td")
    delEle.innerHTML = `<i class="fas fa-window-close"></i>`
    tr.appendChild(delEle)
    tbody.appendChild(tr)
    delEle.addEventListener("click", ()=>{   
        deleteList(delEle)
    })
}

const displayMsg = (msg, color)=>{
    message.style.opacity = 1
    message.style.backgroundColor = color
    message.innerHTML = msg
    setTimeout(()=>{
        message.style.opacity = 0
    }, 2000)
}

button.addEventListener("click", ()=>{
    if(title.value && author.value && isbn.value){
        createTr(title.value, author.value, isbn.value)
        updateList({title:title.value, author: author.value, isbn: isbn.value})
        displayMsg("Book Added", "#78d478")
    }else{
        displayMsg("Please Enter all the feilds", "#f51625")  
    }
})

getList()