var cart = [];

function addToCart(e) {
  console.log(document.styleSheets[0]);
  let st = document.styleSheets[0].cssRules[16];

  const itemToAdd = JSON.parse(e.target.value);

  const indexOfItem = cart.findIndex((item) => {
    return item.name === itemToAdd.name;
  });

  if (indexOfItem > -1) {
    cart[indexOfItem].quantity = cart[indexOfItem].quantity + 1;
  } else {
    cart.push(itemToAdd);
  }

  console.log(cart);

  const cartLength = cart.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity;
  }, 0);

  st.style.content = `"${String(cartLength)}"`;

  displayPrice();
  fillCart();

  console.log(
    `You added ${JSON.parse(e.target.value).name}. Cart is now ${cartLength}`
  );
}

var addButtons = document.getElementsByClassName("add-item-btn");

for (let i = 0; i < addButtons.length; i++) {
  addButtons[i].addEventListener("click", addToCart);
}

const cartCloseBtn = document.getElementById("cart-overview-close-btn");

const cartIcon = document.getElementById("cart");

function toggleCartOverview(e) {
  const cartOverviewContainer = document.getElementById(
    "cart-overview-container"
  );

  const displayValue = window
    .getComputedStyle(cartOverviewContainer)
    .getPropertyValue("display");

  const menuContainer = document.querySelector(".menu-container");

  if (displayValue === "flex") {
    cartOverviewContainer.style.display = "none";
    menuContainer.style.overflow = "scroll";
    menuContainer.style.filter = "blur(0)";
  } else {
    cartOverviewContainer.style.display = "flex";
    menuContainer.style.overflow = "hidden";
    menuContainer.style.filter = "blur(4px)";
  }
}

function calculateTotalPrice() {
  let totalPrice = cart.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price * currentValue.quantity;
  }, 0);

  return totalPrice.toFixed(2);
}

function displayPrice() {
  const priceDiv = document.getElementById("total-price");

  const totalPrice = calculateTotalPrice();

  priceDiv.innerHTML = `$${totalPrice}`;
}

function generateCartItemRow(item) {
  let { name, price, quantity } = item;

  return `<div class="cart-item-row-container"><p>${quantity}x ${name}</p><p>${(
    quantity * price
  ).toFixed(2)}</p></div>`;
}

function fillCart() {
  const cartOverviewItemsContainer = document.getElementById(
    "cart-overview-items-container"
  );

  let text = "";

  cart.forEach((item) => {
    text += generateCartItemRow(item);
  });

  cartOverviewItemsContainer.innerHTML = text;
}

cartCloseBtn.addEventListener("click", toggleCartOverview);

cartIcon.addEventListener("click", toggleCartOverview);
