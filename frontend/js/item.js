document.addEventListener('DOMContentLoaded', function(){
    const paramId = location.search.substring(1).split("&");
        /*Notification on basket  */
    if(localStorage.length >= 1){
        let notif = localStorage.length;
        document.getElementById("notification").innerHTML = "Mon panier<b class='notification'>" + notif + "</b>";
    }
    else{
        /* */ 
    }
    /*Notification END*/ 
    fetch("http://localhost:3000/api/teddies")
    .then (function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(function(value){
        for(i in value){
            if(value[i]._id == paramId){
                let colors = "";
                let id = "\""+value[i]._id+"\"";
                for (j in value[i].colors){
                    if (j == 0){
                        colors += value[i].colors[j];
                    }
                    else{
                        colors += ", " + value[i].colors[j];
                    }
                }
                document.getElementById("cardsContainer").innerHTML += 
                "<h1 class='row'>" + value[i].name + "<h1>" +
                "<div class='row'>" +
                "<img class='col-12 col-md-5 col-lg-4' src='" + value[i].imageUrl + "' alt='image du produit'>" +
                "<div class='col-12 col-md-7 col-lg-8 item'><p class='item__p-first'><b>" + (value[i].price/1000).toString().replace('.', ',') + "€</b><br></p> " + 
                "<p class='item__p-second'>" + value[i].description + "</p>" +
                "<p class='item__p-third'>Couleurs : " + colors + "</p>" +
                "</div></div>" + 
                "<button onclick ='addToBasket("+ id + ")' class='item-button btn btn-success'> Ajouter au panier</button> ";
            }
            else{
            /* */
            }
        }
    })
    .catch(function(err){
        /* Erreur */
    })
})