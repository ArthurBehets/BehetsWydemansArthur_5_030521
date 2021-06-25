var basketTotal = 0;
/* Ajoute de l'affichage au chargement de la page */
document.addEventListener('DOMContentLoaded', function basketInit(){
    localStorage.setItem("command", "");
    if(localStorage.length > 1){
        Object.keys(localStorage).forEach(function(key){
            let object = localStorage.getItem(key);
            /* Vérifie que des éléments doivent être ajoutés */
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
                    "<h2 class='basket__cardsContainer-card-infos-name'>" + item.name + "</h2>" +
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
            document.getElementById("cardsContainer").innerHTML = "<div class='basket__cardsContainer-empty'><p>Votre panier est vide. Remplissez le avant de passer commande</p></div>"
        } 
        if(basketTotal > 0){
            document.getElementById("basket-total").innerHTML = "<h2>Total : " + (basketTotal/1000).toString().replace('.', ',') + "€</h2>";
            document.getElementById("form").innerHTML = "<div class='form-group flex-column'>" + 
            "<label for='firstName'>Prénom</label><input class='form-control' type='text' name='firstName' id='firstName' onblur ='validateFirstName()' required>" + 
            "</div>" + 
            "<div class='form-group' ><label for='lastName'>Nom</label><input  class='form-control' type='text' onblur ='validateLastName()' name='lastName' id='lastName' required>" + 
            "</div>" +
            "<div class='form-group' ><label for='email'>Email</label><input  class='form-control' onblur='validateEmail()' type='email' name='email' id='email' required>" + 
            "</div>" +
            "<div class='form-group' ><label for='address'>Adresse</label><input  class='form-control' onblur='validateAddress()' type='text' name='address' id='address' required>" + 
            "</div>" +
            "<div class='form-group' ><label for='city'>Ville</label><input  class='form-control' onblur ='validateCity()' type='text' name='city' id='city' required>" + 
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




/* Form validation */
function checkEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validateEmail() {
    var email = document.getElementById("email").value;

    if (checkEmail(email)) {
        /* */
    } else {
        document.getElementById("alert").innerHTML = "<div class ='alert-bad'><p>Veuillez saisir un email valide.</p></div>";
        document.getElementById("email").value = "";
        for (i in timeout){
            clearTimeout(timeout[i]);
        }
        timeout.push(setTimeout(function(){
            timeout = [];
            document.getElementById("alert").innerHTML = "";
        }, 5000));
        
    }
    return false;
}

function checkName(name) {
    var re = /[A-Z][A-Za-z' -]+/;
    return re.test(name);
}
function validateFirstName() {
    var name = document.getElementById("firstName").value;

    if (checkName(name)) {
        /* */
    } else {
        document.getElementById("alert").innerHTML = "<div class ='alert-bad'><p>Veuillez saisir un prénom valide.</p></div>";
        document.getElementById("firstName").value = "";
        for (i in timeout){
            clearTimeout(timeout[i]);
        }
        timeout.push(setTimeout(function(){
            timeout = [];
            document.getElementById("alert").innerHTML = "";
        }, 5000));
        
    }
    return false;
}

function validateLastName() {
    var name = document.getElementById("lastName").value;

    if (checkName(name)) {
        /* */
    } else {
        document.getElementById("alert").innerHTML = "<div class ='alert-bad'><p>Veuillez saisir un nom valide.</p></div>";
        document.getElementById("lastName").value = "";
        for (i in timeout){
            clearTimeout(timeout[i]);
        }
        timeout.push(setTimeout(function(){
            timeout = [];
            document.getElementById("alert").innerHTML = "";
        }, 5000));
        
    }
    return false;
}

function validateCity() {
    var name = document.getElementById("city").value;

    if (checkName(name)) {
        /* */
    } else {
        document.getElementById("alert").innerHTML = "<div class ='alert-bad'><p>Veuillez saisir une ville valide.</p></div>";
        document.getElementById("city").value = "";
        for (i in timeout){
            clearTimeout(timeout[i]);
        }
        timeout.push(setTimeout(function(){
            timeout = [];
            document.getElementById("alert").innerHTML = "";
        }, 5000));
        
    }
    return false;
}


function checkAddress(address) {
    var re = /[A-Za-z' -]+[,][ ][0-9]+/;
    return re.test(address);
}
function validateAddress() {
    var address = document.getElementById("address").value;

    if (checkAddress(address)) {
        /* */
    } else {
        document.getElementById("alert").innerHTML = "<div class ='alert-bad'><p>Veuillez saisir une adresse valide.</p></div>";
        document.getElementById("address").value = "";
        for (i in timeout){
            clearTimeout(timeout[i]);
        }
        timeout.push(setTimeout(function(){
            timeout = [];
            document.getElementById("alert").innerHTML = "";
        }, 5000));
        
    }
    return false;
}
