/* MISE EN PAGE  */

document.addEventListener('DOMContentLoaded', function teddyInit(){
    localStorage.setItem("command", "");
    /*Notification on basket  */
    if(localStorage.length >= 2){
        let notif = localStorage.length -1;
        document.getElementById("notification").innerHTML = "Mon panier<b class='notification'>" + notif + "</b>";
    }
    /*Notification END*/ 
    fetch("http://localhost:3000/api/teddies")
    .then (function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(function(value){
        for (i in value){
            let name = "\""+value[i].name+"\"";
            let id = "\""+value[i]._id+"\"";
            document.getElementById("cardsContainer").innerHTML += 
            
            "<div class='col-12 col-md-5 col-lg-3 card'><a class='card-body' href='item.html?" + value[i]._id + "' id='"+ value[i]._id + "'>" +
            "<h2 class='card-title'>"+ value[i].name +"</h2>" +
            "<p class='card-text'>" + (value[i].price/1000).toString().replace('.', ',') + "€</p>" +
            "<img class='card-img' src='"+ value[i].imageUrl + "'></img>" + 
            "<p class='card-text'>" + value[i].description + "</p></a>" +
            "<button onclick ='addToBasket("+ id + ")' class='card-button btn btn-success'> Ajouter au panier</button> " +
            "</div>";  
        }
    })
    .catch(function(){
        document.getElementById("alert").innerHTML = "<div class ='alert-bad'><p>Le serveur ne répond pas.</p></div>";
        timeout.push(setTimeout(function(){
            timeout = [];
            document.getElementById("alert").innerHTML = "";
        }, 5000));
    })
})
/* MISE EN PAGE END  */
