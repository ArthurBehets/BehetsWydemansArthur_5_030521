/* Function qui recoit le paramètre de l'id à ajouter au panier et le cherche dans la DB pour l'ajouter au local Storage avec un élément "amount" en plus. */

function addToBasket(id){
    fetch("http://localhost:3000/api/teddies")
    .then (function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(function(value){
        let testId = localStorage.getItem(id);
        if (testId == null){
            for (i in value){
                if (value[i]._id == id){
                    let article = value[i];
                    article.amount = 1;
                    let object = JSON.stringify(article);
                    localStorage.setItem(id, object);
                    let notif = localStorage.length;
                    document.getElementById("notification").innerHTML = "Mon panier<b class='notification'>" + notif + "</b>";
                    document.getElementById("alert").innerHTML = "<div class ='alert-good'><p>L'élément a bien été ajouté au panier</p></div>";
                    setTimeout(function(){
                    document.getElementById("alert").innerHTML = "";
                    }, 5000);
                }
                else{
                    /**/ 
                }
            }
        }
        else{
            let item = JSON.parse(testId);
            if (item.amount > 0){
                if (confirm("Cet élément est déjà présent " + item.amount + " fois dans votre panier. Voulez vous ajouter un nouvel exemplaire?")){
                    item.amount += 1;
                    localStorage.setItem(id, JSON.stringify(item));
                    let notif = localStorage.length;
                    document.getElementById("notification").innerHTML = "Mon panier<b class='notification'>" + notif + "</b>";
                }
                else{
                    /* */
                }
            }
            else{
                item.amount = 1;
                localStorage.setItem(id, JSON.stringify(item));
                let notif = localStorage.length;
                document.getElementById("notification").innerHTML = "Mon panier<b class='notification'>" + notif + "</b>";
            }
        }
        
    })
    .catch(function(err){
        /* Erreur */
    })
}

/* Fin de function addToBasket */


/* */
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
        document.getElementById("alert").innerHTML = "<div class ='alert-bad'><p>Veuillez entrer un nombre entre 1 et 999</p></div>";
        let oldAmountObj = localStorage.getItem(id);
        document.getElementById(name).value = JSON.parse(oldAmountObj).amount;
        setTimeout(function(){
            document.getElementById("alert").innerHTML = "";
        }, 5000)
    }
}
/* */
/* */

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
        document.getElementById("cardsContainer").innerHTML = "<div class='basket__cardsContainer-empty'><p>Votre panier est vide. Remplissez le avant de passez commande</p></div>"
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

/* */


