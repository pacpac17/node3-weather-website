//console.log('Client side javascript file is loaded!')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

/*
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })

})*/

const buscarTiempo = (ciudad) => {
    fetch('http://localhost:3000/weather?address=' + ciudad ).then((response) => {
        response.json().then((data)=> {
            if (data.error) {
                //console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                // console.log(data.location)
                // console.log(data.forecast)
                messageOne.textContent = ''
                messageTwo.textContent = data.location + ' - ' + data.forecast
                
            }
        })

    })
}



let city = ''


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    city = search.value
    city = city.trim()

    console.log('Submited.....' + city)

    messageOne.textContent = ''
    messageTwo.textContent = ''
    
    if (city) {
        buscarTiempo(city)
    } else {
        //console.log('WTF?????')
        messageOne.textContent = 'Invalid search'
    }
})