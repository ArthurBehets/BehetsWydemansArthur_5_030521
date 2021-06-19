var basketTotal = 0;

document.addEventListener('DOMContentLoaded', function basketInit(){
    localStorage.setItem("command", "");
    if(localStorage.length > 1){
        Object.keys(localStorage).forEach(function(key){
            let object = localStorage.getItem(key);
            if(key != "command"){
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
                    "<button class='basket__cardsContainer-button text-center' onclick='deleteFromBasket(\"" + item._id + "\")'><p>Supprimer du panier</p></button>" +
                    "<div>";
                    basketTotal += item.price*item.amount;
                }
            }
        })}
        else{
            document.getElementById("cardsContainer").innerHTML = "<div class='basket__cardsContainer-empty'><p>Votre panier est vide. Remplissez le avant de passez commande</p></div>"
        }
        if(basketTotal > 0){
            document.getElementById("basket-total").innerHTML = "Total : " + (basketTotal/1000).toString().replace('.', ',') + "€";
            document.getElementById("form").innerHTML = "<div class='form-group flex-column'>" + 
            "<label for='firstName'>Prénom</label><input class='form-control' type='text' name='firstName' id='firstName' required>" + 
            "</div>" + 
            "<div class='form-group' ><label for='lastName'>Nom</label><input  class='form-control' type='text' name='lastName' id='lastName' required>" + 
            "</div>" +
            "<div class='form-group' ><label for='email'>Email</label><input  class='form-control' type='email' name='email' id='email' required>" + 
            "</div>" +
            "<div class='form-group' ><label for='address'>Adresse</label><input  class='form-control' type='text' name='address' id='address' required>" + 
            "</div>" +
            "<div class='form-group' ><label for='city'>Ville</label><input  class='form-control' type='text' name='city' id='city' required>" + 
            "</div>" + 
            "<input type='button' onclick='initCommand()' class='btn btn-success mt-2' value='Passer Commande'></input>";
            
        }
    else{
        document.getElementById("basket-total").innerHTML = "";
    }
    /*Notification on basket  */
    if(localStorage.length >= 2){
        let notif = localStorage.length -1;
        document.getElementById("notification").innerHTML += "<b class='notification'>" + notif + "</b>";
    }
    /*Notification END*/ 
})