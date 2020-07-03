    AOS.init();
    let counter=0;
    var $tableCartMenu = $(".cart-products");
    $(".cart-icon").append($("sup").html(counter));
    $(".cart-icon").on("click",()=>{
     if ($tableCartMenu.hasClass("cart-products"))
        {
            $tableCartMenu.toggleClass("open-table");
            
        }
        
    })

function updateCartNumber(){

    counter++;
    //arr.push(counter);
    $(".cart-icon").append($("sup").html(counter));
    }

function removeCartNumber() {

    counter-=1;
     
    $(".cart-icon").append($("sup").html(counter));
}

//remove elements from cart

var removeBtn = document.querySelectorAll(".remove-btn");

removeBtn.forEach(event=>event.addEventListener("click", removeRow));

function removeRow(){
        var clickedbtn = this;
        
         var toRemoveRow = clickedbtn.parentElement.parentElement;
         toRemoveRow.remove();
    
        updatePrice();
        removeCartNumber();
    
    
        
         
    }


//update product price and quantity

var valueChange = document.querySelectorAll(".product-value");
valueChange.forEach(event => event.addEventListener("change", updatePrice));


function updatePrice(){

    var changedInputValue = this;
    
    if(changedInputValue.value<=0 || isNaN(changedInputValue.value)){
        changedInputValue.value = 1;
    }
    else{
        changedInputValue.value;
    }

    var totalPrice = 0;

     var parentRow = document.querySelectorAll(".parent-row");
      parentRow.forEach(event=>{

         var inputValue = event.querySelectorAll(".product-value")[0].value;
         var productPrice = event.querySelectorAll(".cart-product-price")[0].innerText.replace("Ksh","");

         totalPrice = totalPrice + (inputValue*productPrice);
       
      })
         $(".priceText").text("Ksh "+totalPrice);

}


//getting products cart
$(".add-product").on("click", addProductToCart);

function addProductToCart(e){

    var clickedCartButton = e.target;
     var parentElement = clickedCartButton.parentElement.parentElement;
    
   
        var image = parentElement.querySelectorAll(".product-image img")[0].getAttribute("src");
        var productTitle = parentElement.querySelectorAll(".product-name h1")[0].innerText;
        //var $productTitle = $(".")
        var productPrice = parentElement.querySelectorAll(".product-price")[0].innerText;
        
        addNewProductToCart(image,productTitle, productPrice);
        updatePrice();
        updateCartNumber();
}

//adding selected products to cart
function addNewProductToCart(image,productTitle,productPrice){
    //var $title = $(".title");

    var itemTitle = document.querySelectorAll(".title");
    for (var i = 0; i < itemTitle.length; i++) {
        if (itemTitle[i].innerHTML === productTitle) {
            alert("The item has alredy been added to the cart");
            return;
        }
    }


    var newElement = document.createElement("tr");
    newElement.classList.add("parent-row");
    var parentElement = document.querySelector("table");
    var existingBody = `
      <td>
                    <img  class="product-img" src="${image}" alt="" style="width: 50px;height: 50px;">
                    <h4 class="title">${productTitle}</h4>
                </td>
                <td>
                    <input class="product-value" type="number" style="width: 60px;" value="1">
                </td>
                <td>
                    <span class="cart-product-price">${productPrice}</span>
                </td>
                <td>
                    <button type="button" class="remove-btn">REMOVE</button>
                </td>
    `;

    newElement.innerHTML = existingBody;
    parentElement.appendChild(newElement);

    var $removeBtn = $(".remove-btn");
    $removeBtn.on("click", removeRow);

    var $valueChange = $(".product-value");
    $valueChange.on("change",updatePrice);

}


//adding a link and working with it
var divContent = document.querySelectorAll(".product-contents");
 divContent.forEach(event=>event.addEventListener("mouseover",displayLink));
 
function displayLink(){
    var btnBtn = this;
    var newEl = document.createElement("a");
    let pos = 1;
    pos++;
    var viewDetails = btnBtn.querySelectorAll(".product-image")[0];
    if(viewDetails.children.length>=2){
        viewDetails.children[pos].remove();
    }

    newEl.setAttribute("href","productdetails.html");
    newEl.innerText = "View Details";
    newEl.classList.add("view-product-details");
    viewDetails.appendChild(newEl);

     //newEl.forEach(event=>event.addEventListener("click",getProductDetails));
     newEl.addEventListener("click",pageProductDetails);
     

}

divContent.forEach(event => event.addEventListener("mouseout", ()=>{
    var cc = document.querySelectorAll(".view-product-details")[0].classList.style("visibility","hidden");
    //cc.remove();
    
}));

function pageProductDetails(){

    var clickedLink= this;
    
    var parentBody = clickedLink.parentElement.parentElement;

    var pdTitle = parentBody.querySelectorAll(".product-name h1")[0].innerText;
    var pdImage = parentBody.querySelectorAll(".product-image img")[0].getAttribute("src");
    var pdPrice = parentBody.querySelectorAll(".product-price")[0].innerText;
    
    addProductsToDetails(pdImage, pdTitle, pdPrice);
}
//product-details-row
function addProductsToDetails(pdImage, pdTitle, pdPrice){
    var newParentDiv = document.createElement("div");
    newParentDiv.classList.add("product-details-column");
    var existingDetailsParent = document.querySelector(".product-details-row");
    //existingDetailsParent.innerHTML = "Lorem ipsum dolor sit amet consectetur";
    
    var existingDetailBody = `

        <div class="product-image-details">
                    <img src="${pdImage}" alt="product-img" class="details-image" style="width: 700px;height: 300px;">
                </div>
                <div class="product-title-details">
                    <h1 class="big-text">${pdTitle}</h1>
                </div>
                <span class="product-price-details">${pdPrice}</span>
                <div class="product-btncart-details">
                    <button type="button">Add to Cart</button>
                </div>
                <div class="product-description-details">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni veniam quidem 
                        atque nesciunt suscipit, autem, animi provident!

                    </p>
                </div>
    `;
    
    newParentDiv.innerHTML = existingDetailBody;
    
    existingDetailsParent.append(newParentDiv);
    
}

