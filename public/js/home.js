const body = document.querySelector('body')
const buttonChords = document.getElementById('chordsButton')
buttonChords.addEventListener('click', ()=>{
    listenChords()
})


function listenChords(){
    body.innerHTML = ""
    const textTyping = document.createElement('h2')
    textTyping.textContent = "make us a nice chords"
    textTyping.classList.add('chordsPageTitle')
    body.append(textTyping)
}