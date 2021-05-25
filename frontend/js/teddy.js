/* MISE EN PAGE  */

document.addEventListener('DOMContentLoaded', function teddyInit(){
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
        for (i in value){
            let name = "\""+value[i].name+"\"";
            let id = "\""+value[i]._id+"\"";
            document.getElementById("cardsContainer").innerHTML += 
            
            "<div class='article__cardsContainer-card'><div class='article__cardsContainer-card-body' id='"+ value[i]._id + "'>" +
            "<h2 class='article__cardsContainer-card-body-title'>"+ value[i].name +"</h2>" +
            "<p class='article__cardsContainer-card-body-price'>" + value[i].price/1000 + "€</p>" +
            "<img class='article__cardsContainer-card-body-img' src='"+ value[i].imageUrl + "'></img>" + 
            "<p class='article__cardsContainer-card-body-description'>" + value[i].description + "</p>" +
            "<button onclick ='addToBasket("+ id + ")' class='article__cardsContainer-card-body-button'> Ajouter au panier</button> " +
            "</div></div>";  
        }
    })
    .catch(function(err){
        /* Erreur */
    })
})



/* MISE EN PAGE END  */

/*  */


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


