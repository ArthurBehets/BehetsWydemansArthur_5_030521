/* Function qui recoit le paramètre de l'id à ajouter au panier et le cherche dans la DB pour l'ajouter au local Storage avec un élément "amount" en plus. Si il est déjà dans le local storage, ajoute 1 à amount*/

function addToBasket(id){
    fetch("http://localhost:3000/api/teddies")
    .then (function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(function(value){
        let testId = localStorage.getItem(id);
        if (testId == null){  /*Vérifie si l'élément est déjà présent dans le local.storage */
            for (i in value){
                if (value[i]._id == id){
                    let article = value[i];
                    article.amount = 1;
                    let object = JSON.stringify(article);
                    localStorage.setItem(id, object);
                    let notif = localStorage.length -1;
                    document.getElementById("notification").innerHTML = "Mon panier<b class='notification'>" + notif + "</b>";
                    document.getElementById("alert").innerHTML = "<div class ='alert-good'><p>L'élément a bien été ajouté au panier</p></div>";
                    setTimeout(function(){
                    document.getElementById("alert").innerHTML = "";
                    }, 5000);
                }
            }
        }
        else{
            let item = JSON.parse(testId);
            if (item.amount > 0){
                if(item.amount < 999){
                    if (confirm("Cet élément est déjà présent " + item.amount + " fois dans votre panier. Voulez vous ajouter un nouvel exemplaire?")){
                        item.amount += 1;
                        localStorage.setItem(id, JSON.stringify(item));
                        let notif = localStorage.length -1;
                        document.getElementById("notification").innerHTML = "Mon panier<b class='notification'>" + notif + "</b>";
                        document.getElementById("alert").innerHTML = "<div class ='alert-good'><p>L'élément a bien été ajouté au panier</p></div>";
                        setTimeout(function(){
                        document.getElementById("alert").innerHTML = "";
                        }, 5000);
                    }
                }
                else{
                    document.getElementById("alert").innerHTML = "<div class ='alert-bad'><p>Vous avez déjà le maximum d'item disponibles pour cet item</p></div>";
                    setTimeout(function(){
                    document.getElementById("alert").innerHTML = "";
                    }, 5000);
                }
            }
            else{
                item.amount = 1;
                localStorage.setItem(id, JSON.stringify(item));
                let notif = localStorage.length -1;
                document.getElementById("notification").innerHTML = "Mon panier<b class='notification'>" + notif + "</b>";
            }
        }
        
    })
    .catch(function(err){
        /* Erreur */
    })
}

/* Fin de function addToBasket */


/* Recoit 3 paramètres qui vont lui permettre d'identifier l'item et la nouvelle valeur de l'input. Vérifie la validité de cette valeur et modifie l'amount, le prix et le total du panier si elle est correcte*/
function changeAmount(name, id, price){
    let newAmount = document.getElementById(name).value;
    if(newAmount%1 == 0){
        if(newAmount > 0 && newAmount <= 999){
            let oldPriceObj = localStorage.getItem(id);
            let oldPrice = JSON.parse(oldPriceObj).price * JSON.parse(oldPriceObj).amount;
            let priceNumber = parseFloat(price);
            document.getElementById(name + "Price").innerHTML = (priceNumber*newAmount/1000).toString().replace('.', ',') + "€";
            let changingObject = localStorage.getItem(id);
            let changingItem = JSON.parse(changingObject);
            changingItem.amount = Number(newAmount);
            localStorage.setItem(id, JSON.stringify(changingItem));
            basketTotal -= oldPrice;
            basketTotal += priceNumber*newAmount;
            document.getElementById("basket-total").innerHTML = "Total : " + (basketTotal/1000).toString().replace('.', ',') + "€";
        }
        else{
            document.getElementById("alert").innerHTML = "<div class ='alert-bad'><p>Veuillez entrer un nombre entre 1 et 999</p></div>";
            let oldAmountObj = localStorage.getItem(id);
            document.getElementById(name).value = JSON.parse(oldAmountObj).amount;
            setTimeout(function(){
                document.getElementById("alert").innerHTML = "";
            }, 5000)
        }
    }
    else{
        document.getElementById("alert").innerHTML = "<div class ='alert-bad'><p>Veuillez saisir un nombre entier</p></div>";
            let oldAmountObj = localStorage.getItem(id);
            document.getElementById(name).value = JSON.parse(oldAmountObj).amount;
            setTimeout(function(){
                document.getElementById("alert").innerHTML = "";
            }, 5000)
    }
}
/* Fin de fonction changeAmount */

/*Function qui recoit l'id d'un item du panier et qui va le supprimer du local storage et le retirer de l'affichage du panier*/
function deleteFromBasket(id){
    let oldPriceObj = localStorage.getItem(id);
    let oldPrice = JSON.parse(oldPriceObj).price * JSON.parse(oldPriceObj).amount;
    basketTotal -= oldPrice;
    localStorage.removeItem(id);
    document.getElementById(id).innerHTML = "";
    if(localStorage.length >= 2){
        let notif = localStorage.length -1;
        document.getElementById("basket-total").innerHTML = "Total : " + (basketTotal/1000).toString().replace('.', ',') + "€";
        document.getElementById("notification").innerHTML = "Mon panier<b class='notification'>" + notif + "</b>";
    }
    else{
        document.getElementById("basket-total").innerHTML = "";
        document.getElementById("form").innerHTML = "";
        document.getElementById("notification").innerHTML = "Mon panier";
        document.getElementById("cardsContainer").innerHTML = "<div class='basket__cardsContainer-empty'><p>Votre panier est vide. Remplissez le avant de passez commande</p></div>"
    }
}



function initCommand(){
    let contact = new Object;
    contact.email = document.getElementById("email").value;
    contact.firstName = document.getElementById("firstName").value;
    contact.lastName = document.getElementById("lastName").value;
    contact.address = document.getElementById("address").value;
    contact.city = document.getElementById("city").value;
    let products = [];
    let object;
    let item;
    Object.keys(localStorage).forEach (function(key){
    object = localStorage.getItem(key);
    if(key != "command"){
        item = JSON.parse(object);
        products.push(item._id);
    }
    });
    let control = true;
    for (i in contact){
        if (contact[i] == ""){
            control = false;
        }
    }
    if (control == true){
        sendingCommand(products, contact);
    }
    else{
        document.getElementById("alert").innerHTML = "<div class ='alert-bad'><p>Veuillez renseigner tout les champs !</p></div>";
            setTimeout(function(){
                document.getElementById("alert").innerHTML = "";
            }, 5000)
    }
}

function sendingCommand(products, contact){
    fetch("http://localhost:3000/api/teddies/order", {
	method: "POST",
	headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/json' 
    },
	body: JSON.stringify({products, contact})
    })
    .then(response => response.json())
    .then(function(data){
        localStorage.setItem("command", JSON.stringify(data));
        window.location.href = "command.html"
    })
    .catch((error) => {
        console.log(error)
    })
} 

