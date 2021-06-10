var commandTotal= 0;
document.addEventListener('DOMContentLoaded', function(){
    Object.keys(localStorage).forEach (function(key){
        if(key != "command"){
            let object = localStorage.getItem(key);
            let item = JSON.parse(object);
            document.getElementById("recap-body").innerHTML += 
            "<div class='col-12 col-md-6 col-lg-4'><h1 class='recap__body-name'>" + item.name + "</h1>" + 
            "<img class='recap__body-img' src='" + item.imageUrl + "' alt='image de l'article " + item._id + "'></img>" + 
            "<p>Quantité : " + item.amount + "</p>";
            commandTotal += item.price*item.amount;
            document.getElementById("commandTotal").innerHTML = "<p>Total : " + (commandTotal/1000).toString().replace('.', ',') + "€<p>";
            let response = localStorage.getItem("command");
            let identifiant = (JSON.parse(response)).orderId;
            document.getElementById("commandIdentifiant").innerHTML = "Identifiant de commande : " + identifiant;
        }
    })
})