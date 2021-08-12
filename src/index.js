document.addEventListener('DOMContentLoaded', () => {
const tableContainer = document.getElementById('table-body')
const baseURL = 'http://localhost:3000'
const dogForm = document.getElementById('dog-form')
const dogName = document.getElementsByName('name')
const dogBreed = document.getElementsByName('breed')
const dogSex = document.getElementsByName('sex')
const submitButton = document.getElementById('')
let dogID = null





const renderDogs = (data) => {
    for (let i in data) {
        let dog = data[i]
        let tRow = document.createElement('tr')
        let tColFirst = document.createElement('td')
        let tColSecond = document.createElement('td')
        let tColThird = document.createElement('td')
        let editButton = document.createElement('button')
        
        tColFirst.textContent = dog.name
        tColSecond.textContent = dog.breed
        tColThird.textContent = dog.sex
        editButton.textContent = 'EDIT'

        
        tRow.appendChild(tColFirst)
        tRow.appendChild(tColSecond)
        tRow.appendChild(tColThird)
        tRow.appendChild(editButton)

        tableContainer.appendChild(tRow)

        editButton.addEventListener('click', () => {
            editPup(dog)
        })
        
    }
}
const editPup = (dog) => {
    dogName[0].value = dog.name
    dogBreed[0].value = dog.breed
    dogSex[0].value = dog.sex
    dogID = dog.id;
    
}

const fetchDogs = () => {
    fetch(`${baseURL}/dogs`)
    .then(response => response.json())
    .then(data => renderDogs(data))
}
const updateDogs = () => {
    console.log(dogName[0].value)
    fetch(`${baseURL}/dogs/${dogID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': dogName[0].value,
            'breed': dogBreed[0].value,
            'sex': dogSex[0].value
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        tableContainer.innerHTML = ''
        fetchDogs()
    })
}
fetchDogs()

dogForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    console.log(e.target)
    updateDogs()
})
})