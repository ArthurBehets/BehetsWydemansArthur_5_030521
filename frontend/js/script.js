document.addEventListener('DOMContentLoaded', function() {
    /*Notification on basket  */
    if(localStorage.length >= 1){
        let notif = localStorage.length;
        document.getElementById("notification").innerHTML += "<b class='notification'>" + notif + "</b>";
    }
    else{
        /* */ 
    }
    /*Notification END*/ 

    
    fetch("http://localhost:3000/api/teddies")
        .then(function(res){
            if(res.ok){
                return res.json();
            }       
        })
        .then(function(value){
            document.getElementById("cardsContainer").innerHTML = "<a href='teddy.html' class='article__cardsContainer-card'><div class='article__cardsContainer-card-body'><h2>Ours en peluche</h2><img class='card-img'src='" + value[0].imageUrl + "'></img></div></a>";    
        })
        .catch(function(err){

        });
    fetch("http://localhost:3000/api/cameras")
    .then(function(res){
        if(res.ok){
            return res.json();
        }       
    })
    .then(function(value){
        document.getElementById("cardsContainer").innerHTML += "<a class='article__cardsContainer-card'><div class=' article__cardsContainer-card-body'><h2>Caméras vintage</h2><img class='card-img'src='" + value[0].imageUrl + "'></img></div></a>";    
    })
    .catch(function(err){

    });
    
    
    fetch("http://localhost:3000/api/furniture")
        .then(function(res){
            if(res.ok){
                return res.json();
            }       
        })
        .then(function(value){
            document.getElementById("cardsContainer").innerHTML += "<a class='article__cardsContainer-card'><div class='article__cardsContainer-card-body'><h2>Meubles en chêne</h2><img class='card-img'src='" + value[0].imageUrl + "'></img></div></a>";    
        })
        .catch(function(err){

        });
        
  })




/* 

http://localhost:3000/api/teddies 


http://localhost:3000/api/cameras


http://localhost:3000/api/furniture


*/ 
