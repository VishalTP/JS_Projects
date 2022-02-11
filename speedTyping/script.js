const sampleText = document.querySelector(".sampleText")
const textArea = document.querySelector("textarea")
const timer = document.querySelector(".timer")
const main = document.querySelector("main")
const section = document.querySelector("section")

let startTime 

const displayText = async ()=>{
    timer.innerHTML = 0
    startTime = Date.now()
    sampleText.innerHTML = ""
    parsedText = await fetchData()
    const textArray = parsedText.split("")
    textArray.forEach(element => {
        const span = document.createElement("span")
        span.innerText = element
        sampleText.appendChild(span)
    });
    startTimer()
}

const fetchData =async ()=>{
    const fetchedData = await fetch("https://api.quotable.io/random")
    const parsedData = await fetchedData.json()
    return await parsedData.content
}

displayText()

textArea.addEventListener("input", (e)=>{
    let correct = true
    const character = document.querySelectorAll("span")
    character.forEach((element,i)=>{
        if(textArea.value[i]===undefined){
            character[i].style.color= "black"  
            correct=false
        }else if(textArea.value[i]==element.innerText){
            character[i].style.color= "green"
        }else if(textArea.value[i]!=element.innerText){
            character[i].style.color= "red"
            correct = false
        }
    })  
    if(correct){
        clearInterval(time)
        textArea.value=""
        alert(`Your speed is ${(character.length/timer.innerHTML).toFixed(1)} letters/sec`)
        displayText()
    }
})

let time
function startTimer(){
    time = setInterval(() => {
        timer.innerHTML = Math.floor((Date.now()-startTime)/1000)
    }, 1000);

}


