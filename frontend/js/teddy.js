document.addEventListener('DOMContentLoaded', function(){
    fetch("http://localhost:3000/api/teddies")
    .then (function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(function(value){
        let col = 1;
        let row = 1;
        for (i in value){
            if(col % 4 != 0){
                document.getElementById("cardsContainer" + row).innerHTML += 
                
                "<a class='col-3 card'><div class='card-body'>" +
                "<h2>"+ value[i].name +"</h2>" +
                "<img class='card-img' src='"+ value[i].imageUrl + "'></img>" + 
                "<p class='card-para'>" + value[i].description + "</p>" +
                "</div></a>";
                col += 1;
            }
            else{
                row += 1;
                document.getElementById("newRowCards").innerHTML += "<div class='row' id='cardsContainer" + row + "'></div>";
                document.getElementById("cardsContainer" + row).innerHTML += 
                
                "<a class='col-3 card'><div class='card-body'>" +
                "<h2>"+ value[i].name +"</h2>" +
                "<img class='card-img' src='"+ value[i].imageUrl + "'></img>" + 
                "<p class='card-para'>" + value[i].description + "</p>" +
                "</div></a>";
                col += 1;
            }
        }
    })
    .catch(function(err){
        /* Erreur */
    })
})



/* 

http://localhost:3000/api/teddies 

*/ 
