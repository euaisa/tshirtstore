if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

// Cart functionality:

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);

    //   Adding new reviews to the DOM:

    var form = document.getElementById("reviewForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var name = document.getElementById("nameInput").value;
        var rating = document.getElementById("ratingInput").value;
        var comment = document.getElementById("commentInput").value;

        var review = new Review(name, rating, comment);
        reviews.push(review);

    });

    var button = document.getElementById("displayButton");
    button.addEventListener("click", displayReviews);
    // Show the initial list of coupons
    showCouponList();
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

    alert('Item was added.')
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}





// Constructor function for creating the Review Objects:

function Review(name, rating, comment, product) {
    this.name = name;
    this.rating = rating;
    this.comment = comment;
    this.product = product;
  }
  
  var reviews = [];
  
  function addReview() {
    var nameInput = document.getElementById("name");
    var ratingInput = document.getElementById("rating");
    var commentInput = document.getElementById("comment");
    var productInput = document.getElementById("product");
  
    var name = nameInput.value;
    var rating = parseInt(ratingInput.value);
    var comment = commentInput.value;
    var product = productInput.value;
  
    var review = new Review(name, rating, comment, product);
    reviews.push(review);
  
    nameInput.value = "";
    ratingInput.value = "";
    commentInput.value = "";
    productInput.value = "";
  
    displayReviews();
  }
  
  
  
  function displayReviews() {
    var container = document.getElementById("reviewsContainer");
    var html = "<ul class='reviews-list'>";
  
    for (var i = 0; i < reviews.length; i++) {
      var review = reviews[i];
      html += "<li><h3>" + review.name + "</h3><p>" + review.comment + "</p><p>Rating: " + review.rating + "/5</p><p>Product: " + review.product + "</p></li>";
    }
  
    html += "</ul>";
    container.innerHTML = html;
  
    $(".reviews-list").listview();
  }
  

// Define the Coupon class
class Coupon {
    constructor(name, discount, expiration, code) {
        this.ID = Math.random().toString(16).slice(5);
        this.name = name;
        this.discount = discount;
        this.expiration = expiration;
        this.code = code;
    }
}

// Define the coupons array
const coupons = [
    new Coupon("Save $5 on your next purchase", "$5", "2/28/2023", "tAc8"),
    new Coupon("50% off any item", "50%", "3/31/2023", "fRb6"),
    new Coupon("Free shipping on orders over $50", "Free", "4/30/2023", "qXy3"),
];

// Define the function to display the list of coupons
function showCouponList() {
    const couponList = document.getElementById("coupon-list");
    couponList.innerHTML = "";
    coupons.forEach(coupon => {
        const li = document.createElement("li");
        li.textContent = coupon.name;
        li.dataset.id = coupon.ID;
        li.addEventListener("click", showCouponDetails);
        couponList.appendChild(li);
    });
}


// Define the function to show coupon details
function showCouponDetails(event) {
    const li = event.target.closest("li");
    if (li) {
        const coupon = coupons.find(coupon => coupon.ID === li.dataset.id);
        const couponCode = coupon.code;
        const couponCodeElement = document.getElementById("coupon-code");
        couponCodeElement.textContent = `Coupon Code: ${couponCode}`;
        const couponDetailsSection = document.getElementById("coupon-details");
        couponDetailsSection.style.display = "block";
        const couponNameElement = document.getElementById("coupon-name");
        couponNameElement.textContent = coupon.name;
        const couponDiscountElement = document.getElementById("coupon-discount");
        couponDiscountElement.textContent = `Discount: ${coupon.discount}`;
        const couponExpirationElement = document.getElementById("coupon-expiration");
        couponExpirationElement.textContent = `Expires: ${coupon.expiration}`;
    }
}
