document.addEventListener('DOMContentLoaded', function(){
    fetch("http://localhost:3000/api/teddies")
    .then(function(res){
        if(res.ok){
            return res.json()
        }
    })
    .then(function(value){
        let element;
        let storageValues = Object.values(localStorage);
        for(i in storageValues){
            element = storageValues[i];
            for(j in value){
                if (element == value[j].name){
                    document.getElementById("cardsContainer").innerHTML +=
                    "<div class='row card><div class='card-body'><div class='col-6'>" +
                    "<h2 class='card-title'>"+ value[j].name +"</h2>" +
                    "<p class='card-price'>" + value[j].price/1000 + "€</p>" +
                    "<img class='card-img-xl' src='"+ value[j].imageUrl +"'></img>" + 
                    "<button class='btn-danger' onclick='deleteFromBasket(\""+ value[j]._id + "\")'>Supprimer du panier</button>"
                    "</div></div></div>";
                }
                else{
                    continue;
                }
            }
        }
    })
    .catch(function(err){
        /* Erreur */
    })
})






function deleteFromBasket(id){
    localStorage.removeItem(id);
    document.location.reload();
}


/*
    http://localhost:3000/api/teddies

*/