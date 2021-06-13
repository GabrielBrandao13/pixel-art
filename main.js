let panel = document.querySelector('.painel')

let currentTool = 'pencil'

const tools = {
    pencil(pixel) {
        pixel.style.backgroundColor = pickCurrentColor()
        saveState()
    },
    erraser(pixel) {
        pixel.style.backgroundColor = 'rgb(255, 255, 255)'
        saveState()
    }
}

function changeTool(tool) {
    currentTool = tool
}
function setToolButtons() {
    let pencil = document.querySelector('.pencil'),
        erraser = document.querySelector('.erraser')

    let buttons = [pencil, erraser]
    function markSelectedTool(button) {
        for (let i in buttons) {
            buttons[i].style.backgroundColor = 'rgb(0, 0, 0)'
        }
        button.style.backgroundColor = 'rgb(36, 255, 72)'
    }
    function setButtonsSettings() {
        for (let i in buttons) {
            buttons[i].onclick = () => {
                changeTool(buttons[i].classList[1])
                markSelectedTool(buttons[i])
            }
        }
    }
    setButtonsSettings()
    markSelectedTool(pencil)
}

function renderPanel(width = 10, height = 10) {
    reloadPixels()
    panel.style.width = `${width * 40}px`
    panel.style.height = `${height * 40}px`
    for (let i = 0; i < width * height; i++) {
        let pixel = document.createElement('div')
        pixel.className = 'pixel'
        panel.appendChild(pixel)
    }
    configurePixels()
    configurePanelSize(width, height)
    // console.log(`Painel ${width}X${height} renderizado com sucesso!`)
}

function configurePixels() {
    let pixels = document.querySelectorAll('.pixel')
    for (let p in pixels) {
        if (pixels[p].className == 'pixel') {
            pixels[p].addEventListener('click', () => {
                tools[currentTool](pixels[p])
            })
            if (!pixels[p].style.backgroundColor) {
                pixels[p].style.backgroundColor = 'rgb(255, 255, 255)'
            }

        }


    }

}

function pickCurrentColor() {
    let colorPicker = document.querySelector('.color-picker')
    return colorPicker.value
}

function clear() {
    let pixels = document.querySelectorAll('.pixel')
    if (pixels) {
        for (let p in pixels) {
            if (pixels[p].className == 'pixel') {
                pixels[p].style.background = 'white'
            }

        }
    }

}
function reloadPixels() {
    let pixels = document.querySelectorAll('.pixel')
    if (pixels) {
        for (let i in pixels) {
            if (pixels[i].className == 'pixel') {
                panel.removeChild(pixels[i])
            }
        }
    }
}

function configurePanelSize(largura, altura) {
    let width = document.querySelector('.largura')
    let height = document.querySelector('.altura')
    let button = document.querySelector('.change-size')

    button.onclick = () => {
        if (confirm('Quer mesmo redimensionar a tela? Todo o progresso será perdido.')) {
            renderPanel(width.value, height.value)
            saveState()
        }
    }

    width.value = largura
    height.value = altura

}

function saveState() {
    let width = document.querySelector('.largura').value,
        height = document.querySelector('.altura').value
    var state = {
        color: [],
        size: [width, height]
    }
    var pixels = document.querySelectorAll('.pixel')

    for (let i in pixels) {
        if (pixels[i].style && pixels[i].style.backgroundColor) {
            state.color.push(pixels[i].style.backgroundColor)
        }
    }
    let strState = JSON.stringify(state)
    localStorage.setItem('state', strState)
}

function loadState() {
    let strState = localStorage.getItem('state')
    let state = JSON.parse(strState)

    if (state) {
        renderPanel(state.size[0], state.size[1])
        let pixels = document.querySelectorAll('.pixel')

        for (let i in pixels) {
            if (pixels[i].style && pixels[i].style.backgroundColor) {
                pixels[i].style.backgroundColor = state.color[i]
                // console.log(`carregando a cor ${state.color[i]}`)
            }
        }
    } else {
        renderPanel()
    }

}


setToolButtons()
loadState()