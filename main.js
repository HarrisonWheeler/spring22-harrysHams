console.log('main.js linked')

let items = [
  {
    id: 1,
    name: 'The Original',
    description: 'What made us (in)famous.... with hospitals...',
    price: 27.99,
    img: './assets/krabby-patty.jpg'
  },
  {
    id: 2,
    name: 'The Master Cheese',
    description: 'Gonna need a bigger napkin. Its literally just cheese',
    price: 31.99,
    img: './assets/hamandcheese.jpeg'
  },
  {
    id: 3,
    name: 'The Equatorial Texas',
    description: 'You are intrigued but not sure why',
    price: 35.99,
    img: './assets/grossburger.webp'
  },
  {
    id: 4,
    name: 'The Hamm',
    description: 'Its literally just a side a hamm - definitely not from costco',
    price: 41.99,
    img: './assets/ham.jpg'
  },
]

let cart = []

let budget = 100

let total = 0

function drawItems() {
  // without lambda
  // items.forEach(function (item) {
  //   console.log('item in foreach', item)
  // })
  let template = ''
  items.forEach(item => {
    template += /*html*/ `
    <div class="col-md-6 my-2">
      <div class="bg-light rounded rounded shadow">
        <img src="${item.img}" class="rounded-top" alt="" title="${item.name}">
        <div class="d-flex p-2">
          <h6>${item.name}</h6>
          <h6 class="ms-auto"> ${item.price}</h6>
        </div>
        <p class="p-2">${item.description}</p>
        <div class="d-grid gap-2">
          <button class="btn btn-info" onclick="addToCart(${item.id})">Add To Cart</button>
        </div>
      </div>
    </div>
    `
  })
  // console.log('template string', template)
  document.getElementById('items').innerHTML = template
}

function drawCart() {
  let subTotal = 0
  let template = ''
  // NOTE c == individual cart item
  cart.forEach((c, index) => {
    template += /*html*/ `
    <div class="row">
      <div class="col-12">
        <div class="d-flex align-items-center p-4">
          <h6>${c.name}</h6>
          <h6 class="ms-3" >${c.price}</h6>
          <i class="mdi mdi-delete ms-auto selectable" onclick="removeCartItem(${index})"></i>
        </div>
      </div>
    </div>`
    Math.floor(subTotal += c.price)
  })
  console.log('subtotal', subTotal);
  document.getElementById('cart').innerHTML = template
  document.getElementById('total').innerText = subTotal
}

function addToCart(itemId) {
  console.log('item id', itemId);
  let foundItem = items.find(item => item.id == itemId)
  cart.push(foundItem)
  total += foundItem.price
  console.log('cart', cart);
  // Must call the other function for it to work!
  // NOTE should refactor this into its own function
  if (cart.length >= 1) {
    document.getElementById('purchase').disabled = false
  }
  drawCart()
  playSpecial()
}

// NOTE this itemIndex is coming from the draw, where we access it from the iteration
function removeCartItem(index) {
  // const foundCartItemIndex = cart.findIndex(item => item.id == itemId)
  // NOTE filter is another way of handling a delete - but wont work as well without unique id's
  // cart = cart.filter(item => item.id !== itemId)
  // grabbing the cartItem by its index, and subtracting the price from the total to "refund" that amount
  const cartItem = cart[index]
  total -= cartItem.price
  cart.splice(index, 1)
  console.log('after filter', cart);
  if (cart.length == 0) {
    document.getElementById('purchase').disabled = true
  }
  drawCart()
}

function purchase() {
  console.log('total price in purchase', total)
  if (budget > total) {
    budget -= total
    total = 0
    cart = []
    window.alert(`Thank you for your purchase - have fun in the hospital. Your burdget is now ${budget}`)
  } else {
    window.alert('Imma call security')
  }
  drawCart()
}

drawItems()

// #region
function playSpecial() {
  let filteredItems = cart.filter(s => s.name == "The Hamm")
  if (filteredItems.length >= 10) {
    playJohnCena()
  }
}

function playJohnCena() {
  let clipToPlay = document.getElementById('john-cena')
  clipToPlay.play()
  goHam()
  setTimeout(() => {
    clipToPlay.pause()
  }, 6000)
}

// Adds spin effect to all divs

function goHam() {
  setTimeout(() => {
    // NOTE this will go and grab all descendants of any div element, iterate over all of them, and apply the css class of 'shake'
    // document.querySelectorAll('div').forEach(d => d.classList.add('spin'))
    document.querySelectorAll('div').forEach(d => d.classList.add('shake'))
  }, 2000)

  setTimeout(() => {
    // document.querySelectorAll('div').forEach(d => d.classList.remove('spin'))
    document.querySelectorAll('div').forEach(d => d.classList.remove('shake'))
  }, 6000)

}
// #endregion