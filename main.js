const textarea = document.querySelector("#textarea");
const btnRecord = document.querySelector("#btnRecord");
const btnStop = document.querySelector("#btnStop");
const btnDownload = document.querySelector("#btnDownload");
const btnTrash = document.querySelector("#btnTrash");

class speechApi {

    constructor() {

        const SpeechToText = window.SpeechRecognition || window.webkitSpeechRecognition

        this.speechApi = new SpeechToText()
        this.output = textarea.output
        this.speechApi.continuous = true
        this.speechApi.lang = "pt-BR"

        this.speechApi.onresult = (e) => {
            var resultIndex = e.resultIndex
            var transcript = e.results[resultIndex][0].transcript

            textarea.value += transcript
        }
    }

    start() {
        this.speechApi.start()
    }

    stop() {
        this.speechApi.stop()
    }
}

var speech = new speechApi()

btnRecord.addEventListener("click", e => {
    btnRecord.disabled = true
    btnStop.disabled = false
    speech.start()
})

btnStop.addEventListener("click", () => {
    btnRecord.disabled = false
    btnStop.disabled = true
    speech.stop()
})

btnDownload.addEventListener('click', () => {
    var text = textarea.value
    var filename = "speech.txt"

    download(text, filename)
})

function download(text, filename) {
    var element = document.createElement('a')

    element.setAttribute('href', 'data:text/plaincharset=utf-8,' + encodeURIComponent(text))

    element.setAttribute('download', filename)

    element.style.display = 'none'

    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
}

btnTrash.addEventListener("click", () => {
    textarea.value = ""
    btnRecord.disabled = false
    btnStop.disabled = true
    speech.stop()
})
