const modeButtons = document.querySelectorAll('.modeMenu-button')
const sizeRadios = document.getElementsByName('size')
const colorRadios = document.getElementsByName('color')
const canvas = document.querySelector('.canvas')

let canvasElements;
let squareSize;
let color;

start()

function start(){
    canvasElements = createGrid(16)
    changeGridSize()
    canvas.addEventListener('mouseover', addHoverEffect)
    changeColor()
    modeButtons.forEach(buttonActions)
}

function buttonActions(button){
    button.addEventListener('click', () => {
        switch(button.id){
            case 'eraserMode':
                color = 'white'
                break
            case 'clearMode':
                canvasElements.forEach((element) => {
                    element.setAttribute('style', `
                    background-color: white;
                    border: 1px solid black;
                    width: ${squareSize}px;
                    height: ${squareSize}px;`)
                })
                break
            case 'colorMode':
                if(colorRadios[0].checked)
                    color = 'red'
                else if(colorRadios[1].checked){
                    color = 'green'
                }
                else{
                    color = 'blue'
                }
                break
        }
    })
}

function addHoverEffect(){
    canvasElements.forEach((element) => {
        element.addEventListener('mouseover', () => {
            element.setAttribute('style', `
            background-color: ${color};
            border: 1px solid black;
            width:${squareSize}px;
            height:${squareSize}px;`)
        })
    })
}

function createGrid(size){
    squareSize = Math.sqrt(360000/(size*size)) - 2
    for(let i = 0; i < (size*size); i++){
        let element = document.createElement('div')
        element.classList.add('square')
        element.setAttribute('style', `
        border: 1px solid black;
        width:${squareSize}px;
        height:${squareSize}px;`)
        canvas.appendChild(element)
    }
    return document.querySelectorAll('.square')
}

function changeColor(){
    colorRadios.forEach((radio) => {
        radio.addEventListener('click', ()=> {
            color = radio.id
        })
    })
}

function changeGridSize(){
    sizeRadios.forEach((radio) => {
        radio.addEventListener('click', () => {
            resetGrid()
            canvasElements = createGrid(Number(radio.id))
        })
    })
}

function resetGrid(){
    while(canvas.firstChild){
        canvas.removeChild(canvas.lastChild)
    }
}
