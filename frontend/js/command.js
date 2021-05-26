document.addEventListener('DOMContentLoaded', function(){
    Object.keys(localStorage).forEach (function(key){
        let object = localStorage.getItem(key);
        let item = JSON.parse(object);
        document.getElementById("recap-body").innerHTML += 
        "<div class='col-4'><h1 class='recap__body-name'>" + item.name + "</h1>" + 
        "<img class='recap__body-img' src='" + item.imageUrl + "' alt='image de l'article " + item._id + "'></img>" + 
        "<p>Quantité : " + item.amount + "</p>";
    })
})