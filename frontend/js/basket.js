var basketTotal = 0;


document.addEventListener('DOMContentLoaded', function basketInit(){
    Object.keys(localStorage).forEach(function(key){
        let object = localStorage.getItem(key);
            let item = JSON.parse(object);
            if (item.amount > 0){
                document.getElementById("cardsContainer").innerHTML +=
                "<div id='" + item._id + "'><div class='basket__cardsContainer-card'>" + 
                "<div class='basket__cardsContainer-card-img'><img src='" + item.imageUrl + "' alt=\"image de l'article " + item._id + "\"></div>" +
                "<div class='basket__cardsContainer-card-amount'>" +
                "<label for='" + item.name + "'>Nbr d'articles :</label> "+ 
                "<input class='basket__cardsContainer-card-input' type='number' onblur='changeAmount(\"" + item.name + "\", \"" + item._id + "\" , \"" + item.price + "\")' id='" + item.name + "' name='" + item.name + "' value='" + item.amount + "' min='1' max='999'></div>" +
                "<div class='basket__cardsContainer-card-infos'>" +
                "<p class='basket__cardsContainer-card-infos-name'>" + item.name + "</p>" +
                "<p class='basket__cardsContainer-card-infos-description'>" + item.description + "</p>" +
                "</div> " +
                "<p class='basket__cardsContainer-card-price' id='" + item.name + "Price'>" + (item.price*item.amount/1000).toString().replace('.', ',') + "€</p>" +
                "</div>" + 
                "<button class='basket__cardsContainer-button' onclick='deleteFromBasket(\"" + item._id + "\")'><p>Supprimer du panier</p></button>" +
                "<div>";
                basketTotal += item.price*item.amount;
            }
            else{
                /* */
            }
        })
    if(basketTotal > 0){
        document.getElementById("basket-total").innerHTML = "Total : " + (basketTotal/1000).toString().replace('.', ',') + "€";
        document.getElementById("submit-command").innerHTML = "<button class='btn btn-success btn-command'  onclick ='commandSubmit()'>Passer commande</button>";
    }
    else{
        document.getElementById("basket-total").innerHTML = "";
    }
    /*Notification on basket  */
    if(localStorage.length >= 1){
        let notif = localStorage.length;
        document.getElementById("notification").innerHTML += "<b class='notification'>" + notif + "</b>";
    }
    else{
        /* */ 
    }
    /*Notification END*/ 
})


function changeAmount(name, id, price){
    let newAmount = document.getElementById(name).value;
    console.log(newAmount);
    if(newAmount > 0 && newAmount < 999){
        let oldPriceObj = localStorage.getItem(id);
        let oldPrice = JSON.parse(oldPriceObj).price * JSON.parse(oldPriceObj).amount;
        let priceNumber = parseFloat(price);
        document.getElementById(name + "Price").innerHTML = (priceNumber*newAmount/1000).toString().replace('.', ',') + "€";
        let changingObject = localStorage.getItem(id);
        let changingItem = JSON.parse(changingObject);
        changingItem.amount = newAmount;
        localStorage.setItem(id, JSON.stringify(changingItem));
        basketTotal -= oldPrice;
        basketTotal += priceNumber*newAmount;
        document.getElementById("basket-total").innerHTML = "Total : " + (basketTotal/1000).toString().replace('.', ',') + "€";
        document.getElementById("submit-command").innerHTML = "<button class='btn btn-success btn-command' onclick ='commandSubmit()'>Passer commande</button>";
    }
    else{
        document.getElementById("alert").innerHTML = "<div class ='alert-bad'><p>Veuillez entrer un nombre entre 0 et 999</p></div>";
        let oldAmountObj = localStorage.getItem(id);
        document.getElementById(name).value = JSON.parse(oldAmountObj).amount;
        setTimeout(function(){
            document.getElementById("alert").innerHTML = "";
        }, 5000)
    }
}


function deleteFromBasket(id){
    let oldPriceObj = localStorage.getItem(id);
    let oldPrice = JSON.parse(oldPriceObj).price * JSON.parse(oldPriceObj).amount;
    basketTotal -= oldPrice;
    localStorage.removeItem(id);
    document.getElementById(id).innerHTML = "";
    /*Notification on basket  */
    if(localStorage.length >= 1){
        let notif = localStorage.length;
        document.getElementById("notification").innerHTML = "Mon panier<b class='notification'>" + notif + "</b>";
    }
    else{
        document.getElementById("notification").innerHTML = "Mon panier";
    }
    /*Notification END*/ 
    if(basketTotal > 0){
        document.getElementById("basket-total").innerHTML = "Total : " + (basketTotal/1000).toString().replace('.', ',') + "€";
    }
    else{
        document.getElementById("basket-total").innerHTML = "";
        document.getElementById("submit-command").innerHTML = "";
    }
}


