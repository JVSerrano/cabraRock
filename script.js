


// BANDS

let listNumRandom = []
function generateNumRandom() {
  let num
  do {
    num = Math.floor(Math.random() * 10) + 1
  } while (listNumRandom.indexOf(num) !== -1)
  listNumRandom.push(num)
  if (listNumRandom.length === 10) {
    listNumRandom.length = 0
  }
  return num
}



function showBands() {
  fetch('../bands.json')
    .then(response => {
      return response.json()
    })
    .then(value => {
      value.forEach(item => {
        let container = document.getElementById('cardsContainer')

        let card = document.createElement('div')
        card.className = 'container'

        let numRandom = generateNumRandom()
        let img = document.createElement('img')
        img.className = 'imgArtists'
        img.src = `/img/silueta${numRandom}.png`

        let inf = document.createElement('div')
        inf.className = 'infArtists'

        let name = document.createElement('h4')
        name.className = 'nameArtists'
        name.textContent = item.name

        let description = document.createElement('p')
        description.className = 'descriptionArtists'
        description.textContent = item.description

        card.appendChild(img)
        card.appendChild(inf)
        inf.appendChild(name)
        inf.appendChild(description)

        container.appendChild(card)

      })
    })
    .catch(error => {
      console.warn('Error al cargar el JSON' + error)
    })
}


function addNewArtist() {
  let inputName = document.getElementById('inputNameArtist').value
  let inputDescription = document.getElementById('inputDesArtist').value

  if (inputName !== "" && inputDescription !== "") {

    let container = document.getElementById('cardsContainer')

    let card = document.createElement('div')
    card.className = 'container'

    let numRandom = generateNumRandom()
    let img = document.createElement('img')
    img.className = 'imgArtists'
    img.src = `/img/silueta${numRandom}.png`

    let inf = document.createElement('div')
    inf.className = 'infArtists'

    let name = document.createElement('h4')
    name.className = 'nameArtists'
    name.textContent = inputName

    let description = document.createElement('p')
    description.className = 'descriptionArtists'
    description.textContent = inputDescription

    card.appendChild(img)
    card.appendChild(inf)
    inf.appendChild(name)
    inf.appendChild(description)

    container.appendChild(card)

    document.getElementById('inputNameArtist').value = ""
    document.getElementById('inputDesArtist').value = ""
  }
}


//SHOP

let cart = []
let itemCount = 0

function showSpan() {
  let shoppingList = document.getElementById('shoppingList');
  let displayStyle = window.getComputedStyle(shoppingList).getPropertyValue('display')

  if (displayStyle === 'none') {
    shoppingList.style.display = 'block';
  } else {
    shoppingList.style.display = 'none';
  }
}

function addToCart(itemName, itemPrice, button) {
  let card = button.parentElement.parentElement
  let sizeSelectect = card.querySelector('.size')
  let quantityInput = card.querySelector('.quantity')
  let size = sizeSelectect ? sizeSelectect.value : ''
  let quantity = parseInt(quantityInput.value)

  if (quantity > 0) {
    itemCount += quantity
    document.getElementById('shoppingCount').innerText = itemCount

    let existingItem = cart.find(item => item.name === itemName && item.size === size)
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({ name: itemName, price: itemPrice, size: size, quantity: quantity })
    }
    updateCart()
  }

}

function updateCart() {
  let cartItems = document.getElementById('cartItems')
  let cartTotal = document.getElementById('cartTotal')
  let total = 0

  let html = ''

  for (let i = 0; i < cart.length; i++) {
    let item = cart[i]
    let itemTotal = item.quantity * item.price
    total += itemTotal
    html += `<p>${item.name}: ${item.size} ${item.quantity} uds ${itemTotal}€</p>`
  }

  cartItems.innerHTML = html
  cartTotal.innerHTML = `<p>Total: ${total}€</p>`
}

function pay() {
  cart = []
  itemCount = 0
  document.getElementById('shoppingCount').innerText = itemCount;
  updateCart()
  showSpan()
  let quantityInputs = document.getElementsByClassName('quantity')
  for (let i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].value = ''
  }
}

function closePay(){
  showSpan()
}

// CONTACT

let emailPattern = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
let inputEmailContact = document.getElementById('inputEmailContact')
let inputNameContact = document.getElementById('inputNameContact')
let textMessageContact = document.getElementById('textMessageContact')

inputNameContact.addEventListener('keyup', () => {
  inputNameContact.style.border = "hidden"
})

textMessageContact.addEventListener('keypress', () => {
  textMessageContact.style.border = "hidden"
})

inputEmailContact.addEventListener('keyup', () => {
  if (emailPattern.test(inputEmailContact.value)) {
    inputEmailContact.style.border = "4px solid green"
  } else if (inputEmailContact.value === "") {
    inputEmailContact.style.border = "hidden"
  }
  else {
    inputEmailContact.style.border = "4px solid red"
  }
})

function sendEmail() {

  if (inputEmailContact.value !== "" && inputEmailContact.style.borderColor !== "red" && inputNameContact.value !== "" && textMessageContact.value !== "") {

    showMessagesendEmail()
  } else if (inputNameContact.value === "" && textMessageContact.value === "" && inputEmailContact.value === "") {
    inputNameContact.style.border = "4px solid red"
    textMessageContact.style.border = "4px solid red"
    inputEmailContact.style.border = "4px solid red"
  } else if (inputNameContact.value === "" && textMessageContact.value === "") {
    inputNameContact.style.border = "4px solid red"
    textMessageContact.style.border = "4px solid red"
  } else if (textMessageContact.value === "") {
    textMessageContact.style.border = "4px solid red"
  } else if (inputEmailContact.value === "") {
    inputEmailContact.style.border = "4px solid red"
  } else if (inputNameContact.value === "") {
    inputNameContact.style.border = "4px solid red"
  }
}

function showMessagesendEmail() {
  inputEmailContact.style.border = "hidden"
  inputNameContact.value = ""
  inputEmailContact.value = ""
  textMessageContact.value = ""

  let spanContact = document.getElementById('spanContact')
  let message = document.createElement('p')
  message.className = 'messageContact'

  message.innerHTML = `Mensaje enviado con exito <br> Pronto nos pondremos en contacto con usted`

  spanContact.appendChild(message)
  messageContainer.style.position= 'fixed'

  setTimeout(()=>{
    messageContainer.style.display='none'
  },2500)

}