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
                "<input type='number' onblur='changeAmount(\"" + item.name + "\", \"" + item._id + "\" , \"" + item.price + "\")' id='" + item.name + "' name='" + item.name + "' value='" + item.amount + "' min='0' max='999'></div>" +
                "<div class='basket__cardsContainer-card-infos'>" +
                "<p class='basket__cardsContainer-card-infos-name'>" + item.name + "</p>" +
                "<p class='basket__cardsContainer-card-infos-description'>" + item.description + "</p>" +
                "</div> " +
                "<p class='basket__cardsContainer-card-price' id='" + item.name + "Price'>" + (item.price*item.amount/1000).toString().replace('.', ',') + "€</p>" +
                "</div>" + 
                "<button class='basket__cardsContainer-button' onclick='deleteFromBasket(\"" + item._id + "\")'><p>Supprimer du panier</p></button>" +
                "<div>";
            }
            else{
                /* */
            }
        })
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
    let priceNumber = parseFloat(price);
    document.getElementById(name + "Price").innerHTML = (priceNumber*newAmount/1000).toString().replace('.', ',') + "€";
    let changingObject = localStorage.getItem(id);
    let changingItem = JSON.parse(changingObject);
    changingItem.amount = newAmount;
    localStorage.setItem(id, JSON.stringify(changingItem));
}


function deleteFromBasket(id){
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
}


