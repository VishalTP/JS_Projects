const cells = document.querySelectorAll(".cells")

for(let i=0; i<6; i++){
    const button = document.createElement("button")
    button.innerText = `Item ${i+1}`
    button.draggable = "true"
    cells[0].appendChild(button)
    
}

const buttons = document.querySelectorAll("button")
let draggedItem
Array.from(buttons).forEach(button=>{
    button.addEventListener("dragstart", ()=>{
        draggedItem = button
        setTimeout(()=>{
            button.style.display = "none"
        },0)
    })
})

Array.from(buttons).forEach(button=>{
    button.addEventListener("dragend", ()=>{
        setTimeout(()=>{
            button.style.display = "inline-block"
        },0)
    })
})

const item = buttons
Array.from(cells).forEach(cell=>{
    cell.addEventListener("dragover", e=>e.preventDefault())
    cell.addEventListener("dragenter", ()=>{
        cell.style.backgroundColor = 'rgba(0, 0, 0, .2)'
    })
    cell.addEventListener("dragleave", ()=>{
        cell.style.backgroundColor = 'rgba(0, 0, 0, .1)'
    })
    cell.addEventListener("drop", ()=>{
        console.log("drop")
        cell.appendChild(draggedItem)
    })
})

