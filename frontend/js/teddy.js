/* MISE EN PAGE  */

document.addEventListener('DOMContentLoaded', function(){
    fetch("http://localhost:3000/api/teddies")
    .then (function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(function(value){
        let col = 0;
        let row = 1;
        for (i in value){
            if(col % 3 != 0){
                let name = "\""+value[i].name+"\"";
                let id = "\""+value[i]._id+"\"";
                document.getElementById("cardsContainer" + row).innerHTML += 
                
                "<div class='col-3 card'><div class='card-body' id='"+ value[i]._id + "'>" +
                "<h2 class='card-title'>"+ value[i].name +"</h2>" +
                "<p class='card-price'>" + value[i].price/1000 + "€</p>" +
                "<img class='card-img' src='"+ value[i].imageUrl + "'></img>" + 
                "<p class='card-text'>" + value[i].description + "</p>" +
                "<button onclick ='addToBasket("+ id + ", " + name + ")' class='card-button'> Ajouter au panier</button> " +
                "</div></div>";
                col += 1;
            }
            else{
                let name = "\""+value[i].name+"\"";
                let id = "\""+value[i]._id+"\"";
                row += 1;
                document.getElementById("newRowCards").innerHTML += "<div class='row' id='cardsContainer" + row + "'></div>";
                document.getElementById("cardsContainer" + row).innerHTML += 
                
                "<div class='col-3 card'><div class='card-body' id='"+ value[i]._id + "'>" +
                "<h2 class='card-title'>"+ value[i].name +"</h2>" +
                "<p class='card-price'>" + value[i].price/1000 + "€</p>" +
                "<img class='card-img' src='"+ value[i].imageUrl + "'></img>" + 
                "<p class='card-text'>" + value[i].description + "</p>" +
                "<button onclick ='addToBasket("+ id + ", " + name + ")' class='card-button'> Ajouter au panier</button> " +
                "</div></div>";
                col += 1;
            }
        }
    })
    .catch(function(err){
        /* Erreur */
    })
})



/* MISE EN PAGE END  */

/* addToBasket will add the chosen item on the local storage to be used by the basket */

function addToBasket(item, name){
    getItem = document.getElementById(item);
    localStorage.setItem(item, name);
    console.log(item);
}


/* 

http://localhost:3000/api/teddies 

*/ 
