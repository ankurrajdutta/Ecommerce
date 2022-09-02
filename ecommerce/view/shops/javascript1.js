const removeCartItem=document.getElementsByClassName('btn-danger');

for(var i=0;i<removeCartItem.length;i++){
    var button=removeCartItem[i];
    button.addEventListener('click',removeItem)
}
 var quantityInputs=document.getElementsByClassName('cart-quantity-input');
for(var i=0;i<removeCartItem.length;i++){
        var input=quantityInputs[i];
        input.addEventListener('change',quantityChange)
    }
var addtocartButtons=document.getElementsByClassName('addtocart');
for(var i=0;i<addtocartButtons.length;i++){
    var button=addtocartButtons[i];
    button.addEventListener('click',addtToCartClicked);
}
document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchase)

var cart=document.getElementsByClassName('right')[0];
document.getElementById('seethecart').addEventListener('click',()=>{
    cart.classList.toggle('active')
})

var cartBtn=document.getElementById('cartbtn');
cartBtn.addEventListener('click',()=>{
    cart.classList.toggle('active')
})



function addtToCartClicked(e){
   var button=e.target;
   var shopItem=button.parentElement.parentElement;
  
   var title=shopItem.getElementsByClassName('shopTitle')[0].innerText
   var price=shopItem.getElementsByClassName('price')[0].innerText;
   var imageSrc=shopItem.getElementsByClassName('image')[0].firstElementChild.src
   console.log(title,price,imageSrc)

    addItemToCart(title,price,imageSrc);
    showNotification(title);

}
var container=document.getElementsByClassName('notification-container')[0]

function showNotification(title){
    const notif=document.createElement('div');
    notif.classList.add('toast');
    notif.innerText=`${title} is added to cart`;
    container.appendChild(notif);

    setTimeout(()=>{
        notif.remove();
    },3000)
}

function purchase(){
   
    var cartItems=document.getElementsByClassName('cart-items')[0];
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild);
    }
    alert('Thank you for purchase');
    updateCartTotal();

}

function addItemToCart(title,price,imageSrc){
    var cartRow=document.createElement('div');
    var cartItems=document.getElementsByClassName('cart-items')[0];
    var cartItemsNames=cartItems.getElementsByClassName('cart-item-title');
    for(var i=0;i<cartItemsNames.length;i++){
        if(cartItemsNames[i].innerText == title){
            alert('This item is already added to Cart')
            return;
        }
    }
    var cartRowContents=`<div class="cart-item cart-column">
    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
    <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">X</button>
</div>`;
    cartRow.innerHTML=cartRowContents;
    cartRow.classList.add('cart-row')
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChange)
}

function removeItem(e){
    var buttonClicked=e.target;
    console.log(buttonClicked)
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChange(e){
    var input=e.target;
    if(isNaN(input.value) || input.value<=0){
        input.value=1
    }
    updateCartTotal();
}

function updateCartTotal(){
    var CartItemContainer=document.getElementsByClassName('cart-items')[0];
    var cartRows=CartItemContainer.getElementsByClassName('cart-row');
    var total=0;
    for(var i=0;i<removeCartItem.length;i++){
        var cartRow=cartRows[i]
        var priceElement=cartRow.getElementsByClassName('cart-price')[0];
        var quantityElemeent=cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price=parseFloat(priceElement.innerText.replace('$',''));
        var quantity=quantityElemeent.value;
        total=total+(price*quantity);
        

    }
    total=Math.round(total*100)/100;
    document.getElementsByClassName('cart-total-price')[0].innerText='$'+total
}