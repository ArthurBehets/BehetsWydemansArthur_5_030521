document.addEventListener('DOMContentLoaded', function(){
    localStorage.setItem("command", "");
    let paramId = location.search.substring(1).split("&");
        /*Notification on basket  */
    if(localStorage.length >= 2){
        let notif = localStorage.length -1;
        document.getElementById("notification").innerHTML = "Mon panier<b class='notification'>" + notif + "</b>";
    }
    /*Notification END*/ 
    fetch("http://localhost:3000/api/teddies/" + paramId)
    .then (function(res){
        if(res.ok){
            return res.json()   
        }
    })
    .then(function(value){
            document.getElementById('title').innerHTML = value.name + " : " + value.description;
                let colors = "";
                let id = "\""+value._id+"\"";
                for (j in value.colors){
                    colors += "<option value='" + value.colors[j] + "'>" + value.colors[j] + "</option>"
                }
                document.getElementById("cardsContainer").innerHTML += 
                "<h1 class='row'>" + value.name + "<h1>" +
                "<div class='row'>" +
                "<img class='col-12 col-md-5 col-lg-4' src='" + value.imageUrl + "' alt='image du produit'>" +
                "<div class='col-12 col-md-7 col-lg-8 item'><p class='item__p-first'><b>" + (value.price/1000).toString().replace('.', ',') + "€</b><br></p> " + 
                "<p class='item__p-second'>" + value.description + "</p>" +
                "<div><label for='color'>Couleur :</label><select name='color' class='item__color'>" +colors + "</select></div>" +
                "</div></div>" + 
                "<button onclick ='addToBasket("+ id + ")' class='item-button btn btn-success'> Ajouter au panier</button> "
    })
    
    .catch(function(){
        document.getElementById("alert").innerHTML = "<div class ='alert-bad'><p>Le serveur ne répond pas.</p></div>";
        timeout.push(setTimeout(function(){
            timeout = [];
            document.getElementById("alert").innerHTML = "";
        }, 5000));
    })
})